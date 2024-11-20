import React from 'react';
import LuxembourgPriceCalculator from './LuxembourgPriceCalculator';

interface PricingProgramsProps {
  hourlyRate: number;
}

const PricingPrograms: React.FC<PricingProgramsProps> = ({
  hourlyRate
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg">
        <LuxembourgPriceCalculator baseHourlyRate={hourlyRate} />
      </div>
    </div>
  );
};

export default PricingPrograms; 