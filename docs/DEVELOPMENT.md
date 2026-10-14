# NyaySahayak 2.0 — Local Developer Setup & Workflow Guide

**Document Reference**: `docs/DEVELOPMENT.md`  
**Target Audience**: Software Engineers, QA Engineers, DevOps  
**Last Updated**: October 2026  

---

## 1. Prerequisites

Before setting up NyaySahayak 2.0 locally, ensure the following runtimes are installed on your workstation:

| Runtime / Tool | Minimum Version | Verification Command |
| :--- | :--- | :--- |
| **Node.js** | `>= 20.0.0` (LTS recommended) | `node --version` |
| **npm** | `>= 10.0.0` | `npm --version` |
| **Python** | `>= 3.12.0` (3.12 or 3.13) | `python --version` |
| **Docker Desktop** | `>= 24.0.0` (with Docker Compose v2) | `docker --version` |
| **Git** | `>= 2.40.0` | `git --version` |

---

## 2. Quick Start (Step-by-Step)

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-org/NyaySahayak_v2.git
cd NyaySahayak_v2
```

### Step 2: Start Local Infrastructure (Docker Compose)
Launch the containerized dependencies (PostgreSQL 16 with pgvector, Redis 7, MinIO S3):
```bash
# Using Makefile
make infra-up

# Or using Windows PowerShell
.\scripts\dev.ps1 infra-up

# Or directly via Docker Compose
docker compose -f infra/docker-compose.yml up -d
```
Verify that all services are healthy:
```bash
docker compose -f infra/docker-compose.yml ps
```
Services available:
- **PostgreSQL**: `localhost:5432` (User: `postgres`, Pass: `postgres`, DB: `nyaysahayak`)
- **Redis**: `localhost:6379`
- **MinIO S3 API**: `http://localhost:9000` (Access: `minioadmin`, Secret: `minioadmin`)
- **MinIO Web Console**: `http://localhost:9001`

---

### Step 3: Backend Setup (FastAPI & Celery)

1. Create and activate a Python virtual environment:
   ```bash
   # Windows PowerShell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1

   # Linux / macOS
   python3 -m venv .venv
   source .venv/bin/activate
   ```

2. Install backend dependencies:
   ```bash
   pip install -r apps/api/requirements.txt
   ```

3. Configure environment variables:
   ```bash
   cp apps/api/.env.example apps/api/.env
   ```

4. Apply database migrations:
   ```bash
   # Using Makefile
   make api-migrate

   # Or using PowerShell
   .\scripts\dev.ps1 api-migrate

   # Or directly
   cd apps/api && alembic upgrade head
   ```

5. Run the FastAPI development server:
   ```bash
   # Using Makefile
   make api-dev

   # Or using PowerShell
   .\scripts\dev.ps1 api-dev

   # Or directly
   cd apps/api && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   Interactive API documentation will be available at:
   - Swagger UI: `http://localhost:8000/docs`
   - Health Probe: `http://localhost:8000/health`
   - Versioned Health: `http://localhost:8000/api/v1/health`

---

### Step 4: Frontend Setup (Next.js 15+ App Router)

1. In a separate terminal, install monorepo and frontend dependencies:
   ```bash
   npm install
   ```

2. Start the Next.js development server:
   ```bash
   # Using root script
   npm run dev

   # Or using Makefile
   make web-dev

   # Or using PowerShell
   .\scripts\dev.ps1 web-dev
   ```
   Open `http://localhost:3000` in your browser.

---

## 3. Running Automated Tests & Code Quality Checks

### Backend Tests (`pytest` & `Ruff`)
The backend test suite runs with in-memory database isolation and does not require external network calls:
```bash
# Run pytest suite
pytest apps/api/tests -v

# Run linter and formatting checks
ruff check apps/api
ruff format --check apps/api
```

### Frontend Build & Lint Checks
```bash
# TypeScript compiler check
cd apps/web && npx tsc --noEmit

# ESLint check
cd apps/web && npm run lint

# Production build verification
cd apps/web && npm run build
```

---

## 4. Project Directory Topology

```text
NyaySahayak_v2/
├── apps/
│   ├── api/                     # FastAPI Backend (Python 3.12+)
│   │   ├── alembic/             # Database migration scripts
│   │   ├── app/
│   │   │   ├── api/v1/          # Versioned API routes
│   │   │   ├── core/            # Config, logging, middleware, security
│   │   │   ├── db/              # SQLAlchemy 2.0 engine, sessions, base
│   │   │   ├── models/          # SQLAlchemy mapped entity models
│   │   │   ├── repositories/    # Database access abstractions
│   │   │   ├── schemas/         # Pydantic v2 validation contracts
│   │   │   ├── services/        # Business logic services
│   │   │   └── workers/         # Celery task definitions
│   │   ├── tests/               # Backend unit and integration tests
│   │   ├── requirements.txt     # Python dependencies
│   │   └── pyproject.toml       # Ruff & pytest configuration
│   └── web/                     # Next.js Frontend (React 19, TypeScript)
│       ├── src/app/             # Next.js App Router pages
│       ├── src/lib/             # Frontend utilities & clients
│       ├── package.json         # Frontend packages
│       └── tailwind.config.ts   # Editorial Forensic design tokens
├── infra/
│   └── docker-compose.yml       # Local Postgres, Redis, MinIO infrastructure
├── docs/                        # Complete architectural specifications
├── scripts/                     # Developer automation helper scripts
├── Makefile                     # Standard developer commands
├── package.json                 # Monorepo workspaces manifest
└── .gitignore                   # Exclusions for secrets, caches, and builds
```

---

## 5. Troubleshooting Common Issues

### Issue: "Docker daemon not running"
Ensure Docker Desktop is started and the Linux engine has initialized. If running tests locally without Docker, `pytest` uses an in-memory SQLite engine (`sqlite+aiosqlite:///:memory:`) so unit and integration tests still pass.

### Issue: Port 5432 or 8000 already in use
Check for existing processes running on those ports:
```powershell
Get-NetTCPConnection -LocalPort 5432,8000 -ErrorAction SilentlyContinue
```
You can customize ports in `apps/api/.env` or `infra/docker-compose.yml`.
