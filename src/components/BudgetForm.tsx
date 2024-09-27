import React, { useState } from 'react';
import FormTemplate from './FormTemplate';
import ReactSlider from 'react-slider';

interface BudgetFormProps {
  onBack: () => void;
  onNext: () => void;
  updateData: (data: { budgetLevel: number }) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onBack, onNext, updateData }) => {
  const [budget, setBudget] = useState<number>(3);

  const budgetLevels = [
    '$ - Low Budget',
    '$$ - Low to Medium Budget',
    '$$$ - Medium Budget',
    '$$$$ - Medium to High Budget',
    '$$$$$ - High Budget'
  ];

  const handleBudgetChange = (value: number) => { 
    setBudget(value);
  };

  const handleNext = () => {
    updateData({ budgetLevel: budget });
    onNext();
  };

  return (
    <FormTemplate onBack={onBack} onNext={handleNext}>
      <div className="space-y-8 ">
        <h2 className="mb-36 text-4xl font-semibold text-white text-center">Budget</h2>
        <h3 className="text-2xl font-semibold text-white text-center">{budgetLevels[budget - 1]}</h3>
        <div className="px-80">
        </div>
        
        <ReactSlider
            className="w-[75%]h-3 bg-gray-200 rounded-full"
            thumbClassName="h-8 w-8 bg-green-800 rounded-full shadow-lg transform -translate-y-2 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-75"
            trackClassName="bg-green-500 h-4 rounded-full"
            min={1}
            max={5}
            step={1}
            value={budget}
            onChange={handleBudgetChange}
            renderThumb={(props, state) => <div {...props}></div>}
          />
      </div>
    </FormTemplate>
    
  );
};

export default BudgetForm;
