# DearHome - AI Smart Indian Kitchen and Pantry Assistant

Autonomous Multi-Agent Kitchen Inventory and Food-Waste Prevention Engine Powered by Google Gemini 2.0 and Cloud Infrastructure.

- **Lead Submitter**: Sinduja
- **Contact Email**: Sinduja1219@gmail.com
- **Live Web Application**: [https://sindhuja-ramesh.github.io/dearhome/](https://sindhuja-ramesh.github.io/dearhome/)
- **Target Initiative**: Google Patchamomma / AI for Sustainability (UN SDG 12: Responsible Consumption and SDG 11: Sustainable Communities)

---

## Core Ingestion Architecture: Phase 1 & Phase 2 Live

### 📸 Phase 1: Universal Multimodal Invoice & Receipt Scanner
- Built-in multi-platform receipt parser for **Zepto, Blinkit, Swiggy Instamart, Amazon Fresh, and D-Mart physical supermarket bills**.
- Powered by **Gemini 2.0 Flash (Multimodal)**: Extracts item names, packaging units (kg, g, L, packets), line-item rates, and total amounts.
- Features interactive sample bill selector and 1-click pantry top-up.

### 📬 Phase 2: Autonomous Inbound Email Forwarding Hub
- Dedicated private inbound routing address: `sinduja1219@inbox.dearhome.ai`.
- **Zero-Touch Automation**: Users configure a 1-time auto-forward filter in Gmail/Outlook for `from:(zepto.co.in OR blinkit.com OR swiggy.in OR amazon.in)`.
- Incoming order invoices trigger a SendGrid/Cloud Webhook + Gemini parser that automatically updates the household digital pantry in real time with zero manual bookkeeping.

---

## Key Capabilities

### 1. Conversational Kitchen Onboarding ("What is Present in Your Kitchen?")
- AI agent greets the user and automatically parses compound natural language grocery statements (e.g. *"I have 2 kg Atta 2 bread packets and 1 kg tomato"*).
- Dynamically matches existing pantry staples or creates new custom items with appropriate categories and burn thresholds.

### 2. Meal-Based Recipe Auto-Depletion (What Did You Cook?)
- Simply log what you cooked (e.g. Dal Tadka and Jeera Rice for 4 people + 2 guests).
- Automatically calculates exact gram and milliliter ingredient deductions for Atta, Dals, Spices (Haldi, Jeera, Rai), Cooking Oils, Ghee, and Vegetables.
- Scales with family profile, appetite calibrations (Light, Regular, Hearty), and guests.

### 3. Smart Recipe Intelligence with Direct YouTube Tutorials
- Suggests dishes based on available kitchen stock with curated YouTube cooking video tutorials (Chef Ranveer Brar) and step-by-step written guides.

### 4. Masala Dabba Organizer
- Tracks the 7 essential Indian spices (Haldi, Lal Mirch, Jeera, Rai, Hing, Dhaniya, Garam Masala) with daily tadka pinch logging.

### 5. Zero-Stockout Restock Radar
- Runout forecasting and 1-click optimized restock carts.

---

## Google Initiative Alignment & Tech Stack

| Feature | Google Product | Purpose |
| :--- | :--- | :--- |
| **Multimodal Receipt OCR (Phase 1)** | Gemini 2.0 Flash | Itemizes thermal receipts and delivery PDFs in <1s |
| **Autonomous Email Ingestion (Phase 2)** | Cloud Functions + SendGrid | Real-time webhook processing of digital invoices |
| **Meal Depletion Intelligence** | Vertex AI (Gemini 2.0) | Multi-portion recipe ingredient reasoning |
| **Cloud Hosting & Delivery** | GitHub Pages / Firebase | Zero-latency responsive web application |

---

## Submitter Contact
- **Lead Submitter**: Sinduja
- **Email**: Sinduja1219@gmail.com
- **Live Application**: [https://sindhuja-ramesh.github.io/dearhome/](https://sindhuja-ramesh.github.io/dearhome/)
