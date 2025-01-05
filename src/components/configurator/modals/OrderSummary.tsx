import React from 'react';
import { formatPrice } from '../../../utils/pricing';

interface OrderSummaryProps {
  productTotal: number;
  shippingCost: number;
  installationType: 'diy' | 'proassembly';
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  productTotal,
  shippingCost,
  installationType,
}) => {
  const installationCost = installationType === 'diy' ? 0 : 54034;
  const total = productTotal + shippingCost + installationCost;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Order Summary</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Your Troo Solutions</span>
          <span>{formatPrice(productTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{formatPrice(shippingCost)}</span>
        </div>
        <div className="flex justify-between">
          <span>{installationType === 'diy' ? 'DIY Installation' : 'ProAssembly'}</span>
          <span>{formatPrice(installationCost)}</span>
        </div>
        <div className="flex justify-between font-medium pt-2 border-t">
          <span>Troo Solutions Order Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};