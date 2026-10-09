# 🚀 AgroSmart Production Deployment Guide (Vercel + Render)

This project is fully configured for deployment with:
- **Frontend (Vite + React)** ➔ **Vercel**
- **Backend (Spring Boot 3 + Java 21)** ➔ **Render** (Docker Web Service)
- **ML Service (FastAPI + Python 3.11)** ➔ **Render** (Docker Web Service)
- **Database (MySQL)** ➔ **TiDB Cloud / Aiven / Clever Cloud / Railway**

---

## Step 1: Push Project to GitHub

In your terminal or PowerShell inside `c:\AGRI_DECISION-main\AGRI_DECISION-main`:

```bash
# 1. Create a new repository on https://github.com/new (e.g., "agrosmart-platform")
# 2. Link your local repo and push:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/agrosmart-platform.git
git branch -M main
git push -u origin main
```

---

## Step 2: Set Up Free Cloud MySQL Database

Render's free tier natively offers PostgreSQL, so for MySQL, use a free cloud MySQL provider:

### Recommended: TiDB Cloud (Serverless MySQL - Free Forever)
1. Sign up at [tidbcloud.com](https://tidbcloud.com) (No credit card needed).
2. Click **Create Cluster** ➔ Select **Serverless** (Free).
3. Under **Security Settings**, allow all IPs (`0.0.0.0/0`).
4. Click **Connect** ➔ Choose **General** to get your JDBC connection details:
   - Host, Port (4000), Username, Password, Database Name (`agrosmart`).
5. **Import Schema & Seed Data**:
   Upload or run the included SQL dump:
   ```bash
   mysql -h <tidb-host> -P 4000 -u <user> -p <database_name> < database/agrosmart_production_dump.sql
   ```

---

## Step 3: Deploy Backend & ML Service to Render

### Method A: One-Click with Render Blueprint (`render.yaml`)
1. Go to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** ➔ **Blueprint**.
3. Connect your GitHub repository.
4. Render will automatically read `render.yaml` and discover both services:
   - `agrosmart-backend` (Spring Boot via `backend/Dockerfile`)
   - `agrosmart-ml` (FastAPI via `ml-service/Dockerfile`)
5. In the configuration prompt, provide your Database environment variables:
   - `SPRING_DATASOURCE_URL`: `jdbc:mysql://<host>:<port>/<database>?useSSL=true`
   - `SPRING_DATASOURCE_USERNAME`: `<your_db_username>`
   - `SPRING_DATASOURCE_PASSWORD`: `<your_db_password>`
6. Click **Apply**. Render will build and deploy both services!
7. Note down your backend URL (e.g., `https://agrosmart-backend.onrender.com`).

### Method B: Manual Web Service Setup (if not using Blueprint)
**Backend Service:**
- **Source**: GitHub repo
- **Runtime**: Docker (`backend/Dockerfile`)
- **Docker Context**: `backend`
- **Environment Variables**:
  - `PORT`: `10000`
  - `SPRING_DATASOURCE_URL`: `jdbc:mysql://<host>:<port>/<database>?useSSL=true`
  - `SPRING_DATASOURCE_USERNAME`: `<db_user>`
  - `SPRING_DATASOURCE_PASSWORD`: `<db_pass>`
  - `CORS_ALLOWED_ORIGINS`: `*`
  - `ML_SERVICE_URL`: `https://<your-ml-service>.onrender.com`

---

## Step 4: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New...** ➔ **Project**.
3. Import your `agrosmart-platform` GitHub repository.
4. Configure Project Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: Click edit and select `frontend` (or leave as `./`)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Environment Variables**:
   Add this environment variable:
   - `VITE_API_BASE_URL`: `https://<YOUR-RENDER-BACKEND-URL>.onrender.com/api/v1`
6. Click **Deploy**.
7. In ~60 seconds, your site is live with a `https://<project>.vercel.app` URL!

---

## Configuration Files Added

| File | Purpose |
| :--- | :--- |
| `frontend/vercel.json` | Handles single-page app (SPA) routing rewrites on Vercel |
| `vercel.json` | Root monorepo fallback configuration for Vercel |
| `backend/Dockerfile` | Multi-stage Java 21 Temurin Docker container for Render |
| `ml-service/Dockerfile` | Python 3.11 FastAPI Docker container for Render |
| `render.yaml` | Infrastructure blueprint for deploying backend + ML services together |
| `database/agrosmart_production_dump.sql` | Complete database backup ready for cloud MySQL import |
| `backend/src/main/resources/application.yml` | Updated to inject cloud environment variables dynamically |
| `frontend/src/services/api.js` | Configured to read `VITE_API_BASE_URL` |
