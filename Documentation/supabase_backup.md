# Supabase Backup Documentation

## Original Structure (as of January 19, 2024)

### Migration Files
1. `20250101004146_patient_sound.sql`:
```sql
CREATE TABLE IF NOT EXISTS user_configs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  config_name text NOT NULL,
  options jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_configs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own configs"
  ON user_configs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own configs"
  ON user_configs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own configs"
  ON user_configs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

2. `20250101005824_wispy_flower.sql`:
```sql
BEGIN;
  -- Update auth.users to not require email confirmation
  ALTER TABLE auth.users 
  ALTER COLUMN email_confirmed_at 
  SET DEFAULT NOW();
COMMIT;
```

### Current Schema Documentation
See: Documentation/supabase.md for full details of current setup 