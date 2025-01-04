import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://vxvbmrcogvtxqgzxnafg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4dmJtcmNvZ3Z0eHFnenhub2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0MDA3NDAsImV4cCI6MjAxOTk3Njc0MH0.aNFGZPVFIyU-3L6Ot8qfK-UXJQVVBgbEhpqe_FXz_Ks';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testEmailFunction() {
  console.log('Testing email function...');

  const testOrderDetails = {
    orderId: 'TEST-123',
    customerName: 'Test Customer',
    customerEmail: 'reeceharding@gmail.com',
    modelDetails: {
      name: 'Summit 308',
      size: '14x22',
    },
    selectedOptions: {
      entry: 'Front Entry',
      siding: 'Lap Siding',
      sidingColor: 'Desert Sand',
      windows: 'More Privacy',
      interior: 'Fully Equipped',
      exteriorAddons: ['Premium Lighting Package'],
    },
    pricing: {
      basePrice: 75000,
      totalPrice: 85000,
    },
  };

  try {
    console.log('Invoking Supabase function with test data:', JSON.stringify(testOrderDetails, null, 2));
    
    const { data, error } = await supabase.functions.invoke('send-order-confirmation', {
      body: { orderDetails: testOrderDetails }
    });

    if (error) {
      console.error('Error invoking function:', error);
      if (error.context) {
        console.error('Error context:', {
          status: error.context.status,
          statusText: error.context.statusText,
          headers: Object.fromEntries(error.context.headers.entries()),
        });
        try {
          const errorBody = await error.context.json();
          console.error('Error body:', errorBody);
        } catch (e) {
          console.error('Error parsing error body:', e);
        }
      }
      return;
    }

    console.log('Function response:', data);
    console.log('Email test completed successfully!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testEmailFunction(); 