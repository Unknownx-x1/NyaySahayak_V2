# NyaySahayak 2.0 — Product Requirements Specification (PRD)

**Document Reference**: `docs/PRODUCT_REQUIREMENTS.md`  
**Status**: Approved Specification  
**Version**: 2.0.0  
**Target Domain**: Indian Legal Ecosystem (Supreme Court of India, High Courts, Tribunals, Subordinate Courts)  
**Author**: Lead Software Architect & Product Engineering  

---

## 1. Product Vision & Problem Statement

### 1.1 Vision
NyaySahayak 2.0 is a specialized legal intelligence and courtroom preparation platform engineered explicitly for Indian advocates, chambers, and judicial practitioners. It serves as an adversarial sparring partner and evidentiary co-counsel, transforming complex, multi-volume case filings ("paper books") into structured, verifiable forensic intelligence.

### 1.2 Core Problem Statement
Indian litigation involves voluminous paper books (often 300 to 2,000+ pages) composed of typed petitions, photocopied vernacular annexures, handwritten trial court depositions, and extensive citation references. Advocates face four acute operational risks:
1. **Evidentiary Blindspots**: Missing a contradictory statement across hundreds of pages of annexures.
2. **Citation Hallucinations & Distortions**: Relying on AI tools or opposing citations that distort the true judicial holding or quote overruled rulings.
3. **Loss of Page Provenance**: Inability to immediately cite the exact volume, page, and paragraph to a questioning bench during oral arguments.
4. **Unpreparedness for Hostile Interrogation**: Generic AI chat tools generate compliant, sycophantic responses instead of rigorously stress-testing an advocate's theory of the case against harsh judicial questioning and sharp opposing counter-arguments.

---

## 2. Target Users & Personas

| Persona | Role & Setting | Core Needs & Job-to-be-Done | Key Success Factor |
| :--- | :--- | :--- | :--- |
| **Senior Advocate / Lead Counsel** | Supreme Court of India & High Courts; arguing counsel | Rapid grasp of case crux; instant retrieval of exact paper-book page citations; adversarial sparring before admission/final hearing. | Zero fluff, brutal adversarial testing, precise page citations. |
| **Advocate-on-Record (AoR) / Briefing Counsel** | Supreme Court / High Courts; drafting & filing | Auditing citations in drafts; generating chronological lists of dates; spotting evidentiary contradictions between petition and trial record. | 100% provenance verification, strict compliance with court filing formats. |
| **Chamber Associate / Junior Counsel** | Litigation Chambers; case prep & research | Reading multi-volume lower court records; mapping exhibits to legal issues; discovering binding precedents across High Courts and Supreme Court. | Speed of ingestion, OCR fidelity across Hindi/Tamil/English, reliable Bare Act cross-referencing. |
| **Judicial Law Clerk / Researcher** | Appellate Benches; bench memos & fact verification | Verifying whether quotes in written submissions faithfully reflect the actual case law and trial court exhibits. | The 6-Check Citation Protocol; clear distinction between verified text and counsel inferences. |

---

## 3. Product Scope & Functional Boundaries

### 3.1 In-Scope
1. **Multi-Tenant Chamber Workspaces**: Secure organization-level data isolation, role-based access control (RBAC), and case docket management.
2. **High-Fidelity Document Ingestion**: Parsing complex PDFs, paper books, and DOCX briefs with page-number retention, multilingual OCR (English, Devanagari/Hindi, Tamil), and image-contrast enhancement.
3. **Forensic Page-Preserved Viewer**: Side-by-side view linking any extracted fact, date, or party directly to its physical bounding box on the original PDF page.
4. **Master Case Graph Synthesis**: Dynamic extraction and cross-linking of:
   - Structured Parties (Petitioner, Respondent, Proforma Parties, Counsel).
   - Chronological Timeline & Disputed Dates.
   - Evidence & Exhibit Assessment (Oral, Documentary, Electronic under Section 65B IEA / Section 63 BSA).
   - Core Legal Issues & Statutory Provisions.
