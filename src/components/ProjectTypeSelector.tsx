import React from 'react';
import { Check } from 'lucide-react';

interface ProjectType {
  id: string;
  title: string;
  sqft: number;
}

interface ProjectTypeSelectorProps {
  selectedType: string;
  onSelectType: (id: string) => void;
}

const projectTypes: ProjectType[] = [
  { id: 'studio', title: 'Single room studio', sqft: 120 },
  { id: 'small-adu', title: 'Small ADU', sqft: 476 },
  { id: 'large-adu', title: 'Large ADU', sqft: 1000 },
];

export const ProjectTypeSelector: React.FC<ProjectTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {projectTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelectType(type.id)}
          className={`p-6 rounded-lg border-2 text-left relative ${
            selectedType === type.id
              ? 'border-orange-500 bg-orange-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <h3 className="text-lg font-medium mb-2">{type.title}</h3>
          <p className="text-gray-600">{type.sqft} square feet</p>
          {selectedType === type.id && (
            <div className="absolute top-4 right-4">
              <Check className="w-6 h-6 text-orange-500" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};