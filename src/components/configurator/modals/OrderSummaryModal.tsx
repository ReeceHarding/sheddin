import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';
import { sendOrderConfirmationEmail } from '../../../utils/emailService';

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
  configId: string;
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
  configId,
}) => {
  const { user } = useAuth();
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: user?.user_metadata?.first_name ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}` : '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: user?.user_metadata?.zip_code || '',
  });

  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    name: user?.user_metadata?.first_name ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}` : '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: user?.user_metadata?.zip_code || '',
  });

  // Calculate the order total
  const orderTotal = designDetails.totalPrice + 
                    (installationType === 'proassembly' ? installationPrice : 0) + 
                    (includePermitPlans ? permitPlansPrice : 0);

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

  const handleSubmit = async () => {
    console.log('Starting handleSubmit with configId:', configId);
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (!user?.id) {
        throw new Error('Please sign in to place an order');
      }

      console.log('Attempting to create order with:', {
        user_id: user.id,
        design_id: configId,
        shipping_address: shippingAddress,
        total_amount: orderTotal,
        installation_type: installationType,
        permit_plans: includePermitPlans,
        foundation_type: foundationType
      });

      const { data: order, error: insertError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          design_id: configId,
          shipping_address: shippingAddress,
          billing_address: sameAsShipping ? shippingAddress : billingAddress,
          total_amount: orderTotal,
          installation_type: installationType,
          permit_plans: includePermitPlans,
          foundation_type: foundationType,
          status: 'pending'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error inserting order:', insertError);
        throw insertError;
      }

      if (!order) {
        throw new Error('Failed to create order');
      }

      console.log('Order created successfully:', order);
      setOrderId(order.id);

      // Send confirmation email
      try {
        const emailResult = await sendOrderConfirmationEmail({
          orderId: order.id,
          customerName: shippingAddress.name,
          customerEmail: user.email || '',
          modelDetails: {
            name: designDetails.modelName,
            size: `${designDetails.modelSize} (${designDetails.squareFootage} sq ft)`,
          },
          selectedOptions: {
            entry: designDetails.entryType,
            siding: designDetails.sidingType,
            sidingColor: designDetails.siding,
            windows: designDetails.windowStyle,
            interior: designDetails.interiorType,
            exteriorAddons: designDetails.exteriorOptions.map(opt => opt.name),
          },
          pricing: {
            basePrice: designDetails.basePrice,
            totalPrice: orderTotal,
          }
        });
        
        console.log('Email sending result:', emailResult);
        
        if (!emailResult) {
          console.warn('Email failed to send, but order was created successfully');
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }

      setOrderSuccess(true);
    } catch (err) {
      console.error('Error in handleSubmit:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while placing your order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess && orderId) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 w-full max-w-2xl">
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <div className="mb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-medium mb-4">Order Successfully Placed!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We've sent a confirmation email to your inbox.
              </p>
              <p className="text-gray-500 mb-8">
                Order Reference: #{orderId.slice(0, 8)}
              </p>
              <div className="space-y-4">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#B87503] text-white rounded-md hover:bg-[#9A6203]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-medium">Complete Your Order</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Order Summary */}
            <div className="space-y-4 bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium">Order Summary</h3>
              <div className="space-y-3">
                {/* Base Model + Options */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Troo Solutions</span>
                  <span className="font-medium">${designDetails.totalPrice.toLocaleString()}</span>
                </div>

                {/* Installation if selected */}
                {installationType === 'proassembly' && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ProAssembly</span>
                    <span className="font-medium">${installationPrice.toLocaleString()}</span>
                  </div>
                )}

                {/* Permit Plans if selected */}
                {includePermitPlans && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Permit Plans</span>
                    <span className="font-medium">${permitPlansPrice.toLocaleString()}</span>
                  </div>
                )}

                {/* Total */}
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center font-medium">
                    <span>Troo Solutions Order Total</span>
                    <span>${orderTotal.toLocaleString()}</span>
                  </div>
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
                      onChange={(e) => {
                        setShippingAddress({ ...shippingAddress, name: e.target.value });
                        if (sameAsShipping) {
                          setBillingAddress({ ...billingAddress, name: e.target.value });
                        }
                      }}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Address</label>
                    <input
                      type="text"
                      value={shippingAddress.address}
                      onChange={(e) => {
                        setShippingAddress({ ...shippingAddress, address: e.target.value });
                        if (sameAsShipping) {
                          setBillingAddress({ ...billingAddress, address: e.target.value });
                        }
                      }}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Apartment, suite, etc.</label>
                    <input
                      type="text"
                      value={shippingAddress.apartment}
                      onChange={(e) => {
                        setShippingAddress({ ...shippingAddress, apartment: e.target.value });
                        if (sameAsShipping) {
                          setBillingAddress({ ...billingAddress, apartment: e.target.value });
                        }
                      }}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">City</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => {
                          setShippingAddress({ ...shippingAddress, city: e.target.value });
                          if (sameAsShipping) {
                            setBillingAddress({ ...billingAddress, city: e.target.value });
                          }
                        }}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">State / Province</label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) => {
                          setShippingAddress({ ...shippingAddress, state: e.target.value });
                          if (sameAsShipping) {
                            setBillingAddress({ ...billingAddress, state: e.target.value });
                          }
                        }}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Postal code</label>
                      <input
                        type="text"
                        value={shippingAddress.postalCode}
                        onChange={(e) => {
                          setShippingAddress({ ...shippingAddress, postalCode: e.target.value });
                          if (sameAsShipping) {
                            setBillingAddress({ ...billingAddress, postalCode: e.target.value });
                          }
                        }}
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
                        onChange={(e) => {
                          setBillingAddress({ ...billingAddress, name: e.target.value });
                        }}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Address</label>
                      <input
                        type="text"
                        value={billingAddress.address}
                        onChange={(e) => {
                          setBillingAddress({ ...billingAddress, address: e.target.value });
                        }}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Apartment, suite, etc.</label>
                      <input
                        type="text"
                        value={billingAddress.apartment}
                        onChange={(e) => {
                          setBillingAddress({ ...billingAddress, apartment: e.target.value });
                        }}
                        className="w-full border rounded-md p-2"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">City</label>
                        <input
                          type="text"
                          value={billingAddress.city}
                          onChange={(e) => {
                            setBillingAddress({ ...billingAddress, city: e.target.value });
                          }}
                          className="w-full border rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">State / Province</label>
                        <input
                          type="text"
                          value={billingAddress.state}
                          onChange={(e) => {
                            setBillingAddress({ ...billingAddress, state: e.target.value });
                          }}
                          className="w-full border rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Postal code</label>
                        <input
                          type="text"
                          value={billingAddress.postalCode}
                          onChange={(e) => {
                            setBillingAddress({ ...billingAddress, postalCode: e.target.value });
                          }}
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
        </div>
      </div>
    </div>
  );
}; 