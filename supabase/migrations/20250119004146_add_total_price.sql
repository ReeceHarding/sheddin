/*
  # Add Total Price Column

  1. Changes
    - Adds total_price column to user_configs table
    - Sets default value to 0
    - Uses numeric type for precise decimal calculations
*/

BEGIN;
  -- Add total_price column if it doesn't exist
  DO $$ 
  BEGIN 
    IF NOT EXISTS (
      SELECT 1 
      FROM information_schema.columns 
      WHERE table_name = 'user_configs' 
      AND column_name = 'total_price'
    ) THEN
      ALTER TABLE user_configs 
      ADD COLUMN total_price numeric DEFAULT 0;
    END IF;
  END $$;
COMMIT; 