5. **Authoritative Legal Corpus Registry**: Ingestion and indexing of official Bare Acts (India Code) and landmark rulings (Supreme Court Reports / High Courts), strictly isolated from user documents.
6. **The 6-Check Citation Verification Protocol**: Automated verification of existence, identity, source authenticity, quotation veracity, proposition support, and precedent trace.
7. **LangGraph Multi-Agent Courtroom Arena**: Adversarial oral argument simulation featuring an Opposing Counsel (Red Teamer), a Bench Judge (Inquisitor), and a Courtroom Coach (Strategist).
8. **Case Persistence & Audit Trail**: Versioned case graphs, immutable session transcripts, and tamper-evident audit logs.

### 3.2 Non-Goals & Explicit Exclusions
- **Not a "Robo-Lawyer" for Litigants**: The system does NOT provide legal advice directly to laypersons. It is strictly an assistive professional tool for qualified advocates.
- **Not an Automated Filing System**: It does NOT automatically file e-petitions into court registries (e-Courts, Supreme Court e-filing).
- **Not a Predictive Judgment Guarantee**: It does NOT predict judicial win/loss probabilities (which are statistically deceptive and ethically questionable in common law jurisprudence).
- **No Autonomous Brief Generation**: It does NOT output final court pleadings without mandatory advocate review and sign-off.

---

## 4. Primary User Journeys

### Journey 1: Register, Log In and Create a Workspace
1. **Trigger**: User visits NyaySahayak 2.0.
2. **Steps**:
   - User signs up with email, password, and professional credentials (Bar Council Enrollment No., Chamber/Firm Name).
   - System sends verification, hashes credentials using Argon2id/bcrypt, and issues secure httpOnly cookies.
   - User initializes an organization workspace (e.g., "Chambers of V. Sharma, Senior Advocate") and invites junior associates with specific roles (`SENIOR_ADVOCATE`, `ASSOCIATE`, `PARALEGAL`).
3. **Acceptance Criteria**: Tenant boundary created in PostgreSQL; all future actions scoped to the workspace ID.

### Journey 2: Create and Manage Legal Cases
1. **Trigger**: Advocate is briefed on a new SLP (Special Leave Petition) or First Appeal.
2. **Steps**:
   - Advocate navigates to Cases Docket and clicks "New Case Docket".
   - Inputs metadata: Case Title, Court Type (Supreme Court, Delhi High Court, NCLT, etc.), Matter Type (Civil, Criminal, Writ, Commercial), Case Number / CNR Number (optional), and Filing Stage.
   - System creates case record and assigns access privileges.
3. **Acceptance Criteria**: Case record persisted in `cases` table; unique UUID generated; audit log entry recorded.

### Journey 3: Upload a Paper Book or Case Documents
1. **Trigger**: Associate uploads a 450-page scanned paper book PDF or appeal brief.
2. **Steps**:
   - User drags and drops PDF/DOCX file into case document drawer.
   - Frontend calculates SHA-256 checksum and uploads file directly to MinIO/S3 object storage via presigned URL.
   - Backend registers document in `PENDING_PROCESSING` state and dispatches asynchronous Celery task.
   - Celery worker validates MIME type, runs PyMuPDF text extraction, assesses scan density, and conditionally triggers OCR for degraded or vernacular pages.
3. **Acceptance Criteria**: File securely stored in MinIO; page-by-page chunks created in PostgreSQL; worker updates status to `READY`; user notified via UI progress bar and SSE.

### Journey 4: Inspect Extracted Text with Source-Page Traceability
1. **Trigger**: Advocate wants to verify what the system extracted from Page 142 (Annexure P-4).
2. **Steps**:
   - Advocate opens the Case Document Inspector.
   - Split-screen UI presents the rendered PDF on the left and the extracted OCR/text blocks on the right.
   - Clicking any extracted sentence highlights the exact bounding box on the original PDF page.
   - Associate can flag OCR errors or re-run OCR with specialized language parameters (e.g., Hindi Devanagari).
3. **Acceptance Criteria**: Strict visual and data alignment between extracted text span and original document page.

### Journey 5: Generate Facts, Parties, Timeline Events, Evidence Assessments & Legal Issues
1. **Trigger**: Case team requests comprehensive Case Graph compilation.
2. **Steps**:
   - User triggers "Synthesize Case Graph".
   - Asynchronous worker processes document chunks through structured LLM extraction pipelines with strict Pydantic schemas:
     - **Parties**: Extracts petitioners, respondents, proforma parties, and counsel.
     - **Timeline**: Extracts dates, orders, FIR timestamps, and flags temporal contradictions (e.g., an exhibit dated prior to incident occurrence).
     - **Evidence Assessment**: Extracts exhibits (P-1, D-1), classifies evidence type (oral, documentary, digital), and evaluates evidentiary strength under Indian Evidence Act 1872 / Bharatiya Sakshya Adhiniyam 2023.
     - **Legal Issues**: Identifies jurisdictional hurdles, statutory violations, and constitutional questions.
   - Results are stored as a versioned Master Case Graph (`CaseGraphRecord` v1.0).
