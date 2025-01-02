import React from 'react';
import { TabGroup } from './TabGroup';
import { FinishOption } from './FinishOption';

interface FinishesSelectorProps {
  selectedFinish: string;
  onFinishSelect: (finish: string) => void;
  activeTab: 'fixtures' | 'countertops' | 'cabinets';
  onTabChange: (tab: 'fixtures' | 'countertops' | 'cabinets') => void;
}

export const FinishesSelector: React.FC<FinishesSelectorProps> = ({
  selectedFinish,
  onFinishSelect,
  activeTab,
  onTabChange,
}) => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium text-gray-500 uppercase">FINISHES</h3>
    
    <TabGroup
      tabs={[
        { id: 'fixtures', label: 'FIXTURES' },
        { id: 'countertops', label: 'COUNTERTOPS' },
        { id: 'cabinets', label: 'CABINETS' }
      ]}
      activeTab={activeTab}
      onChange={(tab) => onTabChange(tab as 'fixtures' | 'countertops' | 'cabinets')}
    />

    <div className="grid grid-cols-2 gap-4 mt-6">
      <FinishOption
        id="matte-black"
        label="Matte Black"
        image="/summit308/interiorFinishes/AshlarOak.png"
        selected={selectedFinish === 'matte-black'}
        onClick={() => onFinishSelect('matte-black')}
      />
      <FinishOption
        id="satin-nickel"
        label="Satin Nickel"
        image="/summit308/interiorFinishes/IceFog.png"
        selected={selectedFinish === 'satin-nickel'}
        onClick={() => onFinishSelect('satin-nickel')}
      />
    </div>
  </div>
);