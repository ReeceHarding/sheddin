import React from 'react';

type Category = 'siding' | 'doors' | 'trim';

interface CategoryTabsProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const categories: { id: Category; label: string }[] = [
    { id: 'siding', label: 'SIDING' },
    { id: 'doors', label: 'DOORS' },
    { id: 'trim', label: 'TRIM' },
  ];

  return (
    <div className="flex space-x-2">
      {categories.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onCategoryChange(id)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeCategory === id
              ? 'bg-[#1A1F2C] text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};