3. **Acceptance Criteria**: Master Case Graph persisted; every extracted node contains direct references to source document IDs, pages, and confidence scores.

### Journey 6: Research Legal Authorities & Ask Source-Grounded Questions
1. **Trigger**: Advocate asks: *"What is the latest Supreme Court position on whether an unstamped arbitration agreement can be acted upon for appointing an arbitrator?"*
2. **Steps**:
   - Advocate inputs query into Case Intelligence Q&A.
   - System performs hybrid search (dense pgvector embeddings + sparse PostgreSQL full-text search) across the official Authoritative Legal Corpus and the case record.
   - LLM synthesizes response citing *NN Global*, *In Re Interplay*, and relevant provisions of the Arbitration & Conciliation Act 1996 and Indian Stamp Act 1899.
   - Every sentence is accompanied by an inspectable source badge linking to the full judgment text and paragraph number.
3. **Acceptance Criteria**: Zero ungrounded assertions; system explicitly displays "Insufficient evidence in authoritative corpus" if no binding precedent is located.

### Journey 7: Check Citations, Quotations and Legal Propositions
1. **Trigger**: Advocate audits citations in the opposing party's Counter Affidavit.
2. **Steps**:
   - Advocate pastes a legal submission or extracts citations from the uploaded brief.
   - The **6-Check Citation Protocol** executes:
     1. *Existence Check*: Does the citation string conform to standard Indian legal citation formats (AIR, SCC, SCR, DLT, SCALE)?
     2. *Identity Check*: Do the parties and year match the official court record?
     3. *Source Whitelist Check*: Does the text originate from a verified official repository (Supreme Court Reports, High Court digital library, India Code)?
     4. *Quotation Veracity Check*: Does the quoted passage match the actual judicial text verbatim, or has it been cherry-picked/altered?
     5. *Proposition Grounding Check*: Does the ratio decidendi actually support the legal proposition claimed, or was it merely obiter dicta or a dissenting opinion?
     6. *Precedent Trace Check*: Has the judgment been subsequently overruled, reversed, distinguished, or referred to a larger bench?
   - System outputs a multi-tiered verification badge: `VERIFIED`, `PARTIAL`, `CONTESTED`, `OVERRULED`, or `FABRICATED/UNVERIFIED`.
   - Advocate can record human review notes and override status if appropriate.
3. **Acceptance Criteria**: Detailed 6-check audit card displayed in UI; audit report exportable to PDF.

### Journey 8: Practise Courtroom Arguments Using Multi-Agent Workflow
1. **Trigger**: Senior Advocate conducts oral argument sparring before tomorrow's hearing.
2. **Steps**:
   - Advocate enters the **Courtroom Arena**, selects the active issue (e.g., *"Maintainability under Article 226 when alternative statutory remedy exists"*), and inputs opening oral submission.
   - LangGraph orchestration engine invokes three specialized agents:
     - **Opposing Counsel (Red Teamer)**: Raises aggressive preliminary objections, cites contrary High Court judgments, and attacks evidentiary gaps in the paper book.
     - **Bench Judge (Inquisitor)**: Interrupts with sharp, pointed questions concerning the statutory bar, jurisdiction, and balance of convenience.
     - **Courtroom Coach (Strategist)**: Analyzes the advocate's arguments in real-time, highlights concessions made inadvertently, suggests specific page numbers from Annexure P-3 to quote, and formulates a razor-sharp counter-rebuttal.
   - The advocate replies in successive sparring turns until ready to conclude.
3. **Acceptance Criteria**: Multi-turn dialogue maintained in persistent session state; session transcript saved with audio/text cues, evidentiary flags, and coaching scorecards.

### Journey 9: Reopen Cases and Inspect Previously Generated Results
1. **Trigger**: Case is listed for hearing two months later after an adjournment.
2. **Steps**:
   - Advocate opens NyaySahayak and selects the case from the docket.
   - System reloads the exact Master Case Graph version, document page indices, previous citation audit results, and courtroom simulation transcripts without re-running expensive LLM pipelines.
   - Advocate can create a "Version 2.0" graph upon uploading fresh Rejoinder Affidavits or Additional Documents.
