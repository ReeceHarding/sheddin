import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';

interface DesignDetails {
  // Basic Model Info
  modelName: string;
  modelSize: string;
  squareFootage: number;
  modelVariant: 'Model A' | 'Model B';
  modelDescription: string;

  // Entry and Layout
  entryType: 'Front Entry' | 'Side Entry';
  entryPrice: number;
  windowStyle: 'More Glass' | 'More Privacy';
  windowStylePrice: number;
  isFloorPlanMirrored: boolean;

  // Interior Configuration
  interiorType: 'Fully Equipped' | 'Shell Only';
  interiorPrice: number;

  // Interior Finishes (if Fully Equipped)
  interiorFinishes?: {
    cabinets: string;  // e.g., 'White Shaker', 'Grey Shaker', etc.
    countertops: string;
    mainFlooring: string;
    bathFlooring: string;
    fixtures: string[];
  };

  // Exterior Finishes
  siding: string;
  sidingType: 'Lap Siding' | 'Plank Siding' | 'Cedar Plank' | 'Block Siding';
  sidingPrice: number;
  door: string;
  doorPrice: number;
  trim: string;
  trimPrice: number;
  fascia: string;
  fasciaPrice: number;
  soffit: string;
  soffitPrice: number;

  // Additional Options
  exteriorOptions: {
    name: string;
    price: number;
  }[];
  roofOptions: {
    name: string;
    price: number;
  }[];
  windowOptions: {
    name: string;
    price: number;
  }[];

  // Prices
  basePrice: number;
  totalPrice: number;
}

interface OrderSummaryModalProps {
  onClose: () => void;
  designDetails: DesignDetails;
  installationType: 'diy' | 'proassembly';
  installationPrice: number;
  includePermitPlans: boolean;
  permitPlansPrice: number;
  foundationType: 'concrete' | 'wood' | 'tbd' | null;
  totalPrice: number;
}

interface ShippingAddress {
  name: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
}

