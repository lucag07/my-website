/*
  # Replace trade with email on contact_submissions

  - Adds `email` for audit form contact address
  - Removes `trade` (no longer collected)
*/

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS email text;

UPDATE contact_submissions
SET email = 'legacy-unknown@submission.local'
WHERE email IS NULL;

ALTER TABLE contact_submissions
  ALTER COLUMN email SET NOT NULL;

ALTER TABLE contact_submissions
  DROP COLUMN IF EXISTS trade;
