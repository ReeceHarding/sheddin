import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDesignDetails } from '../hooks/useDesignDetails';
import { Link, useParams } from 'react-router-dom';
import { ProAssemblyModal } from '../components/configurator/modals/ProAssemblyModal';
import { ChevronDown } from 'lucide-react';
import { PermitPlansModal } from '../components/configurator/modals/PermitPlansModal';
import { FoundationTypeModal } from '../components/configurator/modals/FoundationTypeModal';
import { OrderSummaryModal } from '../components/configurator/modals/OrderSummaryModal';

export const DesignSummaryPage: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams();
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

  const permitPlansPrice = includePermitPlans ? 5995 : 0;
  const totalPrice = (designDetails?.totalPrice || 0) + installationPrice + permitPlansPrice;

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

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!designDetails) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Design not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Images */}
            <div className="space-y-8">
              {/* 3D Model */}
              <div>
                <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/summit308/final/summit308Final.jpg"
                    alt={designDetails.modelName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floor Plan */}
              <div>
                <div className="w-full bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/summit308/final/floorPlan.jpg"
                    alt="Floor Plan"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Interior Design Previews */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/summit308/final/interiorDesignKitchen.png"
                    alt="Kitchen Design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/summit308/final/interiorDesignBathroom.png"
                    alt="Bathroom Design"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Design Info and Details */}
            <div>
              {/* User Info */}
              <div className="mb-6 text-sm">
                <p className="text-gray-600">{user?.user_metadata?.first_name} {user?.user_metadata?.last_name}</p>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-gray-600">{user?.user_metadata?.zip_code}</p>
              </div>

              {/* Design Info */}
              <div className="mb-8">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h1 className="text-2xl font-medium">{designDetails.modelName} {designDetails.modelSize}</h1>
                    <Link 
                      to={`/design/summit/308`}
                      className="bg-[#B87503] hover:bg-[#9A6203] text-white px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      Edit Design
                    </Link>
                  </div>
                  <p className="text-gray-600">Studio · 1 Bath</p>
                  <p className="text-gray-600">{designDetails.interiorType}</p>
                  <p className="text-gray-600">({designDetails.modelVariant}) {designDetails.entryType} / {designDetails.windowStyle}</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <button 
                      onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                      className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded flex items-center gap-1"
                    >
                      <span className="text-gray-600">Design Details</span>
                      <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isDetailsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <p className="text-gray-500 text-sm">{id?.slice(0, 8)}</p>
                    <p className="text-gray-500 text-sm">January 2, 2025</p>
                  </div>
                </div>
              </div>

              {/* Design Details Expandable Section */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDetailsOpen ? 'max-h-[1000px] mb-8' : 'max-h-0'}`}>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Your Troo Solutions</h3>
                  <div className="space-y-3">
                    {/* Base Price */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Base Price (Summit 308)</span>
                      <span className="font-medium">${designDetails.basePrice.toLocaleString()}</span>
                    </div>

                    {/* Entry */}
                    {designDetails.entryPrice > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Entry: {designDetails.entryType}</span>
                        <span className="font-medium">${designDetails.entryPrice.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Windows */}
                    {designDetails.windowStylePrice > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Windows: {designDetails.windowStyle}</span>
                        <span className="font-medium">${designDetails.windowStylePrice.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Interior */}
                    {designDetails.interiorPrice > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Interior: {designDetails.interiorType}</span>
                        <span className="font-medium">${designDetails.interiorPrice.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Siding */}
                    {designDetails.sidingPrice > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Siding: {designDetails.siding}</span>
                        <span className="font-medium">${designDetails.sidingPrice.toLocaleString()}</span>
                      </div>
                    )}

                    {/* Exterior Options */}
                    {designDetails.exteriorOptions.map((option, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{option.name}</span>
                        <span className="font-medium">${option.price.toLocaleString()}</span>
                      </div>
                    ))}

                    {/* Roof Options */}
                    {designDetails.roofOptions.map((option, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{option.name}</span>
                        <span className="font-medium">${option.price.toLocaleString()}</span>
                      </div>
                    ))}

                    {/* Total */}
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center font-medium">
                        <span>Design Total</span>
                        <span>${designDetails.totalPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assembly Info */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Assembly</p>
                    <button 
                      onClick={() => setIsProAssemblyModalOpen(true)}
                      className="text-[#B87503] hover:text-[#9A6203]"
                    >
                      {installationType === 'diy' ? 'ProAssembly: Shell Only →' : 'ProAssembly Selected'}
                    </button>
                  </div>
                  <div className="text-right">
                    {installationType === 'proassembly' ? (
                      <>
                        <p className="font-medium">${installationPrice.toLocaleString()}</p>
                      </>
                    ) : (
                      <p className="font-medium">DIY</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Permit Plans */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Permit Plans</p>
                    <button 
                      onClick={() => setIsPermitPlansModalOpen(true)}
                      className="text-[#B87503] hover:text-[#9A6203]"
                    >
                      {includePermitPlans ? 'Permit Plans Selected' : 'Include Permit Plans →'}
                    </button>
                  </div>
                  <div className="text-right">
                    {includePermitPlans ? (
                      <p className="font-medium">${permitPlansPrice.toLocaleString()}</p>
                    ) : (
                      <p className="font-medium">-</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Foundation Type */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Foundation Type</p>
                    <button 
                      onClick={() => setIsFoundationTypeModalOpen(true)}
                      className="text-[#B87503] hover:text-[#9A6203]"
                    >
                      {foundationType ? `${foundationType === 'concrete' ? 'Concrete Slab' : 'Wood Frame Floor'} Selected` : 'Select Foundation Type →'}
                    </button>
                  </div>
                  <div className="text-right">
                    {foundationType ? (
                      <>
                        <p className="font-medium">-</p>
                      </>
                    ) : (
                      <p className="font-medium">-</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Site Work Info */}
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Site work and permitting</p>
                  <p className="font-medium">Cost not included</p>
                </div>
              </div>

              {/* Total */}
              <div className="mb-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xl font-medium">Estimated Total</p>
                    <p className="text-gray-600">Includes product, delivery, assembly, and permit plans.</p>
                    <p className="text-[#B87503] hover:text-[#9A6203] cursor-pointer underline">Learn more about typical project costs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-medium mb-1">${totalPrice.toLocaleString()}</p>
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
          </div>

          {/* Financing Section */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-medium mb-4">Financing Available</h2>
              <p className="text-gray-600 mb-6">
                Get pre-qualified for financing options with no impact to your credit score.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-[#B87503] hover:bg-[#9A6203] text-white px-6 py-3 rounded-md">
                  Check Your Rate
                </button>
                <Link
                  to="/consultation"
                  className="flex items-center gap-3 bg-white border border-[#B87503] hover:border-[#9A6203] text-[#B87503] hover:text-[#9A6203] px-6 py-3 rounded-md"
                >
                  <img 
                    src="/summit308/final/miniCalendar.png" 
                    alt="Calendar" 
                    className="w-5 h-5"
                  />
                  <span>Schedule Consultation</span>
                </Link>
              </div>
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
          designDetails={designDetails}
          installationType={installationType}
          installationPrice={installationPrice}
          includePermitPlans={includePermitPlans}
          permitPlansPrice={permitPlansPrice}
          foundationType={foundationType}
          totalPrice={totalPrice}
          configId={id || ''}
        />
      )}
    </div>
  );
}; 