interface BillingAddress extends ShippingAddress {}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  onClose,
  designDetails,
  installationType,
  installationPrice,
  includePermitPlans,
  permitPlansPrice,
  foundationType,
  totalPrice,
}) => {
  const { user } = useAuth();
  const [sameAsShipping, setSameAsShipping] = useState(false);
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

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    name: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const total = designDetails.basePrice + installationPrice + permitPlansPrice + (includePermitPlans ? 5995 : 0);

  const handleShippingChange = (field: keyof ShippingAddress) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress(prev => ({ ...prev, [field]: e.target.value }));
    if (sameAsShipping) {
      setBillingAddress(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleBillingChange = (field: keyof BillingAddress) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingAddress(prev => ({ ...prev, [field]: e.target.value }));
  };

  const validateForm = () => {
    if (!shippingAddress.name) return 'Please enter a shipping name';
    if (!shippingAddress.address) return 'Please enter a shipping address';
    if (!shippingAddress.city) return 'Please enter a shipping city';
    if (!shippingAddress.state) return 'Please enter a shipping state';
    if (!shippingAddress.postalCode) return 'Please enter a shipping postal code';

    if (!sameAsShipping) {
      if (!billingAddress.name) return 'Please enter a billing name';
      if (!billingAddress.address) return 'Please enter a billing address';
      if (!billingAddress.city) return 'Please enter a billing city';
      if (!billingAddress.state) return 'Please enter a billing state';
      if (!billingAddress.postalCode) return 'Please enter a billing postal code';
    }

    if (!termsAccepted) return 'Please accept the terms and conditions';
    if (!user) return 'Please sign in to place an order';

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (!user) {
        throw new Error('You must be signed in to place an order');
      }

      console.log('Submitting order with details:', {
        designDetails,
        installationType,
        installationPrice,
        permitPlansPrice,
        includePermitPlans,
        foundationType
      });

      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            // Basic Model Info
            model_name: designDetails.modelName,
            model_size: designDetails.modelSize,
            square_footage: designDetails.squareFootage,
            model_variant: designDetails.modelVariant,
            model_description: designDetails.modelDescription,

            // Entry and Layout
            entry_type: designDetails.entryType,
            entry_price: designDetails.entryPrice,
            window_style: designDetails.windowStyle,
            window_style_price: designDetails.windowStylePrice,
            is_floor_plan_mirrored: designDetails.isFloorPlanMirrored,

            // Interior Configuration
            interior_type: designDetails.interiorType,
            interior_price: designDetails.interiorPrice,

            // Interior Finishes
            interior_finishes: designDetails.interiorFinishes,

            // Exterior Finishes
            siding: designDetails.siding,
            siding_type: designDetails.sidingType,
            siding_price: designDetails.sidingPrice,
            door: designDetails.door,
            door_price: designDetails.doorPrice,
            trim: designDetails.trim,
            trim_price: designDetails.trimPrice,
            fascia: designDetails.fascia,
            fascia_price: designDetails.fasciaPrice,
            soffit: designDetails.soffit,
            soffit_price: designDetails.soffitPrice,

            // Additional Options
            exterior_options: designDetails.exteriorOptions,
            roof_options: designDetails.roofOptions,
            window_options: designDetails.windowOptions,

            // Installation and Shipping
            installation_type: installationType,
            installation_price: installationPrice,
            permit_plans_price: permitPlansPrice || 0,

            // Permit Plans and Foundation
            include_permit_plans: includePermitPlans,
            foundation_type: foundationType,

            // Prices
            base_price: designDetails.basePrice,
            total_price: totalPrice,

            // Status
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (error) {
        console.error('Error submitting order:', error);
        throw new Error(error.message);
      }

      console.log('Order submitted successfully:', data);
      onClose();
      // You might want to redirect to an order confirmation page here
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while placing your order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="relative z-50"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container */}
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
          <div className="p-6">
            {/* Order Summary */}
            <div className="mb-8">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Your Studio Shed</span>
                  <span>${designDetails.basePrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${permitPlansPrice.toLocaleString()}</span>
                </div>
                {installationType === 'proassembly' && (
                  <div className="flex justify-between">
                    <span>ProAssembly: Shell Only</span>
                    <span>${installationPrice.toLocaleString()}</span>
                  </div>
                )}
                {includePermitPlans && (
                  <div className="flex justify-between">
                    <span>Permit Plans</span>
                    <span>$5,995</span>
                  </div>
                )}
                <div className="flex justify-between font-medium pt-4 border-t">
                  <span>Studio Shed Order Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Start Your Order Section */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <span className="text-green-500 text-4xl">🔒</span>
              </div>
              <h2 className="text-xl font-medium text-center mb-6">Start Your Order</h2>
              <div className="space-y-4 text-gray-600 mb-8">
                <div className="flex gap-3">
                  <span className="text-green-500">✓</span>
                  <p>Whether paying out-of-pocket or with financing, you will be charged a deposit amount (10% of the total estimate or a minimum of $10,000) to start your order.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500">✓</span>
                  <p>Within one day of placing order, please expect an invoice with payment link to start the order. Payment may be made by credit card or ACH transfer. Questions? (888) 900-3933.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-green-500">✓</span>
                  <p>The invoice remainder including applicable sales tax will be billed per our payment terms. Please expect the invoice soon to start your project!</p>
                </div>
              </div>

              {/* Shipping Form */}
              <div className="space-y-6">
                <h3 className="font-medium">Shipping address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Name</label>
                    <input
                      type="text"
                      value={shippingAddress.name}
                      onChange={handleShippingChange('name')}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Address</label>
                    <input
                      type="text"
                      value={shippingAddress.address}
                      onChange={handleShippingChange('address')}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Apartment, suite, etc.</label>
                    <input
                      type="text"
                      value={shippingAddress.apartment}
                      onChange={handleShippingChange('apartment')}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">City</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={handleShippingChange('city')}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">State / Province</label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={handleShippingChange('state')}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Postal code</label>
                      <input
                        type="text"
                        value={shippingAddress.postalCode}
                        onChange={handleShippingChange('postalCode')}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>

                {/* Billing Information */}
                <div>
                  <h3 className="font-medium mb-4">Billing information</h3>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={sameAsShipping}
                      onChange={(e) => {
                        setSameAsShipping(e.target.checked);
                        if (e.target.checked) {
                          setBillingAddress(shippingAddress);
                        }
                      }}
                      className="rounded border-gray-300 text-[#B87503] focus:ring-[#B87503]"
                    />
                    Same as shipping information
                  </label>
                </div>

                {!sameAsShipping && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Name</label>
                      <input
                        type="text"
                        value={billingAddress.name}
                        onChange={handleBillingChange('name')}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Address</label>
                      <input
                        type="text"
                        value={billingAddress.address}
                        onChange={handleBillingChange('address')}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Apartment, suite, etc.</label>
                      <input
                        type="text"
                        value={billingAddress.apartment}
                        onChange={handleBillingChange('apartment')}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">City</label>
                        <input
                          type="text"
                          value={billingAddress.city}
                          onChange={handleBillingChange('city')}
                          className="w-full border rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">State / Province</label>
                        <input
                          type="text"
                          value={billingAddress.state}
                          onChange={handleBillingChange('state')}
                          className="w-full border rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Postal code</label>
                        <input
                          type="text"
                          value={billingAddress.postalCode}
                          onChange={handleBillingChange('postalCode')}
                          className="w-full border rounded-md p-2"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div>
                  <label className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 rounded border-gray-300 text-[#B87503] focus:ring-[#B87503]"
                    />
                    <span>
                      Check here to confirm that you understand and agree to the{' '}
                      <Link to="/terms" className="underline">Terms and Conditions</Link>.
                      Cancelled orders subject to a fee.
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}

                {/* Place Order Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!termsAccepted || isSubmitting}
                  className={`w-full py-3 rounded-md text-white ${
                    termsAccepted && !isSubmitting ? 'bg-[#B87503] hover:bg-[#9A6203]' : 'bg-gray-300'
                  } transition-colors`}
                >
                  {isSubmitting ? 'Placing Order...' : 'PLACE ORDER'}
                </button>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 