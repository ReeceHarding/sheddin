import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';

interface ShippingAddress {
  name: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
}

interface OrderDetails {
  modelName: string;
  modelSize: string;
  squareFootage: number;
  modelVariant: 'Model A' | 'Model B';
  modelDescription: string;
  // entry, interior, siding, sidingColor, etc
  // using "any" for brevity
  // ...
}

interface OrderSummaryModalProps {
  onClose: () => void;
  designDetails: OrderDetails;
  installationType: 'diy' | 'proassembly';
  installationPrice: number;
  includePermitPlans: boolean;
  permitPlansPrice: number;
  foundationType: string | null;
  totalPrice: number;
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  onClose,
  designDetails,
  installationType,
  installationPrice,
  includePermitPlans,
  permitPlansPrice,
  foundationType,
  totalPrice
}) => {
  const { user } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [billingAddress, setBillingAddress] = useState<ShippingAddress>({
    name: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [sameAsShipping, setSameAsShipping] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!user) {
        throw new Error('You must be signed in to place an order');
      }

      // Insert new row into "orders" table
      const orderPayload = {
        user_id: user.id,
        // design_id: ??? we could store config id or design_id in user_configs
        shipping_address: shippingAddress,
        billing_address: sameAsShipping ? shippingAddress : billingAddress,
        total_amount: totalPrice,
        installation_type: installationType,
        permit_plans: includePermitPlans,
        foundation_type: foundationType || '',
        status: 'pending'
      };

      const { data, error: orderError } = await supabase
        .from('orders')
        .insert([orderPayload])
        .select()
        .single();

      if (orderError) {
        throw new Error(orderError.message);
      }

      const orderId = data.id;

      // Call the Edge Function to send the order confirmation email
      await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          orderId,
          userEmail: user.email,
          userName: `${user.user_metadata?.first_name || ''} ${user.user_metadata?.last_name || ''}`,
          totalPrice,
          installationType,
          permitPlans: includePermitPlans,
          foundationType
        })
      });

      onClose();
      // Could redirect to a "thank you" or "order placed" page
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShippingChange = (field: keyof ShippingAddress, val: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: val }));
    if (sameAsShipping) {
      setBillingAddress(prev => ({ ...prev, [field]: val }));
    }
  };

  const handleBillingChange = (field: keyof ShippingAddress, val: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: val }));
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl w-full bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <Dialog.Title className="text-xl font-medium">
              Order Summary
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Your Studio Shed</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>

              {/* shipping */}
              <div>
                <h3 className="font-medium">Shipping address</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={shippingAddress.name}
                    onChange={(e) => handleShippingChange('name', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={shippingAddress.address}
                    onChange={(e) => handleShippingChange('address', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Apt, etc."
                    value={shippingAddress.apartment}
                    onChange={(e) => handleShippingChange('apartment', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) => handleShippingChange('city', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={(e) => handleShippingChange('state', e.target.value)}
                    className="border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={shippingAddress.postalCode}
                    onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>

                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => setSameAsShipping(e.target.checked)}
                    />
                    <span className="text-sm text-gray-600">Same as shipping info</span>
                  </label>
                </div>
              </div>

              {/* billing if not same as shipping */}
              {!sameAsShipping && (
                <div>
                  <h3 className="font-medium">Billing address</h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={billingAddress.name}
                      onChange={(e) => handleBillingChange('name', e.target.value)}
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={billingAddress.address}
                      onChange={(e) => handleBillingChange('address', e.target.value)}
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Apt, etc."
                      value={billingAddress.apartment}
                      onChange={(e) => handleBillingChange('apartment', e.target.value)}
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={billingAddress.city}
                      onChange={(e) => handleBillingChange('city', e.target.value)}
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={billingAddress.state}
                      onChange={(e) => handleBillingChange('state', e.target.value)}
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={billingAddress.postalCode}
                      onChange={(e) => handleBillingChange('postalCode', e.target.value)}
                      className="border p-2 rounded"
                    />
                  </div>
                </div>
              )}

              {/* terms */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  Check here to confirm that you understand and agree to the Terms and Conditions.
                </label>
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={!termsAccepted || isSubmitting}
                className="w-full py-3 rounded-md text-white bg-[#B87503] hover:bg-[#9A6203] disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Placing Order...' : 'PLACE ORDER'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};