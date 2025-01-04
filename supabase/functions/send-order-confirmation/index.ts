// Follow this setup guide to integrate the Deno runtime with your functions:
// https://deno.com/manual/getting_started/setup_your_environment

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  modelDetails: {
    name: string;
    size: string;
  };
  selectedOptions: {
    entry: string;
    siding: string;
    sidingColor: string;
    windows: string;
    interior: string;
    exteriorAddons: string[];
  };
  pricing: {
    basePrice: string;
    totalPrice: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Log request details
    console.log('Function invoked with method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));

    // Get the SendGrid API key from environment variable
    const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY');
    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key not found in environment variables');
      throw new Error('SendGrid API key not found');
    }

    // Parse the request body
    const requestText = await req.text();
    console.log('Raw request body:', requestText);

    let requestData;
    try {
      requestData = JSON.parse(requestText);
    } catch (e) {
      console.error('Error parsing request body:', e);
      throw new Error('Invalid JSON in request body');
    }

    console.log('Parsed request data:', JSON.stringify(requestData, null, 2));

    const { orderDetails } = requestData as { orderDetails: OrderDetails };

    // Validate required fields
    if (!orderDetails?.customerEmail) {
      throw new Error('Customer email is required');
    }

    // Prepare the email request
    const emailRequest = {
      personalizations: [{
        to: [{ email: orderDetails.customerEmail }],
        dynamic_template_data: {
          orderId: orderDetails.orderId.slice(0, 8),
          customerName: orderDetails.customerName,
          modelName: orderDetails.modelDetails.name,
          modelSize: orderDetails.modelDetails.size,
          selectedOptions: orderDetails.selectedOptions,
          pricing: orderDetails.pricing,
          supportEmail: 'Jeremy@troosolutions.com',
          supportPhone: '(888) 900-3933',
        },
      }],
      from: {
        email: 'Jeremy@troosolutions.com',
        name: 'Troo Solutions'
      },
      template_id: 'd-5939deae7c884264af655d18357b3d1a',
    };

    console.log('Sending email request:', JSON.stringify(emailRequest, null, 2));

    // Send the email using SendGrid API
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('SendGrid API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText
      });
      throw new Error(`SendGrid API error: ${errorText}`);
    }

    console.log('Email sent successfully');

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error in send-order-confirmation:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        stack: error.stack
      }),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        },
        status: 500,
      },
    );
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-order-confirmation' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
