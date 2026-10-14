# NyaySahayak 2.0 — Legacy Implementation Audit (v1.x Prototype)

**Document Reference**: `docs/LEGACY_AUDIT.md`  
**Status**: Completed  
**Subject**: Systematic forensic audit of the legacy prototype located at `C:\Users\SHIVANSH\NyaySahayak`  
**Author**: Lead Software Architect & Senior Full-Stack Engineer  
**Date**: October 2026  

---

## 1. Executive Summary

A comprehensive architectural and forensic audit of the legacy NyaySahayak prototype (`v1.x`) was conducted prior to designing NyaySahayak 2.0. The legacy prototype demonstrated valuable legal domain concepts (such as the 6-Check Verification intuition, a 3-agent courtroom sparring concept using LangGraph, and page-level document chunking). However, the implementation suffered from fundamental architectural flaws, severe concurrency bottlenecks, security vulnerabilities, synchronous blocking I/O, lack of schema versioning, and fragile frontend design.

NyaySahayak 2.0 adopts a **clean-slate architecture** within `NyaySahayak_v2`, retaining validated domain domain models and legal rules while discarding the entire prototype infrastructure.

---

## 2. Inventory of Legacy Components

The legacy repository consists of:
- **Backend**: FastAPI with SQLite (`nyaysahayak.db`), synchronous SQLAlchemy ORM without Alembic, mixed LangChain/LangGraph dependencies.
- **Frontend**: Vite + React 18 single-page application (SPA), Tailwind CSS v4 alpha, raw Three.js imperative rendering inside `main.js`/`index.html` and simple React components.
- **Storage**: Local filesystem storage (`backend/uploads/`), with raw paths written directly to database columns.
- **Processing**: In-process synchronous document parsing and LLM invocations executed directly inside HTTP request handlers.

---

## 3. Detailed Architectural & Technical Deficiencies

### 3.1 Synchronous Request-Response Blocking (Critical Architectural Flaw)
- **Observed in v1**: In `backend/app/api/documents.py` and `backend/app/api/simulation.py`, large multi-page document parsing (PDF extraction via PyMuPDF) and multi-agent LangGraph simulations were executed synchronously within the FastAPI HTTP request cycle.
- **Impact**: When parsing a 100-page paper book or running a 3-agent LLM chain, the HTTP worker was blocked for 30–90 seconds. Client connections timed out, and the entire API became unresponsive to concurrent users.
- **Resolution in 2.0**: Decouple all document ingestion, OCR, embedding generation, graph compilation, and courtroom simulation into an asynchronous worker pipeline backed by **Redis** and **Celery**, communicating progress via polling and Server-Sent Events (SSE).

### 3.2 Single-File SQLite Database & Missing Migrations
- **Observed in v1**: Database persistence relied on a local SQLite file (`nyaysahayak.db`) with schema initialization performed via `Base.metadata.create_all(bind=engine)` in `main.py`.
- **Impact**: SQLite does not support concurrent write operations under multi-worker execution, leading to `database is locked` runtime failures. No schema migration history existed; any model change required dropping the database and losing all data.
- **Resolution in 2.0**: Standardize on **PostgreSQL 16** with **pgvector** and full-text search extensions. All database modifications must strictly execute through versioned **Alembic** migrations.

### 3.3 Absence of Multi-Tenant Workspace Isolation
- **Observed in v1**: The data model (`models.py`) tied cases directly to `users.id` via a single foreign key:
  ```python
  class Case(Base):
      user_id = Column(String, ForeignKey("users.id"))
  ```
- **Impact**: Indian legal practices operate as chambers, law firms, and legal departments with varying roles (Senior Advocate, Advocate on Record, Associate, Clerk, Auditor). A flat user-case model prevented collaboration, shared firm repositories, or fine-grained role-based access control.
- **Resolution in 2.0**: Implement a true **Workspace** boundary (`workspaces` table) with role-based memberships (`workspace_members` with roles `OWNER`, `SENIOR_ADVOCATE`, `ASSOCIATE`, `PARALEGAL`, `AUDITOR`). All cases, documents, and simulations belong to a workspace, and access is enforced at the server level.

### 3.4 Insecure Local Storage & Lack of Object Store Abstraction
- **Observed in v1**: Uploaded files were written directly to local disk paths (`backend/uploads/{filename}`) and raw paths were stored in the `documents` table. Files were served without access validation.
- **Impact**: Files were vulnerable to directory traversal attacks, could not scale beyond a single physical server, lacked encryption at rest, and risked accidental leakage of privileged legal briefs.
- **Resolution in 2.0**: Implement an S3-compatible object storage layer (**MinIO** for local development, AWS S3 for production). Documents are stored with unique UUID keys, encrypted at rest, and accessible only through short-lived signed URLs generated after server-side authorization checks.

