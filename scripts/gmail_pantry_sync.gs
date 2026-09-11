/**
 * ============================================================================
 * DearHome - 24/7 Autonomous Gmail Grocery Ingestion & Pantry Auto-Sync
 * ============================================================================
 * Target Platforms: Zepto, Blinkit, Swiggy Instamart, Amazon Fresh, BigBasket
 * Powered by: Google Gemini 2.0 Flash AI + Google Cloud Firestore
 *
 * HOW TO INSTALL IN 2 MINUTES:
 * 1. Open Google Apps Script: https://script.google.com/
 * 2. Click "New Project" and paste this entire code into Code.gs.
 * 3. Fill in your GEMINI_API_KEY below (get free key at https://aistudio.google.com/).
 * 4. Click "Triggers" (alarm clock icon on left) -> "Add Trigger":
 *    - Function: syncRecentGroceryEmailsToDearHome
 *    - Time-driven -> Minutes timer -> Every 10 or 15 minutes.
 * 5. Save and Authorize. Your pantry will now update autonomously 24/7!
 * ============================================================================
 */

const CONFIG = {
  GEMINI_API_KEY: "PASTE_YOUR_GEMINI_API_KEY_HERE",
  FIREBASE_PROJECT_ID: "abiding-team-430904-g6",
  FIRESTORE_COLLECTION: "dearhome_pantry",
  SEARCH_QUERY: 'from:(zeptonow.com OR zepto.co.in OR blinkit.com OR swiggy.in OR amazon.in OR bigbasket.com OR dmartindia.com) (order OR invoice OR delivered OR confirmed OR receipt) -label:DearHome-Synced newer_than:7d',
  SYNC_LABEL: "DearHome-Synced",
  MAX_EMAILS_PER_RUN: 5
};

function syncRecentGroceryEmailsToDearHome() {
  const geminiKey = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY") || CONFIG.GEMINI_API_KEY;
  if (!geminiKey || geminiKey.includes("PASTE_YOUR")) {
    Logger.log("⚠️ Please provide a valid GEMINI_API_KEY in CONFIG or Script Properties.");
    return;
  }

  let syncLabel;
  try {
    syncLabel = GmailApp.getUserLabelByName(CONFIG.SYNC_LABEL);
    if (!syncLabel) {
      syncLabel = GmailApp.createLabel(CONFIG.SYNC_LABEL);
    }
  } catch (e) {
    Logger.log("Notice on label creation: " + e.message);
  }

  const threads = GmailApp.search(CONFIG.SEARCH_QUERY, 0, CONFIG.MAX_EMAILS_PER_RUN);
  Logger.log(`Found ${threads.length} grocery email threads to process.`);

  for (let t = 0; t < threads.length; t++) {
    const thread = threads[t];
    const messages = thread.getMessages();
    const latestMsg = messages[messages.length - 1];

    const sender = latestMsg.getFrom();
    const subject = latestMsg.getSubject();
    let body = latestMsg.getPlainBody() || "";
    if (body.length < 50) {
      body = latestMsg.getBody().replace(/<[^>]+>/g, ' ');
    }

    try {
      const parsedItems = parseGroceryInvoiceWithGemini(body, geminiKey);
      if (parsedItems && parsedItems.length > 0) {
        Logger.log(`Extracted ${parsedItems.length} items from email.`);
        for (let i = 0; i < parsedItems.length; i++) {
          upsertPantryItemToFirestore(parsedItems[i]);
        }
        if (syncLabel) thread.addLabel(syncLabel);
        Logger.log(`✅ Successfully synced order from ${sender} to DearHome pantry.`);
      } else {
        if (syncLabel) thread.addLabel(syncLabel);
      }
    } catch (err) {
      Logger.log(`❌ Error processing email "${subject}": ${err.message}`);
    }
  }
}

function parseGroceryInvoiceWithGemini(emailContent, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const systemPrompt = `You are an expert AI parser for Indian quick-commerce invoices (Zepto, Blinkit, Swiggy Instamart, Amazon Fresh, BigBasket).
Extract all groceries with quantities and units. Return ONLY JSON array:
[
  {
    "name": "Full brand name",
    "shortName": "Standardized pantry staple name (e.g. Chakki Atta, Toor Dal, Amul Milk, Tomato (Tamatar))",
    "category": "Atta and Grains | Dals and Pulses | Oils and Ghee | Dairy and Fresh | Vegetables | Beverages and Snacks | Spices and Condiments",
    "qty": 2.0,
    "unit": "kg | g | L | ml | packets | pieces",
    "price": 56.0
  }
]`;

  const payload = {
    contents: [{ parts: [{ text: systemPrompt }, { text: "EMAIL TEXT:\n" + emailContent.slice(0, 15000) }] }],
    generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
  };

  const response = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });
  const json = JSON.parse(response.getContentText());
  if (json.candidates && json.candidates[0] && json.candidates[0].content) {
    return JSON.parse(json.candidates[0].content.parts[0].text);
  }
  return [];
}

function upsertPantryItemToFirestore(item) {
  const docId = "item-" + item.shortName.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 30);
  const url = `https://firestore.googleapis.com/v1/projects/${CONFIG.FIREBASE_PROJECT_ID}/databases/(default)/documents/${CONFIG.FIRESTORE_COLLECTION}/${docId}`;

  let currentQty = 0;
  try {
    const existing = UrlFetchApp.fetch(url, { method: "get", muteHttpExceptions: true });
    if (existing.getResponseCode() === 200) {
      const doc = JSON.parse(existing.getContentText());
      if (doc.fields && doc.fields.current) {
        currentQty = parseFloat(doc.fields.current.doubleValue || doc.fields.current.integerValue || 0);
      }
    }
  } catch (e) {}

  const newQty = +(currentQty + item.qty).toFixed(2);
  const firestoreDoc = {
    fields: {
      id: { stringValue: docId },
      name: { stringValue: item.name },
      shortName: { stringValue: item.shortName },
      category: { stringValue: item.category || "Beverages and Snacks" },
      current: { doubleValue: newQty },
      max: { doubleValue: Math.max(item.qty * 2, newQty, 5) },
      unit: { stringValue: item.unit || "kg" },
      threshold: { doubleValue: +(item.qty * 0.3).toFixed(2) },
      price: { doubleValue: item.price || 0 },
      daysExpiry: { integerValue: 30 },
      lastUpdated: { stringValue: new Date().toISOString() },
      source: { stringValue: "Gmail Auto-Sync" }
    }
  };

  const patchUrl = `${url}?updateMask.fieldPaths=id&updateMask.fieldPaths=name&updateMask.fieldPaths=shortName&updateMask.fieldPaths=category&updateMask.fieldPaths=current&updateMask.fieldPaths=max&updateMask.fieldPaths=unit&updateMask.fieldPaths=threshold&updateMask.fieldPaths=price&updateMask.fieldPaths=daysExpiry&updateMask.fieldPaths=lastUpdated&updateMask.fieldPaths=source`;

  UrlFetchApp.fetch(patchUrl, {
    method: "patch",
    contentType: "application/json",
    payload: JSON.stringify(firestoreDoc),
    muteHttpExceptions: true
  });
}
