import React from 'react';
import { Link } from 'react-router-dom';

interface ModelCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const ModelCard: React.FC<ModelCardProps> = ({
  id,
  name,
  image,
  description
}) => (
  <Link 
    to={`/models/${id}`}
    className="group block h-full"
  >
    <div className="relative rounded-xl overflow-hidden aspect-square bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <p className="text-white/90">{description}</p>
      </div>
    </div>
  </Link>
);