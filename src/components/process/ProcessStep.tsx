import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProcessStepProps {
  id: string;
  preTitle?: string;
  preSubtitle?: string;
  title: string;
  duration: string;
  description: string;
  image: string;
  studioShedDeliverables: string[];
  contractorDeliverables: {
    items: string[];
    subitems?: { title: string; items: string[] }[];
  };
  customerDeliverables: string[];
  index: number;
}

const CheckIcon = () => (
  <svg 
    className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" 
    fill="currentColor" 
    viewBox="0 0 20 20"
  >
    <path 
      fillRule="evenodd" 
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
      clipRule="evenodd" 
    />
  </svg>
);

export const ProcessStep: React.FC<ProcessStepProps> = ({
  id,
  preTitle,
  preSubtitle,
  title,
  duration,
  description,
  image,
  studioShedDeliverables,
  contractorDeliverables,
  customerDeliverables,
  index
}) => {
  const [expandedSections, setExpandedSections] = useState<{
    studio: boolean;
    contractor: boolean;
    customer: boolean;
  }>({
    studio: false,
    contractor: false,
    customer: false
  });

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const { scrollYProgress } = useScroll({
    target: ref as any,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const toggleSection = (section: 'studio' | 'contractor' | 'customer') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get accent color based on section ID
  const getAccentColor = () => {
    switch (id) {
      case 'permitting':
        return 'bg-[#006D77]';
      case 'production':
        return 'bg-[#00A5E5]';
      case 'installation':
        return 'bg-[#6B46C1]';
      default:
        return 'bg-[#76B82A]';
    }
  };

  // Get border color for deliverables sections
  const getBorderColor = () => {
    switch (id) {
      case 'permitting':
        return 'border-[#006D77]';
      case 'production':
        return 'border-[#00A5E5]';
      case 'installation':
        return 'border-[#6B46C1]';
      default:
        return 'border-gray-200';
    }
  };

  const renderStudioShedDeliverables = () => {
    if (studioShedDeliverables.length <= 6) {
      return (
        <ul className="space-y-2">
          {studioShedDeliverables.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon />
              <span className="text-[15px] text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      );
    }

    const midPoint = Math.ceil(studioShedDeliverables.length / 2);
    const leftColumn = studioShedDeliverables.slice(0, midPoint);
    const rightColumn = studioShedDeliverables.slice(midPoint);

    return (
      <div className="grid grid-cols-2 gap-6">
        <ul className="space-y-2">
          {leftColumn.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon />
              <span className="text-[15px] text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {rightColumn.map((item, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon />
              <span className="text-[15px] text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Determine if image should be on the left or right
  const imageOnLeft = index % 2 === 0;

  return (
    <div id={id} className="relative py-12 first:pt-16 last:pb-16 scroll-mt-[120px]">
      {/* Pre-title and initial content */}
      {preTitle && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-6">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center space-x-2.5 bg-white/90 rounded-full px-4 py-2 text-sm shadow-sm border border-gray-100">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <span className="font-medium">{preTitle}</span>
            </div>
            {preSubtitle && (
              <span className="text-sm text-gray-500 ml-4 mt-2 font-medium">{preSubtitle}</span>
            )}
          </div>
        </div>
      )}

      {/* Main content section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-start ${imageOnLeft ? '' : 'md:grid-flow-col-dense'}`}>
            {/* Content column */}
            <div className={`relative ${!imageOnLeft ? 'md:col-start-2' : ''}`}>
              <div className="flex items-start mb-6">
                <div className={`w-0.5 h-10 mr-4 ${getAccentColor()}`}></div>
                <div>
                  <h2 className="text-3xl font-bold mb-3 uppercase tracking-tight">{title}</h2>
                  <div className="inline-flex items-center space-x-2.5 bg-yellow-50 rounded-full px-4 py-1.5 text-sm text-yellow-800 border border-yellow-100">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                    <span className="font-medium">{duration}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-2xl">{description}</p>

              {/* Deliverables sections */}
              <div className="space-y-3">
                {studioShedDeliverables.length > 0 && (
                  <div className={`border rounded-lg overflow-hidden bg-white/95 ${getBorderColor()}`}>
                    <button
                      onClick={() => toggleSection('studio')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-[15px]">STUDIO SHED DELIVERABLES</h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          expandedSections.studio ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections.studio && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-4"
                        >
                          {renderStudioShedDeliverables()}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {contractorDeliverables.items.length > 0 && (
                  <div className={`border rounded-lg overflow-hidden bg-white/95 ${getBorderColor()}`}>
                    <button
                      onClick={() => toggleSection('contractor')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-[15px]">SS NETWORK CONTRACTOR OR DIY CONTRACTOR DELIVERABLES</h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          expandedSections.contractor ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections.contractor && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-4"
                        >
                          <ul className="space-y-2.5">
                            {contractorDeliverables.items.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <CheckIcon />
                                <span className="text-[15px] text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                          {contractorDeliverables.subitems && (
                            <div className="mt-4 space-y-4">
                              {contractorDeliverables.subitems.map((subitem, index) => (
                                <div key={index}>
                                  <h4 className="font-medium mb-2 text-[15px]">{subitem.title}</h4>
                                  <ul className="space-y-2 pl-5">
                                    {subitem.items.map((item, itemIndex) => (
                                      <li key={itemIndex} className="flex items-start text-[15px]">
                                        <span className="mr-2 text-gray-400">—</span>
                                        <span>{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {customerDeliverables.length > 0 && (
                  <div className={`border rounded-lg overflow-hidden bg-white/95 ${getBorderColor()}`}>
                    <button
                      onClick={() => toggleSection('customer')}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-[15px]">CUSTOMER DELIVERABLES</h3>
                      <ChevronDown 
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          expandedSections.customer ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {expandedSections.customer && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-4"
                        >
                          <ul className="space-y-2.5">
                            {customerDeliverables.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <CheckIcon />
                                <span className="text-[15px] text-gray-600">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Image column */}
            <div className={`relative h-full min-h-[480px] lg:min-h-[580px] ${!imageOnLeft ? 'md:col-start-1' : ''}`}>
              <div className="sticky top-8 w-full h-full">
                <div className="absolute inset-0 rounded-lg overflow-hidden shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                  <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};