### 3.5 Fragile Heuristic "Verification" vs. Genuine Grounding
- **Observed in v1**: The "6-Check Citation Verification" module relied largely on regex matching and static dictionary lookup against a small hardcoded sample of citations. If a match failed, the system frequently returned unverified or mock data.
- **Impact**: In a courtroom preparation platform, false positives or unverified citations destroy attorney trust and can lead to professional sanction under the Advocates Act.
- **Resolution in 2.0**: Establish a dedicated **Authoritative Legal Corpus Registry** (Supreme Court of India, High Courts, India Code Bare Acts) with immutable hash identification. Build a multi-stage verification pipeline that checks existence in authoritative registries, validates exact text match, analyzes judicial treatment (overruled/distinguished), and requires explicit human lawyer sign-off.

### 3.6 Frontend Architecture Deficiencies
- **Observed in v1**:
  - React 18 client-only SPA built with Vite.
  - Absence of Next.js App Router and Server-Side Rendering (SSR).
  - Use of Tailwind CSS v4 alpha (`@tailwindcss/vite 4.3.3`) which caused unstable build behaviors.
  - Lack of accessible component primitives (shadcn/ui / Radix UI).
  - Raw Three.js imperative canvas scripts without declarative state management, leading to memory leaks and canvas tearing on tab switching.
  - Inconsistent visual design resembling a generic dark-mode SaaS dashboard with neon cyan and green accents rather than a serious legal instrument.
- **Resolution in 2.0**: Build frontend with **Next.js 15+ App Router**, **React 19**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion**, and **React Three Fiber 9 + Drei** for purposeful 3D visualizations adhering to the **Editorial Forensic** design system.

---

## 4. Reusable Domain Insights from Legacy Prototype

While the codebase is replaced, the following domain conceptual assets are retained and elevated in NyaySahayak 2.0:
1. **The 6-Check Citation Protocol**: The sequence of checks (Existence, Identity, Source Whitelist, Quotation Veracity, Proposition Grounding, and Temporal Precedent Trace) is architecturally sound and will be implemented with rigorous database and vector backing.
2. **The 3-Agent Courtroom Sparring Archetypes**:
   - *Opposing Counsel (Red Teamer)*: Seeks evidentiary gaps, procedural maintainability flaws, and adverse precedents.
   - *Bench Judge (Inquisitor)*: Asks hard judicial questions regarding statutory interpretation and constitutional bounds.
   - *Courtroom Coach (Strategist)*: Evaluates the advocate's delivery, flags missed concessions, and suggests sharp counter-rebuttals.
3. **Page-Level Provenance Contract**: Retaining the principle that no extracted fact, event, or citation may exist without a direct link to `document_id`, `page_number`, and text coordinate bounding box.

---

## 5. Transition & Clean-Slate Plan

| Dimension | Legacy Prototype (`NyaySahayak`) | NyaySahayak 2.0 (`NyaySahayak_v2`) |
| :--- | :--- | :--- |
| **Codebase Location** | `c:\Users\SHIVANSH\NyaySahayak` | `c:\Users\SHIVANSH\NyaySahayak_v2` |
| **API Architecture** | Unstructured FastAPI monolith | Layered Modular Monolith (API, Services, Repositories, Workers) |
| **Async Processing** | None (Synchronous blocking) | Redis + Celery distributed task queues |
| **Database** | SQLite (`nyaysahayak.db`) | PostgreSQL 16 + pgvector + FTS |
| **Migrations** | None (`create_all`) | Alembic migration scripts |
| **Object Storage** | Local disk (`backend/uploads`) | MinIO / S3 with signed URLs & encryption |
| **Frontend Framework** | Vite + React 18 SPA | Next.js App Router + React 19 + TypeScript |
| **Design Language** | Generic Dark/Neon SaaS | "Editorial Forensic" (Paper, Graphite, Vermilion) |
| **3D Rendering** | Imperative Three.js script | React Three Fiber 9 + Drei declarative canvas |
| **Multi-Tenancy** | None (Single user foreign key) | Workspace-level isolation with RBAC |
| **Verification Basis** | Heuristic regex / static dict | Authoritative Corpus Registry + Vector & Lexical Hybrid |
