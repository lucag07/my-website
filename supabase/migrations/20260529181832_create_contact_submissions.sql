/*
  # Create contact_submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key, auto-generated)
      - `full_name` (text, not null) - Submitter's full name
      - `business_name` (text, not null) - Name of the business
      - `phone_number` (text, not null) - Contact phone number
      - `email` (text, not null) - Contact email address
      - `target_city` (text, not null) - Target city/area for local ranking
      - `created_at` (timestamptz, default now()) - Submission timestamp

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add INSERT policy for anon users (form submissions work without authentication)
    - No SELECT/UPDATE/DELETE policies - data only accessible server-side
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  business_name text NOT NULL,
  phone_number text NOT NULL,
  email text NOT NULL,
  target_city text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous form submissions"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);
