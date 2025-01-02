import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { OrderSummary } from './OrderSummary';
import { ShippingForm } from './ShippingForm';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    productTotal: number;
    shippingCost: number;
    installationType: 'diy' | 'proassembly';
  };
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    sameAsBilling: true
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', { orderDetails, shippingInfo });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg w-full max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-medium">Start Your Order</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Order Summary */}
            <OrderSummary {...orderDetails} />

            {/* Start Order Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Lock className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-medium">Start Your Order</h3>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Whether paying out-of-pocket or with financing, you will be charged a deposit amount (10% of the total estimate or a minimum of $10,000) to start your order.</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Within one day of placing order, please expect an invoice with payment link to start the order. Payment may be made by credit card or ACH transfer. Questions? (888) 900-3933.</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>The invoice remainder including applicable sales tax will be billed per our payment terms. Please expect the invoice soon to start your project!</span>
                </p>
              </div>
            </div>

            {/* Shipping Form */}
            <ShippingForm
              shippingInfo={shippingInfo}
              onChange={setShippingInfo}
            />

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Check here to confirm that you understand and agree to the{' '}
                <a href="#" className="text-primary hover:text-primary-hover underline">
                  Terms and Conditions
                </a>
                . Cancelled orders subject to a fee.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!acceptedTerms}
              className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              PLACE ORDER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};