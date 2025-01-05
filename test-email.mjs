import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const testDesignData = {
  customerEmail: 'reece@troosolutions.com',
  designId: 'test-design-123',
  modelName: 'Summit 308 Model B',
  dimensions: '14x22 (308 sq ft)',
  entryType: 'Side Entry',
  interiorType: 'Shell Only',
  sidingType: 'Lap',
  sidingColor: 'Iron Gray',
  doorColor: 'Factory Primed White',
  trimType: 'Clear Anodized Aluminum',
  fasciaColor: 'Iron Gray',
  soffitType: 'Unfinished',
  addOns: ['None'],
  flooring: 'N/A',
  finishes: 'N/A',
  designPreviewUrl: 'https://example.com/preview.jpg'
};

console.log('Starting email test...');
console.log('Test data:', JSON.stringify(testDesignData, null, 2));

try {
  const { data, error } = await supabase.functions.invoke('send-saved-design', {
    body: { 
      designData: {
        ...testDesignData,
        designUrl: `https://troosolutions.com/design/${testDesignData.designId}`,
        addOns: testDesignData.addOns.join(', '),
        subject: `Your Troo Solutions ${testDesignData.modelName}`
      }
    }
  });

  if (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }

  console.log('✅ Email sent successfully:', data);
  process.exit(0);
} catch (error) {
  console.error('❌ Test failed:', error);
  process.exit(1);
} 