

https://github.com/user-attachments/assets/2565d2a1-2f84-4ace-b37d-dd88be9d978d

# Arthrex VIP User Role Permissions Matrix

## Project Info

| Field       | Details                                      |
|-------------|----------------------------------------------|
| **Name**    | Arthrex VIP User Role Permissions Matrix     |
| **Version** | v9.2.0                                       |
| **Author**  | Arthrex — SD12641                            |
| **Built**   | July 2026                                    |

---

## Description

A standalone **Angular 17+ web application** that displays the User Role Permissions Matrix for **Arthrex Virtual Implant Positioning (VIP) v9.2.0**.

Provides a clean, searchable, dark-themed interface for reviewing which roles have access to which actions across the platform.

---

## Features

### PERMISSIONS Tab
- Full permissions matrix with **55 actions** across **6 roles**
  - Administrator, Technician, Surgeon, Sales Rep, Assistant, Operations
- **Three view modes:**
  - **Table** — full grid with Yes / No / N/A badges
  - **Cards** — action-focused card layout
  - **Compare** — side-by-side role comparison
- **Live search** — filter actions by keyword instantly

### CASE STATUS Tab
- Manual Case Status Change permissions
- **Product sub-tabs:** OTS and PSB
- **Role sub-tabs:** Admin and Technician
- Flow-style status transition display showing which statuses each role can move a case to

---

## Tech Stack

| Technology | Details                              |
|------------|--------------------------------------|
| Framework  | Angular 17 (standalone components)   |
| Language   | TypeScript                           |
| Styling    | SCSS — custom dark theme             |
| State      | Angular Signals + Computed           |
| UI Libs    | None (fully custom)                  |

---

## Theme

Styled to match the **Arthrex VIP application** exactly:
- Near-black header (`#0d0f18`)
- Cyan-blue accent (`#4db8ff`)
- Dark navy page background (`#181c27`)
- Inter font family
- Green / Red / Grey permission badges

---

## Project Structure

```
src/
├── app/
│   ├── app.component.ts / .html / .scss
│   ├── app.config.ts
│   ├── models/
│   │   └── permission.model.ts
│   ├── services/
│   │   └── permissions.service.ts        ← all permissions data lives here
│   ├── pipes/
│   │   └── highlight.pipe.ts
│   ├── styles/
│   │   └── _variables.scss               ← theme colors & fonts
│   └── components/
│       ├── header/
│       ├── search-bar/
│       ├── view-toggle/
│       ├── table-view/
│       ├── compare-view/
│       ├── cards-view/
│       └── case-status/                  ← OTS/PSB status transitions
├── styles.scss
├── main.ts
└── index.html
```

---

## Running Locally

### Prerequisites
- Node.js LTS (v18+)
- npm

### Steps

```powershell
# 1. Navigate to the project folder
cd "C:\Users\SD12641\OneDrive - arthrex.com\Desktop\vibe code\user-role-matrix\angular-app"

# 2. Install dependencies (first time only)
npm install

# 3. Start the dev server
npm start
```

Then open your browser at: **http://localhost:4200**

### Production Build

```powershell
npm run build
```

Output goes to `dist/arthrex-vip-permissions/`.

---

## Updating Permissions Data

All permissions data is in:
```
src/app/services/permissions.service.ts
```

Each row follows this format:
```ts
{ action: 'Action Name', permissions: { Administrator: 'Yes', Technician: 'No', Surgeon: 'N/A', 'Sales Rep': 'No', Assistant: 'No', Operations: 'No' } },
```

Case status transition data is in:
```
src/app/components/case-status/case-status.component.ts
```
