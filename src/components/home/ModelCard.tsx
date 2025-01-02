import React from 'react';
import { Link } from 'react-router-dom';

interface ModelCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const ModelCard = ({ id, name, image, description }: ModelCardProps) => {
  return (
    <Link to={`/models/${id}`} className="group">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{name}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </Link>
  );
};