3. **Acceptance Criteria**: Instant state rehydration from PostgreSQL; graph versions cleanly separated and diffable.

---

## 5. Non-Negotiable Success Criteria & Quantitative Metrics

| Metric | Target SLA / Standard | Verification Method |
| :--- | :--- | :--- |
| **Citation Hallucination Rate** | 0% unflagged fabrications | Evaluation against 200 synthetic hallucination prompts & Indian citation benchmark. |
| **Page-Level Provenance Traceability** | 100% of extracted facts and citations must link to a valid `document_id` and page. | Automated schema validator rejecting ungrounded nodes. |
| **Document Processing Speed** | < 45 seconds for a standard 50-page PDF paper book (non-OCR); < 3 minutes for 50-page OCR. | Celery task performance benchmark. |
| **API Response Latency (Metadata/CRUD)** | P95 < 200ms | Load testing via k6 / pytest-benchmark. |
| **Courtroom Sparring Turn Latency** | P95 < 8 seconds for full 3-agent evaluation loop. | Streaming SSE responses with immediate visual feedback. |
| **Security & Isolation** | Zero cross-tenant data leakage (IDOR immune). | Automated security test matrix verifying workspace ownership. |

---

## 6. Error States & Graceful Degradation Protocols

1. **Severely Degraded or Illegible Scans**:
   - System flags the page with `EXTRACTION_CONFIDENCE < 0.40`.
   - UI displays a prominent warning badge: *"Page 87 contains degraded text. Manual review advised."*
   - Enables the advocate to manually transcribe or correct the passage directly in the UI.
2. **Contradictory Precedents / Split Benches**:
   - When legal research reveals conflicting Division Bench decisions, the system does not pick one arbitrarily.
   - It surfaces both decisions, notes the bench strength and date, and provides the doctrine of precedent hierarchy (e.g., Full Bench over Division Bench; later coordinate bench rules).
3. **Model API Downtime or Rate Limiting**:
   - The system immediately switches to secondary configured providers (e.g., Gemini Flash fallback to OpenAI GPT-4o, or local offline heuristic engine).
   - Never returns a fabricated success response. Returns explicit fallback status code with retry headers.
4. **Unverified Legal Citation in User Submission**:
   - Marked clearly with a vermilion warning card: `UNVERIFIED — NOT FOUND IN AUTHORITATIVE CORPO`.
   - Prevents advocates from quoting phantom citations in court.

---

## 7. Legal Limitations & Ethical Boundaries

1. **Advocates Act, 1961 & Bar Council of India (BCI) Rules**:
   - NyaySahayak complies with Chapter II, Part VI of BCI Rules (Standards of Professional Conduct and Etiquette).
   - The platform operates strictly as an internal research and chamber management assistant. It does not advertise, solicit briefs, or tout on behalf of any advocate.
2. **Attorney-Client Privilege (Section 126 & 129, Indian Evidence Act / BSA 2023)**:
   - All client briefs, correspondence, and paper books are confidential privileged communications.
   - The platform strictly enforces zero-data-retention agreements with LLM providers (no customer data used for model training).
3. **No Judicial Representation**:
   - System UI prominently displays disclaimers in accordance with judicial norms: *"NyaySahayak 2.0 is an analytical tool for qualified advocates. It does not substitute for independent legal research or counsel discretion."*

---

## 8. Data Retention, Sovereignty & Purging Policies

1. **Indian Data Residency (DPDP Act 2023 Compliance)**:
   - All primary databases, vector stores, and object storage buckets must reside in data centers located within the territory of India (e.g., AWS `ap-south-1` Mumbai / Hyderabad).
2. **Right to Erasure & Docket Purging**:
   - When a chamber archives or deletes a case docket, a cryptographic shredding protocol is triggered:
     - MinIO object keys deleted.
     - PostgreSQL records soft-deleted, then permanently purged after a 30-day retention window.
     - Vector embeddings removed from pgvector index.
3. **Immutable Audit Logs**:
   - In accordance with professional indemnity best practices, audit logs of citation verification checks (who ran the check, when, and what was returned) are retained immutably for 7 years unless court-ordered for earlier destruction.
