/*
  # Disable email confirmation requirement

  1. Changes
    - Disables email confirmation requirement for new signups
    - Allows immediate access after registration
*/

BEGIN;
  -- Update auth.users to not require email confirmation
  ALTER TABLE auth.users 
  ALTER COLUMN email_confirmed_at 
  SET DEFAULT NOW();
COMMIT;