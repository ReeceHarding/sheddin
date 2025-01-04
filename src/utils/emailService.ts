import { supabase } from '../lib/supabase';

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
    basePrice: number;
    totalPrice: number;
  };
}

export async function sendOrderConfirmationEmail(orderDetails: OrderDetails): Promise<boolean> {
  try {
    console.log('Sending order confirmation email via Supabase Edge Function...');
    
    const { data, error } = await supabase.functions.invoke('send-order-confirmation', {
      body: { orderDetails }
    });

    if (error) {
      console.error('Error calling email function:', error);
      return false;
    }

    console.log('Email function response:', data);
    return data?.success || false;
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    return false;
  }
} 