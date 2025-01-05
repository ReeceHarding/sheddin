import React from 'react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelSelect: (model: string) => void;
  onContinue: () => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelSelect,
  onContinue,
}) => {
  const models = [
    {
      id: 'summit',
      name: 'Summit Series',
      description: 'ADUs and studios with bath, kitchen and bedroom interiors up to 1000 sf',
      image: '/summit-series.png',
      features: [
        'Complete interior packages available',
        'Includes permit plans',
        'ProAssembly available'
      ],
      popular: true
    },
    {
      id: 'aspect',
      name: 'Aspect',
      description: 'Accessory dwelling units in 1bd/1ba or 2bd/2ba floor plans',
      image: '/aspect.png',
      features: [
        'Complete interior packages available',
        'Includes permit plans',
        'ProAssembly available'
      ]
    },
    // Add other models...
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-12">Choose your Troo Solutions</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {models.map(model => (
          <div
            key={model.id}
            className={`border rounded-lg p-6 cursor-pointer relative ${
              model.popular ? 'border-orange-500' : 'border-gray-200'
            } ${selectedModel === model.id ? 'ring-2 ring-orange-500' : ''}`}
            onClick={() => onModelSelect(model.id)}
          >
            {model.popular && (
              <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                MOST POPULAR
              </div>
            )}
            <img src={model.image} alt={model.name} className="w-full h-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{model.name}</h3>
            <p className="text-gray-600 mb-4">{model.description}</p>
            <ul className="space-y-2">
              {model.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="text-orange-500 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full mt-4 bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
              onClick={() => {
                onModelSelect(model.id);
                onContinue();
              }}
            >
              Design & Price
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};