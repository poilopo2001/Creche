import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

interface LuxembourgPriceCalculatorProps {
  baseHourlyRate: number; // Base rate per hour before state contribution
}

const LuxembourgPriceCalculator: React.FC<LuxembourgPriceCalculatorProps> = ({
  baseHourlyRate
}) => {
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [stateContribution, setStateContribution] = useState<boolean>(true);
  const [customHours, setCustomHours] = useState<boolean>(false);

  const MAX_STATE_CONTRIBUTION = 6; // €6 per hour for daycare services
  const MAX_HOURS_STATE_CONTRIBUTION = 60; // Maximum hours per week for state contribution

  const calculatePrice = () => {
    const hours = Math.min(hoursPerWeek, MAX_HOURS_STATE_CONTRIBUTION);
    const extraHours = Math.max(0, hoursPerWeek - MAX_HOURS_STATE_CONTRIBUTION);
    
    if (stateContribution) {
      const parentContribution = Math.max(0, baseHourlyRate - MAX_STATE_CONTRIBUTION);
      return {
        weekly: (hours * parentContribution) + (extraHours * baseHourlyRate),
        monthly: ((hours * parentContribution) + (extraHours * baseHourlyRate)) * 4,
        stateContribution: hours * Math.min(MAX_STATE_CONTRIBUTION, baseHourlyRate) * 4
      };
    } else {
      return {
        weekly: hoursPerWeek * baseHourlyRate,
        monthly: hoursPerWeek * baseHourlyRate * 4,
        stateContribution: 0
      };
    }
  };

  const price = calculatePrice();

  const presetHours = [
    { label: 'Full Time (40h)', value: 40 },
    { label: 'Half Time (20h)', value: 20 },
    { label: 'Extended (50h)', value: 50 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="text-indigo-600" />
        <h3 className="text-xl font-semibold">Price Calculator</h3>
      </div>

      <div className="space-y-6">
        {/* Hours Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours per Week
          </label>
          {!customHours ? (
            <div className="grid grid-cols-3 gap-2 mb-2">
              {presetHours.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setHoursPerWeek(preset.value)}
                  className={`py-2 px-4 rounded-md text-sm ${
                    hoursPerWeek === preset.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="number"
              min="1"
              max="168"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          )}
          <button
            onClick={() => setCustomHours(!customHours)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            {customHours ? 'Use preset hours' : 'Enter custom hours'}
          </button>
        </div>

        {/* State Contribution Toggle */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={stateContribution}
              onChange={(e) => setStateContribution(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Include state contribution (CSA)
            </span>
          </label>
          <p className="mt-1 text-sm text-gray-500">
            Maximum €6/hour for up to 60 hours per week
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Weekly Cost:</span>
            <span className="font-semibold">€{price.weekly.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Monthly Estimate:</span>
            <span className="font-semibold">€{price.monthly.toFixed(2)}</span>
          </div>
          {stateContribution && (
            <div className="flex justify-between text-green-600">
              <span>Monthly State Contribution:</span>
              <span className="font-semibold">€{price.stateContribution.toFixed(2)}</span>
            </div>
          )}
          {hoursPerWeek > MAX_HOURS_STATE_CONTRIBUTION && stateContribution && (
            <p className="text-sm text-amber-600">
              Note: State contribution is limited to {MAX_HOURS_STATE_CONTRIBUTION} hours per week.
              Additional hours are charged at full rate.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LuxembourgPriceCalculator; 