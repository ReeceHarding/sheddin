import React from 'react';

interface SidingOption {
  id: string;
  label: string;
  price: number;
  image: string;
}

interface SidingSelectorProps {
  selectedSiding: string;
  onSidingChange: (id: string) => void;
}

export const SidingSelector: React.FC<SidingSelectorProps> = ({
  selectedSiding,
  onSidingChange,
}) => {
  const options: SidingOption[] = [
    { id: 'lap', label: 'Lap', price: 0, image: '/summit308/exteriorOptions/lap-siding.jpg' },
    { id: 'plank', label: 'Plank', price: 2156, image: '/summit308/exteriorOptions/plank-siding.jpg' },
    { id: 'cedar-plank', label: 'Cedar Plank', price: 8624, image: '/summit308/exteriorOptions/cedar-plank-siding.jpg' },
  ];

  return (
    <div>
      <h3 className="text-sm font-medium uppercase mb-4">SIDING</h3>
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSidingChange(option.id)}
            className={`group relative ${
              selectedSiding === option.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={option.image}
                alt={option.label}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-2">
              <div className="font-medium">{option.label}</div>
              <div className="text-sm text-gray-500">
                {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};