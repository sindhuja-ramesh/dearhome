# DearHome - Comprehensive Google Cloud Architecture & System Design

## 1. High-Level Architectural Flow

```mermaid
flowchart TD
    %% 1. CLIENT & INGESTION SOURCES
    subgraph Sources ["1. Ingestion Sources & User Interfaces"]
        A1["📱 Voice & Conversational AI\n(Web Speech API + Gemini 2.0 Flash)"]
        A2["📸 Receipt Scanner\n(Camera Snapper + Gemini 2.0 Multimodal Vision)"]
        A3["📬 Live Gmail Sync\n(Zepto, Blinkit, Swiggy Instamart, Amazon Fresh)"]
    end

    %% 2. CLOUD INFRASTRUCTURE & GATEWAY
    subgraph GCP_Gateway ["2. Google Cloud Platform & Cloud Run Gateway"]
        B1["🚀 Google Cloud Run Microservice\n(Stateless Containerized Node.js Express)"]
        B2["🔨 Google Cloud Build\n(Automated CI/CD Docker Pipeline)"]
        B3["🔐 Google Cloud Secret Manager\n(IAM-Scoped API Key Storage)"]
    end

    %% 3. GOOGLE AI & REASONING ENGINE
    subgraph AI_Engine ["3. Google Gemini 2.0 AI Reasoning Engine"]
        C1["Gemini 2.0 Flash (Multimodal OCR)\n• Line Item Extraction\n• Units (kg, g, L, ml) & Prices"]
        C2["Gemini NLP & Recipe Intelligence\n• Freeform Grocery Parsing\n• Multi-Portion Recipe Depletion Graph\n• YouTube Video Curation"]
    end

    %% 4. PERSISTENCE & REAL-TIME SYNC
    subgraph Storage_Layer ["4. Google Cloud Firestore & Cloud Messaging"]
        D1[("🔥 Google Cloud Firestore\n• dearhome_pantry (Live Inventory)\n• dearhome_ledger (Debit & Credit Events)\n• dearhome_family (Taste Profile)")]
        D2["🚨 Proactive Restock Radar\n• Triggered when current stock ≤ threshold"]
    end

    %% CONNECTIONS
    A1 -->|"Natural Language Query"| B1
    A2 -->|"Receipt Base64 Image / PDF"| B1
    A3 -->|"OAuth Token / Inbound MIME"| B1

    B1 <-->|"Multimodal Extraction"| C1
    B1 <-->|"Portion Deductions & Recipe Reasoning"| C2

    B1 <-->|"Real-Time Documents Sync"| D1
    B2 -->|"Builds & Deploys Container"| B1
    B3 -.->|"Injects Secrets at Runtime"| B1

    D1 -->|"Real-Time Snapshot Listener"| A1
    D1 -->|"Alert Condition Evaluator"| D2
    D2 -->|"Web Push & Badge Alert"| A1
```

---

## 2. Layer-by-Layer Technical Specification

### Layer 1: Ingestion Sources & User Interfaces
- **Automated Gmail Quick-Commerce Sync**: One-click Google Identity Services (GIS) authorization. Queries inbox for delivery receipts from `zeptonow.com`, `blinkit.com`, `swiggy.in`, `amazon.in`, and extracts item payloads.
- **Multimodal Bill Scanner**: Dual-engine OCR with live camera viewfinder, in-browser adaptive contrast preprocessing, and Gemini 2.0 Flash multimodal image recognition.
- **Conversational Kitchen Assistant**: Web Speech API voice input connected to the live digital pantry state.

### Layer 2: Google Cloud Run & Serverless Microservice
- **Google Cloud Run**: Autoscaling, stateless containerized microservice on port `8080` (CPU: 1, Memory: 512MiB, Concurrency: 80).
- **Google Cloud Secret Manager**: Binds `Dearhome_api_key` to container environment variables at runtime.
- **Google Cloud Build**: Automated trigger configured in `cloudbuild.yaml` for continuous deployment upon git push.

### Layer 3: Google Gemini 2.0 AI Engine
- **Gemini 2.0 Flash**: Sub-second latency for multimodal image analysis and structured JSON invoice normalization.
- **Taxonomy Normalizer**: Maps regional ingredient names (e.g. *Tamatar* -> *Tomato*, *Atta* -> *Chakki Atta*) to standard inventory keys.

### Layer 4: Persistence & Zero-Waste Engine
- **Google Cloud Firestore**: NoSQL multi-region document store with offline persistence and real-time client snapshot listeners.
- **Recipe Depletion Graph**: Computes ingredient burns based on diner counts (adults, children, guests) and regional spice intensity settings.
