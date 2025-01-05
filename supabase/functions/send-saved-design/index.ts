// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { corsHeaders } from '../_shared/cors.ts';

const SENDGRID_API_KEY = Deno.env.get('SENDGRID_API_KEY') || '';
const TEMPLATE_ID = 'd-fa738dd2b29e44249b5819c8a76e9592';

interface SavedDesignData {
  customerEmail: string;
  designId: string;
  modelName: string;
  dimensions: string;
  entryType: string;
  interiorType: string;
  flooring: string;
  finishes: string;
  sidingType: string;
  sidingColor: string;
  doorColor: string;
  trimType: string;
  fasciaColor: string;
  soffitType: string;
  addOns: string;
  designPreviewUrl: string;
  designUrl: string;
  subject: string;
}

interface EmailPersonalization {
  to: { email: string }[];
  dynamic_template_data: {
    designId: string;
    modelName: string;
    dimensions: string;
    entryType: string;
    interiorType: string;
    flooring: string;
    finishes: string;
    sidingType: string;
    sidingColor: string;
    doorColor: string;
    trimType: string;
    fasciaColor: string;
    soffitType: string;
    addOns: string;
    designPreviewUrl: string;
    designUrl: string;
  };
  subject?: string;
}

interface EmailData {
  personalizations: EmailPersonalization[];
  from: {
    email: string;
    name: string;
  };
  template_id: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { designData } = await req.json() as { designData: SavedDesignData };

    // Ensure all required fields are present
    const requiredFields = [
      'customerEmail',
      'modelName',
      'dimensions',
      'entryType',
      'interiorType',
      'sidingType',
      'sidingColor',
      'doorColor',
      'trimType',
      'fasciaColor',
      'soffitType'
    ];

    for (const field of requiredFields) {
      if (!designData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Prepare email data
    const emailData: EmailData = {
      personalizations: [{
        to: [{ email: designData.customerEmail }],
        dynamic_template_data: {
          designId: designData.designId,
          modelName: designData.modelName,
          dimensions: designData.dimensions,
          entryType: designData.entryType,
          interiorType: designData.interiorType,
          flooring: designData.flooring || 'N/A',
          finishes: designData.finishes || 'N/A',
          sidingType: designData.sidingType,
          sidingColor: designData.sidingColor,
          doorColor: designData.doorColor,
          trimType: designData.trimType,
          fasciaColor: designData.fasciaColor,
          soffitType: designData.soffitType,
          addOns: designData.addOns || 'None',
          designPreviewUrl: designData.designPreviewUrl,
          designUrl: designData.designUrl
        },
        subject: designData.subject
      }],
      from: {
        email: 'support@troosolutions.com',
        name: 'Troo Solutions'
      },
      template_id: TEMPLATE_ID,
    };

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SendGrid API error: ${response.statusText} - ${errorText}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error sending saved design email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 400,
      },
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-saved-design' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
