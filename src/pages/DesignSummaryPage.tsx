import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDesignDetails } from '../hooks/useDesignDetails';
import { Link, useParams } from 'react-router-dom';
import { ProAssemblyModal } from '../components/configurator/modals/ProAssemblyModal';
import { ChevronDown } from 'lucide-react';
import { PermitPlansModal } from '../components/configurator/modals/PermitPlansModal';
import { FoundationTypeModal } from '../components/configurator/modals/FoundationTypeModal';
import { OrderSummaryModal } from '../components/configurator/modals/OrderSummaryModal';
import { calculateEstimatedTotal } from '../utils/pricing';

export const DesignSummaryPage: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams(); // userId
  const { designDetails, loading, error } = useDesignDetails(id || '');
  const [isProAssemblyModalOpen, setIsProAssemblyModalOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [installationType, setInstallationType] = useState<'diy' | 'proassembly'>('diy');
  const [installationPrice, setInstallationPrice] = useState(0);
  const [isPermitPlansModalOpen, setIsPermitPlansModalOpen] = useState(false);
  const [includePermitPlans, setIncludePermitPlans] = useState(false);
  const [isFoundationTypeModalOpen, setIsFoundationTypeModalOpen] = useState(false);
  const [foundationType, setFoundationType] = useState<'concrete' | 'wood' | 'tbd' | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!designDetails) {
    return <div className="min-h-screen bg-white flex items-center justify-center">No design found</div>;
  }

  const config = designDetails.options || {};
  const baseTotal = designDetails.totalPrice || 0; // from DB
  // We add in permit, pro assembly, etc
  let finalTotal = baseTotal;
  if (includePermitPlans) {
    finalTotal += 5995;
  }
  if (installationType === 'proassembly') {
    finalTotal += 54034;
  }

  const handleInstallationSelect = (type: 'diy' | 'proassembly', price: number) => {
    setInstallationType(type);
    setInstallationPrice(price);
    setIsProAssemblyModalOpen(false);
  };
  const handlePermitPlansSelect = (include: boolean) => {
    setIncludePermitPlans(include);
    setIsPermitPlansModalOpen(false);
  };
  const handleFoundationTypeSelect = (type: 'concrete' | 'wood' | 'tbd') => {
    setFoundationType(type);
    setIsFoundationTypeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-medium">
              Your Design Summary
            </h1>
            <p className="text-gray-600">
              {user?.user_metadata?.first_name} {user?.user_metadata?.last_name} - {user?.email}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Base Design Price (from DB user_configs)</p>
              </div>
              <div className="text-xl font-medium">
                ${baseTotal.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Assembly */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 flex justify-between items-center">
            <div>
              <p className="text-gray-600">Assembly</p>
              <button
                onClick={() => setIsProAssemblyModalOpen(true)}
                className="text-[#B87503] hover:text-[#9A6203]"
              >
                {installationType === 'diy' ? 'Select ProAssembly →' : 'ProAssembly Selected'}
              </button>
            </div>
            <div className="text-xl font-medium">
              {installationType === 'proassembly' ? `+$${54034}` : 'DIY'}
            </div>
          </div>

          {/* Permit Plans */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 flex justify-between items-center">
            <div>
              <p className="text-gray-600">Permit Plans</p>
              <button
                onClick={() => setIsPermitPlansModalOpen(true)}
                className="text-[#B87503] hover:text-[#9A6203]"
              >
                {includePermitPlans ? 'Included' : 'Add Permit Plans →'}
              </button>
            </div>
            <div className="text-xl font-medium">
              {includePermitPlans ? '+$5995' : '-'}
            </div>
          </div>

          {/* Foundation */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6 flex justify-between items-center">
            <div>
              <p className="text-gray-600">Foundation Type</p>
              <button
                onClick={() => setIsFoundationTypeModalOpen(true)}
                className="text-[#B87503] hover:text-[#9A6203]"
              >
                {foundationType ? `${foundationType} Selected` : 'Select Foundation →'}
              </button>
            </div>
            <div className="text-xl font-medium">
              {foundationType ? foundationType : '-'}
            </div>
          </div>

          {/* Final total */}
          <div className="bg-white border rounded-lg p-6 flex justify-between items-start">
            <div>
              <p className="text-2xl font-medium">Estimated Total</p>
              <p className="text-gray-600 text-sm">Includes product, delivery, assembly, & permit if selected. Foundation not included in total (local contractor). </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold mb-1">${finalTotal.toLocaleString()}</p>
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="text-[#B87503] hover:text-[#9A6203]"
              >
                Start your order →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isProAssemblyModalOpen && (
        <ProAssemblyModal
          onClose={() => setIsProAssemblyModalOpen(false)}
          onSelect={handleInstallationSelect}
        />
      )}
      {isPermitPlansModalOpen && (
        <PermitPlansModal
          onClose={() => setIsPermitPlansModalOpen(false)}
          onSelect={handlePermitPlansSelect}
        />
      )}
      {isFoundationTypeModalOpen && (
        <FoundationTypeModal
          onClose={() => setIsFoundationTypeModalOpen(false)}
          onSelect={handleFoundationTypeSelect}
        />
      )}
      {isOrderModalOpen && (
        <OrderSummaryModal
          onClose={() => setIsOrderModalOpen(false)}
          designDetails={{
            modelName: 'Example Model Name',
            modelSize: '14x22',
            squareFootage: 308,
            modelVariant: 'Model A',
            modelDescription: 'Front Entry / More Glass'
          }}
          installationType={installationType}
          installationPrice={installationPrice}
          includePermitPlans={includePermitPlans}
          permitPlansPrice={includePermitPlans ? 5995 : 0}
          foundationType={foundationType}
          totalPrice={finalTotal}
        />
      )}
    </div>
  );
};