# 🏠 DearHome — AI Smart Indian Kitchen & Pantry Assistant

> **Autonomous home grocery inventory engine tailored for Indian households.** Never worry about unexpected kitchen stockouts again.

---

## 🌟 Key Capabilities

### 1. 🍳 Meal-Based Recipe Auto-Depletion ("What Did You Cook?")
* Instead of manual bookkeeping, simply log what you cooked (e.g. *Dal Tadka + Jeera Rice for 4 people*).
* Automatically calculates exact gram and milliliter ingredient deductions for Atta, Dals, Spices (Haldi, Jeera, Rai), Cooking Oils, Ghee, and Vegetables.
* Adapts dynamically to family size (adults, children, elders) and regional cuisine preferences.

### 2. ⚡ Omnichannel Quick-Commerce Ingestion
* Connects with **Zepto, Blinkit, Swiggy Instamart, and Amazon Fresh**.
* Auto-syncs delivery order invoices to increment pantry stock in real-time.

### 3. 🧾 Supermarket OCR Receipt Scanner
* Built for offline shopping at **D-Mart, Reliance Smart Bazaar, and Local Kirana stores**.
* Multi-modal AI Vision OCR extracts item names, weights (kg, g, L), and rates directly from printed thermal receipts.

### 4. 🌶️ The Interactive Masala Dabba
* Dedicated visual organizer for the 7 classic Indian spices: *Haldi, Lal Mirch, Jeera, Dhaniya, Rai (Mustard Seeds), Garam Masala, and Hing*.
* Tracks daily tadka pinches and sends proactive refill alerts.

### 5. ⚠️ Zero-Stockout Restock Radar
* Predictive runout forecasting ("Milk runs out tonight", "Toor Dal in 2 days").
* 1-Click Smart Restock Basket generator that compiles low-stock items into an optimized delivery cart.

---

## 🚀 Google Initiative Alignment & Tech Stack

| Feature | Google Product | Purpose |
| :--- | :--- | :--- |
| **Physical Receipt OCR** | **Gemini Flash (Multimodal)** | Itemizes thermal receipts from D-Mart & Kirana stores |
| **Meal Depletion Engine** | **Vertex AI (Gemini 2.0 / 1.5)** | Reason over complex Indian recipe ingredients |
| **Online Ingestion** | **Gmail API** | Securely parse digital order invoices from delivery apps |
| **Live Database & Sync** | **Cloud Firestore** | Real-time multi-device household synchronization |
| **Cloud Hosting** | **Firebase Hosting / GitHub Pages** | Zero-latency global delivery |
