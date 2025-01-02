import React from 'react';

interface TimelineStepProps {
  step: number;
  title: string;
  description: string;
}

export const TimelineStep: React.FC<TimelineStepProps> = ({
  step,
  title,
  description
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="text-yellow-500 font-bold text-xl mb-2">Step {step}</div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};