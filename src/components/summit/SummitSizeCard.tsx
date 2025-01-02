import React from 'react';
import { Link } from 'react-router-dom';

interface SummitSizeCardProps {
  id: string;
  name: string;
  dimensions: string;
  specs: string;
  image: string;
}

export const SummitSizeCard: React.FC<SummitSizeCardProps> = ({
  id,
  name,
  dimensions,
  specs,
  image
}) => {
  return (
    <Link 
      to={`/design/summit/${id}`}
      className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video mb-4">
        <img
          src={image}
          alt={`${name} - ${specs}`}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-medium mb-1">{name}</h3>
        <p className="text-gray-600">{dimensions} · {specs}</p>
      </div>
    </Link>
  );
};