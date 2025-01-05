import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface SavedDesignEmailData {
  customerEmail: string;
  designId: string;
  modelName: string;
  dimensions: string;
  entryType: string;
  interiorType: string;
  flooring?: string;
  finishes?: string;
  sidingType: string;
  sidingColor: string;
  doorColor: string;
  trimType: string;
  fasciaColor: string;
  soffitType: string;
  addOns: string[];
  designPreviewUrl?: string;
}

export const sendOrderConfirmationEmail = async (orderData: any) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-order-confirmation', {
      body: { orderData }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

export const sendSavedDesignEmail = async (designData: SavedDesignEmailData) => {
  try {
    // Validate required fields
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
    ] as const;

    for (const field of requiredFields) {
      if (!designData[field as keyof SavedDesignEmailData]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Generate the design URL that will be included in the email
    const designUrl = `${window.location.origin}/design/${designData.designId}`;
    
    // Generate the subject line based on the model name
    const subject = `Your Troo Solutions ${designData.modelName}`;
    
    const { data, error } = await supabase.functions.invoke('send-saved-design', {
      body: { 
        designData: {
          ...designData,
          designUrl,
          flooring: designData.flooring || 'N/A',
          finishes: designData.finishes || 'N/A',
          addOns: designData.addOns.length > 0 ? designData.addOns.join(', ') : 'None',
          designPreviewUrl: designData.designPreviewUrl || '',
          subject // Include the generated subject
        }
      }
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error sending saved design email:', error);
    throw error;
  }
}; 