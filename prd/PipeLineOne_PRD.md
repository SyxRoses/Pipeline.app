# PipeLine One - Product Requirements Document (PRD)

**Project Name:** "PipeLine One" (Working Title)
**Goal:** A unified platform for pipeline construction management, merging GIS (Maps), Schedule, and Field Reporting.
**Architecture:** Monorepo. Mobile-responsive Web App (PWA capability).

## 1. Core User Roles & Responsibilities
The application must cater to these specific high-value roles:

- **Project Manager (PM) - "The Boss":**
    - **Focus:** Budget, Schedule, Quality, Client Relations.
    - **Capabilities:** Full access. View Financials, overarching Project Timeline, and High-Level Dashboards.
- **Construction Manager / Site Superintendent - "Field General":**
    - **Focus:** Daily Operations, Logistics, Crew Supervision.
    - **Capabilities:** View Maps, Submit/Approve Daily Progress Reports, Resource Management.
- **Chief Inspector / QC Manager - "The Gatekeeper":**
    - **Focus:** Compliance, Standards, Code adherence.
    - **Capabilities:** Submit Inspection Forms, Issue Stop-Work Orders (virtual flag), View Test Results (X-Rays).
- **Lead Engineer - "The Architect":**
    - **Focus:** Blueprints, Technical Integrity, Specs.
    - **Capabilities:** View/Update Design Drawings, Material Specs.
- **Safety Manager / HSE Director - "The Shield":**
    - **Focus:** Safety Compliance, Environmental Regs.
    - **Capabilities:** Submit Safety Checklists, Incident Reporting, Environmental Impact Audits.

## 2. Project Lifecycle & Modules
The app supports the end-to-end lifecycle:

### Phase 1: Pre-Construction & Planning
- **Modules:**
    - **Route Selection:** Map view showing topography and property lines.
    - **Design & Engineering:** Blueprint storage and viewer.
    - **Permitting:** Tracking ROW acquisition and environmental permits.
    - **Procurement:** Material tracking (Pipe, Valves).

### Phase 2: Construction (The Build)
- **Modules:**
    - **Clearing & Grading:** Progress tracking on the Map.
    - **Trenching:** Daily footage inputs.
    - **Stringing, Welding, Coating:** detailed Inspection forms (Weld IDs, Coating checks).
    - **Lowering-in & Backfilling:** Final check-offs.

### Phase 3: Completion & Closeout
- **Modules:**
    - **Testing (Hydro-Test):** Recording pressure test results and pass/fail status.
    - **Restoration:** Tracking revegetation and cleanup.
    - **Handover:** Final documentation package generation.

## 3. The "Must-Have" MVP Features

### A. The Map (Home Base)
- **Central Interface:** A Map, not a list.
- **Polyline Route:** Represents the pipeline.
- **Interactivity:** Click segments to see status (e.g., "Trenching Complete", "Welding In Progress").

### B. Daily Digital Packet (Role-Based)
- **Super:** Footage trenched, pipe strung, labor hours.
- **Inspector:** Weld IDs, pass/fail, photos.
- **Safety:** Tailgate meetings, hazard IDs.

### C. The Dashboard (Command Center)
- **Derived Metrics:** "50% of Route Cleared", "Budget vs Actual".
- **Feeds:** Real-time activity from the field.

## 4. Data Structure (Supabase Schema Plan)
- **users** (linked to Roles: PM, CM, QC, Engineer, Safety)
- **projects** (Name, Budget, Lifecycle Phase)
- **pipeline_segments** (Route chunks with Status per phase element)
- **daily_reports** (Type: Progress, Inspection, Safety, Incident)

## 5. Visual Identity (UI/UX)
- **Vibe:** "Industrial Luxury." (Milwaukee/DeWalt meets Apple).
- **Palette:**
    - Backgrounds: Clean White (#FFFFFF) & Slate (#F8FAFC).
    - Text: Deep Iron Gray (#1E293B).
    - Primary Action: "Safety Orange" (#F97316).
    - Status: Emerald (Good), Amber (Working), Rose (Bad/Stop).
- **Navigation:** Left Sidebar (Desktop) / Bottom Bar (Mobile).

## 6. Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Lucide React, React-Leaflet.
- **Backend:** Supabase (Client).
