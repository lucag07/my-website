/*
  # Create leads table

  1. New Tables
    - `leads`
      - `id` (uuid, primary key, auto-generated)
      - `full_name` (text, nullable)
      - `email` (text, not null)
      - `website` (text, not null)
      - `main_goal` (text, not null)
      - `source` (text, not null)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `leads` table
    - Add INSERT policy for anon users (form submissions work without authentication)
    - No SELECT/UPDATE/DELETE policies - data only accessible server-side
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text,
  email text NOT NULL,
  website text NOT NULL,
  main_goal text NOT NULL,
  source text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous form submissions"
  ON leads FOR INSERT
  TO anon
  WITH CHECK (true);
