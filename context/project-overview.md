# 🩺 MyPatient

**One clean, fast, digitally-native prescription platform for doctors.**

Turn a doctor's daily workflow into structured, searchable, printable records.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-087EA4?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?logo=drizzle&logoColor=black)
![Postgres](https://img.shields.io/badge/Neon-Postgres-00E599?logo=postgresql&logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-monorepo-EF4444?logo=turborepo&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## 📑 Table of Contents

1. [Problem](#-the-problem)
2. [Target Users](#-target-users)
3. [Features](#-features)
4. [Data Model (Drizzle)](#-data-model)
5. [Tech Stack](#-tech-stack)
6. [Monetization](#-monetization)
7. [UI / UX & Design System](#-ui--ux--design-system)
8. [Suggested Project Structure](#-suggested-project-structure)
9. [Roadmap](#-roadmap)
10. [Reference Links](#-reference-links)

---

## 🎯 The Problem

Doctors manage prescriptions in a fragmented, inefficient way:

- ✍️ Handwritten prescriptions are slow, illegible, and easily lost.
- 🗂️ Patient history is buried in paper files or basic spreadsheets.
- 🔁 Repeated diagnosis protocols get re-typed from scratch every visit.
- 🧪 There is no structured way to order or track lab tests.
- 📋 No digital records exist for follow-up or audit.

**MyPatient** replaces all of this with a single structured form that renders a clean, printable prescription in real time — and quietly builds a searchable patient history as a side effect of normal work.

---

## 👥 Target Users

| User                                   | Primary need                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **General Practitioner / MBBS Doctor** | Write prescriptions quickly during consultations, with autocomplete for common medicines and diagnoses. |
| **Specialist Physician**               | Structured diagnosis tagging, lab investigation ordering, and clinical notes per session.               |

---

## ✨ Features

### A. 💊 Prescription Builder

The core of MyPatient. Doctors fill out a structured form, organized into five tabs, that drives a live A4 preview.

| Tab                | Icon (`lucide-react`) | Contents                                                                                                                               |
| ------------------ | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Symptoms**       | `Thermometer`         | Free-text chief complaint + quick-tap symptom chips (Fever, Headache, Cough…).                                                         |
| **Diagnosis**      | `Stethoscope`         | Autocomplete tag input; multiple diagnoses per Rx (e.g. _Hypertension Stage 1_, _Type 2 Diabetes Mellitus_).                           |
| **Medicines**      | `Pill`                | Repeatable medicine rows (see below).                                                                                                  |
| **Lab Tests**      | `FlaskConical`        | Chip-select from a standard investigations list (CBC, HbA1c, LFT, ECG…) + free-text custom tests.                                      |
| **Notes & Advice** | `NotebookPen`         | Clinical notes textarea + standard advice checkboxes (bed rest, fluids, light diet, avoid strenuous activity) + follow-up date picker. |

**Medicine row fields:**

- **Name** — autocomplete from drug database
- **Dosage** — e.g. `1 tab`, `5ml`
- **Frequency** — Morning / Afternoon / Evening / Night (multi-select buttons)
- **Duration** — e.g. `5 days`, `1 month`
- **Food timing** — Before / After food toggle

### B. 📄 Live Preview

A real-time A4 preview updates as the form is filled. It renders:

- Clinic header (name, address, contact)
- Doctor info (name, qualifications, BMDC registration)
- Patient info block (name, ID, age, gender, date)
- Diagnosis tags
- Numbered medicine list with full dosing details
- Lab investigations list
- Doctor's notes and advice
- Follow-up reminder
- `Rx` watermark

Supports **Print** (browser print dialog) and **PDF download** via jsPDF, named `Rx_PatientName_ID.pdf`.

### C. 👤 Patient Registry

A searchable table of all patients. Each row shows name, ID, gender, age, phone, last visit date, and total prescription count. **Search by name, patient ID, or phone.** Clicking a row loads the patient into the builder for a fast repeat visit.

### D. 🕑 Prescription History

A list of all saved prescriptions (local first, database later). Each entry shows patient name, diagnosis summary, and date, and links back to the full prescription for re-print or re-use.

### E. 📊 Reports & Analytics

A dashboard showing:

- Monthly summary: total consultations, new vs. repeat patients
- Top diagnoses chart (bar / progress style) for the current month
- Most prescribed medicines _(future)_

### F. ⚙️ Settings

Doctor + clinic configuration that populates every generated prescription: doctor name, qualifications, BMDC registration number, clinic name, address, and phone.

---

## 🗃️ Data Model

> **Architecture shift (June 2026):** database access moved out of the Next.js app. The schema now lives in the **NestJS API** (`apps/api`) and is defined with **Drizzle ORM** — one file per table under `apps/api/src/schemas/`, re-exported from `index.ts`, with all `relations()` in `relations.ts`. Key changes from the original Prisma model:
>
> - `Doctor` → **`user`**. The `monthlyPrescriptions` counter is gone (usage now lives in `userPermissionQuotas`). A user links to its current plan via `planId` + `planExpiresAt`.
> - New **RBAC + entitlement layer**: `permissions` (master catalog) → `plans` + `planPermissions` and `roles` + `rolePermissions` (blueprints) → `userPermissionQuotas` (a flat per-user snapshot read at guard time). `userRoles` lets one user hold multiple roles (for internal / super-admin team management).
> - `userPermissionQuotas` uses a **purchased-credit** model: `grantedValue` (total entitled / display denominator) + `remaining` (live balance, decremented per use; `0` = blocked until top-up). No calendar reset — a plan-expiry cron overwrites it to the free plan on downgrade (future feature).
> - `payments` records each purchase (`planName`, `durationMonths`, `amountPaid`, `paymentMethod` enum). Its `userId` is `set null` on delete so financial records survive user deletion.
> - `Prescription.medicines` stays a `jsonb` column typed as `MedicineEntry[]`.
> - Auth is being rebuilt in the API, so NextAuth `Account`/`Session` tables are gone; `user.password` / `provider` / `refreshToken` remain for the upcoming API auth.

### Drizzle schema (`apps/api/src/schemas/`)

```ts
// enums.ts
export const genderEnum = pgEnum("gender", ["Male", "Female", "Other"]);
export const prescriptionStatusEnum = pgEnum("prescription_status", ["Draft", "Saved", "Printed"]);
export const foodTimingEnum = pgEnum("food_timing", ["Before", "After"]);
export const paymentMethodEnum = pgEnum("payment_method", ["bkash", "nagad", "sslcommerz", "manual"]);

// user.ts  (renamed from Doctor)
export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  qualifications: text("qualifications"),
  bmdcRegNo: text("bmdc_reg_no"),
  contactNumber: text("contact_number"),
  clinicName: text("clinic_name"),
  clinicAddress: text("clinic_address"),
  clinicPhone: text("clinic_phone"),
  isOnboarded: boolean("is_onboarded").default(false).notNull(),
  planId: integer("plan_id").references(() => plans.id, { onDelete: "set null" }),
  planExpiresAt: timestamp("plan_expires_at"),
  provider: text("provider"),
  refreshToken: text("refresh_token"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

// patient.ts
export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  age: integer("age").notNull(),
  gender: genderEnum("gender").notNull(),
  address: text("address"),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
}, (t) => [index("patients_user_id_idx").on(t.userId), index("patients_phone_idx").on(t.phone)]);

// prescription.ts
export const prescriptions = pgTable("prescriptions", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  patientId: integer("patient_id").references(() => patients.id, { onDelete: "cascade" }).notNull(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  symptoms: text("symptoms"),
  diagnosisTags: text("diagnosis_tags").array().notNull().default([]),     // ["Hypertension Stage 1"]
  medicines: jsonb("medicines").$type<MedicineEntry[]>().notNull().default([]),
  labTests: text("lab_tests").array().notNull().default([]),
  customTests: text("custom_tests").array().notNull().default([]),
  doctorNotes: text("doctor_notes"),
  advice: text("advice").array().notNull().default([]),                    // ["rest", "fluids"]
  followUpDate: timestamp("follow_up_date"),
  status: prescriptionStatusEnum("status").default("Draft").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
}, (t) => [index("prescriptions_user_id_idx").on(t.userId), index("prescriptions_patient_id_idx").on(t.patientId)]);

// plan.ts — billing tiers
export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),   // 'free' | 'pro'
  priceMonthly: integer("price_monthly").notNull(),
});

// permission.ts — master catalog
export const permissions = pgTable("permissions", {
  key: varchar("key", { length: 100 }).primaryKey(),          // e.g. 'ai:use_features'
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }),
  type: varchar("type", { length: 50 }).notNull(),            // 'boolean' | 'numeric'
});

// plan-permission.ts — what each plan grants
export const planPermissions = pgTable("plan_permissions", {
  planId: integer("plan_id").references(() => plans.id, { onDelete: "cascade" }).notNull(),
  permissionKey: varchar("permission_key", { length: 100 })
    .references(() => permissions.key, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
  value: varchar("value", { length: 50 }).notNull(),          // '3' or 'true'
}, (t) => [primaryKey({ columns: [t.planId, t.permissionKey] })]);

// role.ts
export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),   // 'doctor' | 'super-admin'
});

// role-permission.ts — roles confer boolean capabilities only (no value column)
export const rolePermissions = pgTable("role_permissions", {
  roleId: integer("role_id").references(() => roles.id, { onDelete: "cascade" }).notNull(),
  permissionKey: varchar("permission_key", { length: 100 })
    .references(() => permissions.key, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.roleId, t.permissionKey] })]);

// user-role.ts — a user can hold multiple roles
export const userRoles = pgTable("user_roles", {
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  roleId: integer("role_id").references(() => roles.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.userId, t.roleId] })]);

// user-permission-quota.ts — flat snapshot, purchased-credit model
export const userPermissionQuotas = pgTable("user_permission_quotas", {
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  permissionKey: varchar("permission_key", { length: 100 })
    .references(() => permissions.key, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
  grantedValue: integer("granted_value").notNull(),           // total entitled
  remaining: integer("remaining").notNull(),                  // live balance; 0 = blocked
}, (t) => [primaryKey({ columns: [t.userId, t.permissionKey] })]);

// payment.ts
export const payments = pgTable("payments", {
  id: text("id").primaryKey().$defaultFn(() => randomUUID()),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  planName: text("plan_name").notNull(),
  durationMonths: integer("duration_months").notNull(),
  amountPaid: integer("amount_paid").notNull(),
  transactionId: text("transaction_id").notNull().unique(),
  paymentMethod: paymentMethodEnum("payment_method").default("sslcommerz"),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### Embedded `MedicineEntry` type

`prescriptions.medicines` is a `jsonb` array; the shape is kept type-safe and is co-located with the table in `apps/api/src/schemas/prescription.ts`:

```ts
export type FoodTiming = "Before" | "After";

export interface MedicineEntry {
  name: string; // autocomplete from drug DB
  dosage: string; // "1 tab", "5ml"
  frequency: string[]; // ["Morning", "Night"]
  duration: string; // "5 days", "1 month"
  foodTiming?: FoodTiming;
}
```

---

## 🧱 Tech Stack

| Layer              | Choice                                     | Current version _(June 2026)_ | Docs                                                                                     |
| ------------------ | ------------------------------------------ | ----------------------------- | ---------------------------------------------------------------------------------------- |
| Monorepo           | **Turborepo** + **pnpm**                   | turbo 2.x / pnpm 11           | [turborepo.com/docs](https://turborepo.com/docs)                                         |
| Frontend           | **Next.js** (App Router, SSR)              | 16.2.x                        | [nextjs.org/docs](https://nextjs.org/docs)                                               |
| UI runtime         | **React**                                  | 19.2 (bundled with Next 16)   | [react.dev](https://react.dev)                                                           |
| Backend API        | **NestJS** (SWC builder)                   | 11.x                          | [docs.nestjs.com](https://docs.nestjs.com)                                               |
| Language           | **TypeScript**                             | 5.x                           | [typescriptlang.org](https://www.typescriptlang.org/docs/)                               |
| Database           | **Neon PostgreSQL** (serverless)           | —                             | [neon.tech/docs](https://neon.com/docs)                                                  |
| ORM                | **Drizzle ORM** (+ drizzle-kit)            | 0.45.x / 0.31.x               | [orm.drizzle.team](https://orm.drizzle.team)                                             |
| Auth               | _planned — to be rebuilt in the NestJS API_ (was Auth.js/NextAuth) | —     | [docs.nestjs.com/security/authentication](https://docs.nestjs.com/security/authentication) |
| Styling            | **Tailwind CSS** + **ShadCN UI**           | v4                            | [tailwindcss.com](https://tailwindcss.com/docs) · [ui.shadcn.com](https://ui.shadcn.com) |
| Icons              | **lucide-react**                           | latest                        | [lucide.dev](https://lucide.dev/icons/)                                                  |
| PDF                | **jsPDF** (client-side)                    | latest                        | [github.com/parallax/jsPDF](https://github.com/parallax/jsPDF)                           |
| Caching _(future)_ | **Redis**                                  | —                             | [redis.io/docs](https://redis.io/docs/latest/)                                           |

---

## 🧭 Routes / Pages

| Route | Description |
| :--- | :--- |
| `/` | Home page |
| `/sign-in` | Sign in |
| `/sign-up` | Sign up |
| `/dashboard` | Stats overview, recent patients, quick actions |
| `/dashboard/patients` | Full patient registry with search |
| `/dashboard/prescriptions/new` | Prescription builder + live preview |
| `/dashboard/prescriptions/history` | Saved prescription log |
| `/dashboard/reports` | Monthly analytics & top diagnoses |
| `/dashboard/settings` | Clinic / doctor profile config |

> ⚠️ Auth routes (`/sign-in`, `/sign-up`) and route protection are pending — NextAuth was removed, and auth will be reintroduced via the NestJS API. The dashboard is currently unguarded.


## 💰 Monetization

Freemium model.

| Plan     | Price      | Prescriptions / month | Other |
| -------- | ---------- | --------------------- | ----- |
| **Free** | $0         | Up to 15              | —     |
| **Pro**  | $9 / month | Unlimited             | —     |

> 🛠️ **During development, all users get full Pro access.** Entitlement is modeled _structurally_ — `permissions` + `planPermissions` resolve into `userPermissionQuotas` as a `grantedValue`/`remaining` purchased-credit balance — but **not enforced** yet. The guard (atomic decrement) and the daily plan-expiry → downgrade cron land in a later feature.

---

## 🎨 UI / UX & Design System

**Principles:** clean, clinical, professional — doctors trust software that looks trustworthy. Light mode default, generous whitespace, subtle card shadows, rounded corners throughout.

### Color tokens

| Token            | Hex       | Usage                                          |
| ---------------- | --------- | ---------------------------------------------- |
| 🟦 Navy Blue     | `#1e3a8a` | Primary actions, headers, sidebar active state |
| 🟩 Clinical Teal | `#0d9488` | Secondary actions, success states              |
| 🟧 Amber         | `#d97706` | Pending states, warnings                       |
| 🟢 Emerald       | `#059669` | Completed / done states                        |
| ⬜ Slate grays   | `slate-*` | Text hierarchy                                 |

### Typography

- **DM Sans** — UI text
- **DM Serif Display** — logo

### Layout

- Fixed left **sidebar (240px)** + main content area.
- **Sticky top header** with page title, search bar, and a **"New Rx"** CTA.
- **Mobile (<768px):** sidebar collapses into an off-canvas drawer.

**Sidebar navigation** (icons from `lucide-react`):

| Nav item         | Icon              |
| ---------------- | ----------------- |
| Dashboard        | `LayoutDashboard` |
| Patients         | `Users`           |
| New Prescription | `FilePlus`        |
| History          | `History`         |
| Reports          | `BarChart3`       |
| Settings         | `Settings`        |

### Key screen layouts

- **Prescription Builder** — two columns on large screens (left = tabbed form, right = sticky live A4 preview); single column stacked on mobile/tablet (preview drops below the form).
- **Dashboard** — 3 stat cards (_Today's Patients_, _Prescriptions This Month_, _Total Patients_) + a recent-patients table with quick-load action.

### Micro-interactions

- Medicine rows animate in on add (slide + fade)
- Autocomplete dropdowns with keyboard navigation
- Toast notifications for save / print / PDF export
- Tab switching with active underline indicator
- Hover states on all clickable cards and rows
- Frequency and food-timing buttons with active fill states

---

## 📁 Suggested Project Structure

A **Turborepo** monorepo (pnpm) with the frontend and backend as separate workspaces:

```
mypatient/                     # Turborepo monorepo (pnpm)
├─ apps/
│  ├─ web/                     # Next.js frontend  → http://localhost:3000
│  │  └─ src/
│  │     ├─ app/               # landing (/) + dashboard routes
│  │     ├─ components/        # ui / dashboard / landing
│  │     └─ lib/               # utils (cn, etc.)
│  └─ api/                     # NestJS backend    → http://localhost:3001
│     ├─ src/
│     │  ├─ schemas/           # Drizzle tables (one file per table) + relations.ts + index.ts
│     │  ├─ drizzle/           # DrizzleModule (global DRIZZLE provider)
│     │  └─ health/            # GET /health
│     ├─ drizzle/              # drizzle.d.ts, migrate.ts, migrations/
│     ├─ drizzle.config.ts
│     └─ .env                  # PORT, CORS_ORIGIN, DATABASE_URL
├─ packages/                   # future shared code (types, etc.)
├─ turbo.json                  # task pipeline (dev/build/lint/test)
└─ pnpm-workspace.yaml
```

---

## 🛣️ Roadmap

- [ ] Core prescription builder + live A4 preview
- [ ] Patient registry & search
- [ ] Prescription history (local → database)
- [ ] PDF export (jsPDF) + print
- [ ] Auth (email/password + Google OAuth) — rebuilt in the NestJS API
- [ ] Settings / clinic onboarding
- [ ] Reports dashboard (monthly summary, top diagnoses)
- [ ] Pro plan + quota **enforcement** (guard + daily plan-expiry → downgrade cron)
- [ ] Most-prescribed-medicines analytics _(future)_
- [ ] Redis caching _(future)_
