/*
  # User Configurations Schema

  1. New Tables
    - `user_configs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `config_name` (text)
      - `options` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `user_configs` table
    - Add policies for authenticated users to:
      - Read their own configurations
      - Create new configurations
      - Update their existing configurations
*/

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