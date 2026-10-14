# NyaySahayak 2.0 — API Contracts & Interface Specification

**Document Reference**: `docs/API_CONTRACTS.md`  
**Status**: Approved API Contract  
**Protocol**: REST over HTTPS / SSE (Server-Sent Events) for real-time streams  
**Base Path**: `/api/v1`  
**Standard**: OpenAPI 3.1 & RFC 7807 (Problem Details for HTTP APIs)  
**Author**: Lead Software Architect & Senior API Engineer  

---

## 1. Global Conventions & Standards

### 1.1 Authentication & Tenant Headers
All authenticated endpoints require an `Authorization` header containing a valid Bearer JWT, and optionally an active `X-Workspace-Id` header (if the user belongs to multiple chambers).
```http
Authorization: Bearer <access_token>
X-Workspace-Id: 4a2b9183-5c74-46e3-a249-1d41870b2401
Content-Type: application/json
```

### 1.2 RFC 7807 Error Response Contract
All error responses return a standardized `application/problem+json` envelope:
```json
{
  "type": "https://nyaysahayak.in/errors/resource-not-found",
  "title": "Case Docket Not Found",
  "status": 404,
  "detail": "Case with ID '8a123f90-...' does not exist or you lack permission in this workspace.",
  "instance": "/api/v1/cases/8a123f90-...",
  "code": "CASE_NOT_FOUND",
  "timestamp": "2026-10-14T10:15:30Z"
}
```

