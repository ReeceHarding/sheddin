# Supabase Project Structure

## Current Setup (Updated after CLI init)

The project has a Supabase implementation with the following structure:

```
supabase/
├── config.toml         # New: Main configuration file
├── .gitignore         # New: Supabase-specific gitignore
├── .temp/             # New: Temporary files directory
└── migrations/
    ├── 20250101004146_patient_sound.sql
    └── 20250101005824_wispy_flower.sql
```

## Project Configuration

Key settings from config.toml:
- Project ID: "sheddin"
- Database Port: 54322
- API Port: 54321
- Studio Port: 54323
- Auth enabled with site_url: "http://127.0.0.1:3000"
- Storage enabled with 50MiB file size limit

## Database Schema

### Tables

1. `user_configs`
   - `id` (uuid, primary key)
   - `user_id` (uuid, references auth.users)
   - `config_name` (text)
   - `options` (jsonb)
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)

### Security

Row Level Security (RLS) is enabled on the `user_configs` table with the following policies:
- Users can read their own configs
- Users can create their own configs
- Users can update their own configs

### Authentication

- Email confirmation is disabled for new signups
- Users get immediate access after registration
- JWT expiry set to 3600 seconds (1 hour)
- Minimum password length: 6 characters

## Next Steps

To implement the total_price field as specified in the 3D modeling instructions:
1. Create a new migration file to add the `total_price` column
2. The migration will need to alter the `user_configs` table
3. The new column should be numeric(10,2) with a default value of 0
