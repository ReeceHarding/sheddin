import dotenv from 'dotenv';
import { testSavedDesignEmail } from '../src/utils/tests/testSavedDesignEmail.js';

// Load environment variables
dotenv.config();

async function runTest() {
  try {
    // Verify required environment variables
    const requiredEnvVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    console.log('Starting email test...');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    const result = await testSavedDesignEmail();
    
    if (result.success) {
      console.log('✅ Test completed successfully');
    } else {
      console.error('❌ Test failed:', result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Test setup failed:', error);
    process.exit(1);
  }
}

runTest(); 