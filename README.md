# 🌾 AgroSmart India

A comprehensive, zero-cost agriculture platform built for Indian farmers, dealers, and consumers. Powered by AI/ML for crop recommendations, yield predictions, and market intelligence.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 6 |
| Backend | Spring Boot 3.4 (Modular Monolith) |
| ML Service | Python 3.11 + FastAPI |
| LLM | Ollama (Local AI) |
| Database | MySQL 8.0 Community |
| Auth | JWT + Spring Security |

## Project Structure

```
Agriculture/
├── frontend/          # React SPA
├── backend/           # Spring Boot API
├── ml-service/        # Python ML API
├── database/          # SQL scripts & migrations
├── datasets/          # ML training data (gitignored)
└── docs/              # Documentation
```

## Quick Start

### Prerequisites
- JDK 17+
- Node.js 18+
- Python 3.11+
- MySQL 8.0+
- Ollama (optional, for AI features)

### 1. Database Setup
```bash
mysql -u root -p < database/schema/V1__core_schema.sql
mysql -u root -p agrosmart < database/seed/V2__seed_indian_states_districts.sql
mysql -u root -p agrosmart < database/seed/V3__seed_crops.sql
```

### 2. Backend
```bash
cd backend
mvn spring-boot:run
# Runs on http://localhost:8080
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 4. ML Service
```bash
cd ml-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Features
- 🧑‍🌾 **Multi-role**: Farmer, Dealer, Consumer, Admin, Govt Officer
- 🌱 **Crop Intelligence**: AI-powered crop recommendations
- 📊 **Yield Prediction**: ML-based yield forecasting
- 💰 **Market Prices**: Real-time mandi/APMC price tracking
- 🤖 **AI Assistant**: Local LLM for farming advice (Ollama)
- 🇮🇳 **India-First**: State→District→Taluk, ₹ currency, Kharif/Rabi/Zaid seasons
- 🌐 **Multilingual**: Hindi, English, Kannada, and more

## License
MIT