### 1.3 Pagination Standard
List endpoints use cursor- or offset-based query parameters:
`?page=1&limit=20&sort_by=created_at&order=desc`
Response envelope:
```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total_items": 142,
    "total_pages": 8,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## 2. API Endpoints Specification

### 2.1 Authentication & Workspace Management

#### `POST /api/v1/auth/register`
Register a new advocate account.
- **Request Body**:
  ```json
  {
    "email": "v.sharma@delhicourt.in",
    "password": "SecurePassword123#",
    "full_name": "V. K. Sharma",
    "bar_council_id": "D/1420/2008",
    "workspace_name": "Chambers of V. K. Sharma, Senior Advocate"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "user": {
      "id": "e30e1596-f947-4f67-a02b-a25e6e22c923",
      "email": "v.sharma@delhicourt.in",
      "full_name": "V. K. Sharma"
    },
    "workspace": {
      "id": "4a2b9183-5c74-46e3-a249-1d41870b2401",
      "name": "Chambers of V. K. Sharma, Senior Advocate",
      "role": "OWNER"
    },
    "tokens": {
      "access_token": "eyJhbGciOi...",
      "token_type": "bearer",
      "expires_in": 1800
    }
  }
  ```

#### `POST /api/v1/auth/login`
Authenticate user with email and password.
- **Response `200 OK`**:
  Returns user object, default workspace, and JWT tokens (refresh token set via `httpOnly`, `Secure`, `SameSite=Strict` cookie).

#### `GET /api/v1/workspaces`
List all workspaces the authenticated user belongs to.

---

### 2.2 Case Docket Management

#### `POST /api/v1/cases`
Create a new case docket in the active workspace.
- **Request Body**:
  ```json
  {
    "title": "M/s Apex Infrastructure Ltd. v. State of Maharashtra & Anr.",
    "case_number": "Civil Appeal No. 4589 of 2024",
    "cnr_number": "SCIN010045892024",
    "court_type": "SUPREME_COURT_OF_INDIA",
    "court_bench": "Court No. 3 (Hon'ble Justice K.V. Viswanathan & Hon'ble Justice N. Kotiswar Singh)",
    "matter_type": "Commercial Arbitration",
    "side_represented": "PETITIONER",
    "lead_counsel": "V. K. Sharma, Senior Advocate",
    "description": "Special Leave Petition challenging High Court order dismissing Section 34 petition under Arbitration Act."
  }
  ```
- **Response `201 Created`**:
  Returns full `CaseResponse` entity with initialized status `ACTIVE`.

#### `GET /api/v1/cases`
List cases within the active workspace with filtering by `status`, `court_type`, and search query.

#### `GET /api/v1/cases/{case_id}`
Retrieve complete case overview, document counts, graph status, and verification metrics.

---

### 2.3 Document Ingestion & Page-Level Provenance

#### `POST /api/v1/cases/{case_id}/documents/upload-intent`
Request a presigned URL to upload a paper book directly to MinIO/S3.
- **Request Body**:
  ```json
  {
    "file_name": "Paper_Book_Volume_1.pdf",
    "file_size_bytes": 48291040,
    "mime_type": "application/pdf",
    "sha256_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "document_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "upload_url": "https://storage.nyaysahayak.in/documents/9b1deb4d.../raw.pdf?X-Amz-Signature=...",
    "expires_in_seconds": 900
  }
  ```

#### `POST /api/v1/documents/{document_id}/confirm-upload`
Notify backend that the binary upload to object storage has completed and enqueue ingestion.
- **Response `202 Accepted`**:
  ```json
  {
    "document_id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "status": "UPLOADED",
    "task_id": "celery-task-883a-442c"
  }
  ```

#### `GET /api/v1/documents/{document_id}/pages/{page_number}`
Retrieve page text, OCR status, and coordinate bounding boxes for split-screen inspection.
- **Response `200 OK`**:
  ```json
  {
    "page_number": 142,
    "width_pts": 595.0,
    "height_pts": 842.0,
    "is_scanned": false,
    "ocr_confidence": 0.99,
    "image_preview_url": "https://storage.nyaysahayak.in/previews/page_142.png",
    "chunks": [
      {
        "chunk_id": "3a01-44bb",
        "chunk_index": 2,
        "text_content": "That the Petitioner on 14.03.2021 issued notice under Section 21 of the Act...",
        "bounding_box": {"x0": 72.0, "y0": 210.5, "x1": 520.0, "y1": 275.2}
      }
    ]
  }
  ```

---

### 2.4 Master Case Graph & Structured Intelligence

#### `POST /api/v1/cases/{case_id}/graph/synthesize`
Trigger asynchronous LLM synthesis of facts, timeline, evidence, and legal issues.
- **Response `202 Accepted`**:
  ```json
  {
    "case_id": "8a123f90-...",
    "status": "COMPILING",
    "task_id": "celery-graph-9921",
    "stream_url": "/api/v1/cases/8a123f90-.../graph/stream"
  }
  ```

#### `GET /api/v1/cases/{case_id}/graph`
Retrieve the latest published Master Case Graph.
- **Response `200 OK`**:
  ```json
  {
    "version": "1.0.0",
    "published_at": "2026-10-14T10:20:00Z",
    "summary": "Commercial dispute concerning the termination of an EPC contract...",
    "parties": [
      {"role": "PETITIONER", "name": "M/s Apex Infrastructure Ltd."},
      {"role": "RESPONDENT_1", "name": "State of Maharashtra"},
      {"role": "RESPONDENT_2", "name": "Maharashtra Industrial Development Corporation"}
    ],
    "facts_count": 18,
    "timeline_events_count": 24,
    "evidence_items_count": 12,
    "legal_issues_count": 4
  }
  ```

#### `GET /api/v1/cases/{case_id}/timeline`
Retrieve the chronological timeline with detected contradictions.
- **Response `200 OK`**:
  ```json
  {
    "events": [
      {
        "id": "t-101",
        "date": "2021-03-14",
        "title": "Section 21 Arbitration Notice Issued",
        "description": "Petitioner invoked arbitration clause nominating Sole Arbitrator.",
        "is_disputed": false,
        "provenance": {
          "doc_name": "Paper_Book_Vol_1.pdf",
          "page": 142
        }
      },
      {
        "id": "t-102",
        "date": "2021-02-10",
        "title": "Alleged Cure Notice by Respondent",
        "description": "Respondent claims cure notice was sent prior to contract termination.",
        "is_disputed": true,
        "contradiction_notes": "Annexure R-2 postal receipt date (2021-04-12) conflicts with claimed date of dispatch.",
        "provenance": {
          "doc_name": "Counter_Affidavit.pdf",
          "page": 38
        }
      }
    ]
  }
  ```

---

### 2.5 Citation Verification Protocol

#### `POST /api/v1/cases/{case_id}/verifications/audit`
Run the 6-Check Citation Verification Protocol on an extracted or pasted legal citation.
- **Request Body**:
  ```json
  {
    "citation_text": "Vidya Drolia and Others v. Durga Trading Corporation, (2021) 2 SCC 1",
    "quoted_passage": "Landlord-tenant disputes governed by special rent control statutes are not arbitrable.",
    "claimed_proposition": "Tenancy disputes are completely barred from arbitration under Section 11 of the Arbitration Act."
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "id": "v-8821a",
    "overall_status": "PARTIAL",
    "summary": "Quotation verified in official SCR record, but claimed proposition is overstated. Vidya Drolia held that tenancy disputes under Transfer of Property Act ARE arbitrable; only those governed by state rent control laws with exclusive jurisdiction are barred.",
    "checks": {
      "existence": {"pass": true, "details": "Found in Supreme Court Reports and SCC databases."},
      "identity": {"pass": true, "details": "Parties match: Vidya Drolia v. Durga Trading Corp; Year 2021."},
      "whitelist": {"pass": true, "source": "Supreme Court of India (3-Judge Bench)"},
      "quotation": {"pass": true, "verbatim_match_pct": 100.0, "official_paragraph": 79},
      "proposition": {"pass": false, "gap": "Proposition conflates general tenancy with statutory rent control exceptions."},
      "trace": {"pass": true, "status": "GOOD_LAW", "treatment": "Affirmed in In Re Interplay (7-Judge Bench, 2023)"}
    },
    "lawyer_review": "PENDING"
  }
  ```

#### `PATCH /api/v1/verifications/{verification_id}/review`
Record an advocate's audit sign-off or dispute.
- **Request Body**:
  ```json
  {
    "review_decision": "ACCEPTED",
    "lawyer_notes": "Distinction noted. Argument will be refined to emphasize tenancy is under Transfer of Property Act."
  }
  ```

---

### 2.6 Courtroom Arena Simulation (LangGraph Execution)

#### `POST /api/v1/cases/{case_id}/courtroom/sessions`
Initialize a new courtroom sparring session for an issue.
- **Request Body**:
  ```json
  {
    "active_issue_id": "issue-uuid-1234",
    "bench_composition": "Division Bench (Commercial Appellate Division)",
    "bench_temperament": "INQUISITORIAL"
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "session_id": "sim-session-7721",
    "status": "INITIALIZED",
    "initial_turn": 1
  }
  ```

#### `POST /api/v1/courtroom/sessions/{session_id}/turns`
Submit an oral argument turn and receive adversarial sparring responses from Opposing Counsel, Bench Judge, and Coach.
- **Request Body**:
  ```json
  {
    "user_argument": "My Lords, the petition is maintainable because the impugned termination order is manifestly arbitrary and violates the Wednesbury principle of reasonableness. The Respondent failed to provide the mandatory 30-day cure notice."
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "turn_number": 1,
    "opposing_counsel": {
      "speaker": "Counsel for Respondent (Opposing Counsel)",
      "argument": "We raise a preliminary objection on maintainability. This is a pure contractual dispute under a commercial EPC contract. A writ petition under Article 226 is barred when an efficacious alternative remedy in the form of arbitration exists under Clause 24. Furthermore, Annexure R-1 shows notice was indeed sent.",
      "objections": ["Alternative Statutory Remedy Available", "Disputed Questions of Fact"]
    },
    "bench_judge": {
      "speaker": "Hon'ble Presiding Judge",
      "queries": [
        "Counsel, why shouldn't we relegate you to arbitration under Clause 24? How does Article 226 lie against a contractual termination?",
        "Please direct our attention to where the cure notice clause is located in Volume 2 of your paper book."
      ],
      "judicial_demeanor": "SKEPTICAL"
    },
    "courtroom_coach": {
      "speaker": "Courtroom Coach (Strategist)",
      "critique": "You conceded that this is a contractual dispute without immediately anchoring your argument in the public law exception. You must immediately cite Harbanslal Sahnia v. Indian Oil Corp and Radhakrishna Agarwal.",
      "suggested_rebuttal": "Respond by citing Harbanslal Sahnia (2003) 2 SCC 107, Paragraph 7: Alternative remedy is not an absolute bar where the State acts in arbitrary repudiation of basic contractual fairness.",
      "paper_book_citation": "Direct the Bench to Volume 1, Page 84, Clause 18.2."
    }
  }
  ```
