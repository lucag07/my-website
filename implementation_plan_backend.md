# Backend Implementation Plan — Save Form Data to Supabase

## Overview

Both forms on the site (Hero section + Exit Intent popup) collect the same 4 fields:
- **Your Name** (only the Hero form — popup skips this)
- **Email Address**
- **Your Website**
- **What's your main goal?**

The Supabase client is already set up in `src/lib/supabase.ts` and connected via `.env`.
However the existing `contact_submissions` table uses wrong/mismatched column names.
We need to create a clean new table (or alter the existing one) with the exact right columns,
then update both form components to write to those columns correctly.

---

## Current State (What Exists)

| Thing | Status |
|---|---|
| Supabase project | ✅ Already exists (`gjuzeyozpqwuuahbuvvp.supabase.co`) |
| `.env` keys | ✅ Already set (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) |
| `src/lib/supabase.ts` client | ✅ Already set up |
| `contact_submissions` table | ⚠️ Exists but uses wrong column names |
| Hero form saving | ⚠️ Partially works — maps `goal` → `target_city` (wrong) |
| Popup form saving | ⚠️ Partially works — hardcodes `full_name` as `"Exit Intent Lead"` (wrong) |

---

## Problems to Fix

1. The table columns don't match the form fields — `goal` is saved under `target_city`, which is misleading.
2. The popup form doesn't collect `full_name` at all but inserts a hardcoded string.
3. There's no `source` column to distinguish which form the lead came from (Hero vs Popup).

---

## Step-by-Step Plan

---

### STEP 1 — YOU DO THIS: Create the correct Supabase table

Log into your Supabase dashboard at https://supabase.com/dashboard and go to:
**SQL Editor** → **New Query**

Paste and run this SQL:

```sql
CREATE TABLE IF NOT EXISTS leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  full_name text,
  email text NOT NULL,
  website text,
  main_goal text,
  source text DEFAULT 'hero'
);

-- Allow anonymous inserts (your frontend uses the anon key)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon inserts" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);
```

**Table columns explained:**

| Column | What it stores |
|---|---|
| `id` | Auto-generated unique ID for each row |
| `created_at` | Auto timestamp when the row was created |
| `full_name` | "Your Name" field (only Hero form fills this) |
| `email` | "Email Address" field |
| `website` | "Your Website" field |
| `main_goal` | "What's your main goal?" field |
| `source` | Which form submitted — `'hero'` or `'popup'` |

---

### STEP 2 — I DO THIS (coding): Update the Hero form insert

In `src/components/HeroSection.tsx`, change the Supabase insert from:

```ts
// ❌ BEFORE (wrong column names)
supabase.from("contact_submissions").insert({
  full_name: form.full_name,
  business_name: "Pending",
  phone_number: "Not provided",
  email,
  target_city: form.goal,   // ← wrong column name
  website: form.website,
})
```

To:

```ts
// ✅ AFTER (correct column names)
supabase.from("leads").insert({
  full_name: form.full_name,
  email,
  website: form.website,
  main_goal: form.goal,
  source: "hero",
})
```

---

### STEP 3 — I DO THIS (coding): Update the Exit Intent popup insert

In `src/components/ExitIntentModal.tsx`, change the insert from:

```ts
// ❌ BEFORE (hardcoded name, wrong columns)
supabase.from("contact_submissions").insert({
  full_name: "Exit Intent Lead",   // ← hardcoded, not from user
  business_name: "Pending",
  phone_number: "Not provided",
  trade: "Unknown",
  email: normalizedEmail,
  target_city: goal,               // ← wrong column name
  website: website,
})
```

To:

```ts
// ✅ AFTER (correct columns, source tracked)
supabase.from("leads").insert({
  full_name: null,                 // popup doesn't ask for name
  email: normalizedEmail,
  website: website,
  main_goal: goal,
  source: "popup",
})
```

---

### STEP 4 — OPTIONAL (YOU): Verify in Supabase dashboard

After running the forms, go to:
**Supabase Dashboard → Table Editor → leads table**

You should see rows appearing with the correct data under each column header.

---

## Summary of Who Does What

| Step | Who | Action |
|---|---|---|
| 1 | **You** | Run the SQL in Supabase dashboard to create the `leads` table |
| 2 | **Me (coding)** | Update `HeroSection.tsx` to insert into `leads` with correct columns |
| 3 | **Me (coding)** | Update `ExitIntentModal.tsx` to insert into `leads` with correct columns |
| 4 | **You** | Test both forms and verify data appears in Supabase table |

---

## When You're Ready

Once you've run the SQL in Step 1, just tell me and I'll immediately do Steps 2 & 3.
The code changes are straightforward and will take about 2 minutes.
