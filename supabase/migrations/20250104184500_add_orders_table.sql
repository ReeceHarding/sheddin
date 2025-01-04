/*
  # Orders Table Schema

  1. New Table
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `design_id` (uuid, references user_configs)
      - `shipping_address` (jsonb)
      - `billing_address` (jsonb)
      - `total_amount` (numeric)
      - `installation_type` (text)
      - `permit_plans` (boolean)
      - `foundation_type` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `orders` table
    - Add policies for authenticated users to:
      - Read their own orders
      - Create new orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  design_id uuid REFERENCES user_configs NOT NULL,
  shipping_address jsonb NOT NULL,
  billing_address jsonb NOT NULL,
  total_amount numeric NOT NULL,
  installation_type text NOT NULL,
  permit_plans boolean NOT NULL DEFAULT false,
  foundation_type text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id); 