# NyaySahayak 2.0 (न्यायसहायक)

> **Verified Legal Intelligence & Courtroom Preparation Platform for the Indian Legal Ecosystem**  
> *"In legal AI, language models cannot be trusted as primary sources of legal truth. Every proposition must be verified, every fact must be grounded in page-level provenance, and every argument must survive adversarial sparring."*

---

## Overview

**NyaySahayak 2.0** is an enterprise-grade legal technology platform built specifically for Indian advocates, chambers, and judicial practitioners across the Supreme Court of India, High Courts, and Tribunals.

It solves the four critical failure modes of generic AI in Indian litigation:
1. **0% Legal Hallucinations**: Enforces the algorithmic **6-Check Citation Verification Protocol** across official court registries.
2. **Page-Level Provenance**: Retains coordinate-level bounding boxes and page numbers for every extracted fact, date, and exhibit from 500+ page paper books.
3. **Adversarial Courtroom Sparring**: Coordinates a **LangGraph Multi-Agent Courtroom Arena** featuring Opposing Counsel (Red Teamer), Bench Judge (Inquisitor), and Courtroom Coach.
4. **Editorial Forensic Aesthetic**: Replaces frivolous generic AI dashboard tropes with an austere, typography-led visual hierarchy modeled on Supreme Court Reports and archival parchment.

---

## Architecture & Technology Stack

- **Frontend (`apps/web`)**: Next.js 15+ App Router, React 19, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, React Three Fiber 9 & Drei.
- **Backend (`apps/api`)**: Python 3.12+, FastAPI, Pydantic v2, SQLAlchemy 2.0, Alembic, PostgreSQL 16 + pgvector, Redis, Celery.
- **Object Storage**: S3-compatible MinIO (local development) / AWS S3 (production) with short-lived presigned URLs.
- **Infrastructure (`infra/`)**: Docker Compose containerization for Postgres, Redis, and MinIO.

For full architectural blueprints, see:
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md)
- [`docs/API_CONTRACTS.md`](docs/API_CONTRACTS.md)
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)
- [`docs/SECURITY.md`](docs/SECURITY.md)
- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md)

---

## Quick Start

### 1. Start Infrastructure
```bash
make infra-up
# Or on Windows: .\scripts\dev.ps1 infra-up
```

### 2. Run Backend
```bash
# In active virtual environment:
pip install -r apps/api/requirements.txt
cd apps/api && alembic upgrade head
cd apps/api && uvicorn app.main:app --port 8000 --reload
```
API Documentation: `http://localhost:8000/docs`  
Health Check: `http://localhost:8000/health`

### 3. Run Frontend
```bash
npm install
npm run dev
```
Web Application: `http://localhost:3000`

---

## Testing & Verification

```bash
# Run backend pytest suite
pytest apps/api/tests -v

# Run frontend production build
npm run build
```

---

## License & Compliance

- Compliant with Chapter II, Part VI of the **Bar Council of India Rules**.
- Compliant with the **Digital Personal Data Protection Act (DPDP Act 2023)**.
- Strictly enforces zero-data-retention agreements for attorney-client privileged materials.
