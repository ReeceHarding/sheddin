import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '../shared/Button';

interface ModelCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  features: string[];
  isPopular?: boolean;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  id,
  name,
  description,
  image,
  features,
  isPopular
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // If it's the Summit Series, go to the summit selection page
    if (id === 'summit') {
      navigate('/design/summit');
    } else {
      navigate(`/design/${id}`);
    }
  };

  return (
    <div className="group flex flex-col h-full">
      <div className={`
        relative flex flex-col h-full bg-white rounded-lg p-8 
        transition-shadow hover:shadow-lg
        ${isPopular ? 'border-2 border-[#FFB800]' : 'border border-gray-200'}
      `}>
        {isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <span className="inline-block bg-[#FFB800] text-white text-sm font-medium px-4 py-1 rounded-full whitespace-nowrap">
              MOST POPULAR
            </span>
          </div>
        )}

        <div className="relative w-full pt-[75%] mb-6">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>

        <div className="flex-grow flex flex-col">
          <h3 className="text-2xl font-medium leading-tight mb-4">{name}</h3>
          <p className="text-base text-gray-600 leading-relaxed mb-6">{description}</p>
          
          <ul className="flex-grow space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-5 h-5 text-[#FFB800] mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <Button onClick={handleClick} fullWidth>
              Design & Price
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};