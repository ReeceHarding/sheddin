import React from 'react';
import { TabGroup } from './TabGroup';
import { FinishOption } from './FinishOption';

interface FlooringSelectorProps {
  selectedFlooring: string;
  onFlooringSelect: (flooring: string) => void;
  activeTab: 'main' | 'bath';
  onTabChange: (tab: 'main' | 'bath') => void;
}

export const FlooringSelector: React.FC<FlooringSelectorProps> = ({
  selectedFlooring,
  onFlooringSelect,
  activeTab,
  onTabChange,
}) => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium text-gray-500 uppercase">FLOORING</h3>
    
    <TabGroup
      tabs={[
        { id: 'main', label: 'MAIN' },
        { id: 'bath', label: 'BATH' }
      ]}
      activeTab={activeTab}
      onChange={(tab) => onTabChange(tab as 'main' | 'bath')}
    />

    <div className="grid grid-cols-3 gap-4 mt-6">
      <FinishOption
        id="ashlar-oak"
        label="Ashlar Oak"
        image="/summit308/interiorFinishes/AshlarOak.png"
        selected={selectedFlooring === 'ashlar-oak'}
        onClick={() => onFlooringSelect('ashlar-oak')}
      />
      <FinishOption
        id="sandcastle-oak"
        label="Sandcastle Oak"
        image="/summit308/interiorFinishes/IceFog.png"
        selected={selectedFlooring === 'sandcastle-oak'}
        onClick={() => onFlooringSelect('sandcastle-oak')}
      />
      <FinishOption
        id="fawn-chestnut"
        label="Fawn Chestnut"
        image="/summit308/interiorFinishes/AshlarOak.png"
        selected={selectedFlooring === 'fawn-chestnut'}
        onClick={() => onFlooringSelect('fawn-chestnut')}
      />
    </div>
  </div>
);