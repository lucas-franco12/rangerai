import React, { useState } from 'react';
import FormTemplate from './FormTemplate';

interface VehicleFormProps {
  onBack: () => void;
  onNext: () => void;
  updateData: (data: { make: string; model: string; year: number; mpg: number; isRv: boolean }) => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ onBack, onNext, updateData }) => {
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<number>(0);
  const [mpg, setMpg] = useState<number>(0);
  const [isRv, setIsRv] = useState<boolean>(false);

  const handleNext = () => {
    updateData({ make, model, year, mpg, isRv });
    onNext(); // Move to the next form
  };

  return (
    <FormTemplate onBack={onBack} onNext={handleNext}>
      <input
        type="text"
        placeholder="Make"
        className="w-full py-3 px-4 bg-white bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />
      <input
        type="text"
        placeholder="Model"
        className="w-full py-3 px-4 bg-white bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        className="w-full py-3 px-4 bg-white bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
        value={year === 0 ? '' : year}
        onChange={(e) => setYear(parseInt(e.target.value) || 0)}
        min={1900}
        max={new Date().getFullYear()}
      />
      <input
        type="number"
        placeholder="MPG"
        className="w-full py-3 px-4 bg-white bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
        value={mpg === 0 ? '' : mpg}
        onChange={(e) => setMpg(parseInt(e.target.value) || 0)}
        min={1}
      />
      <div className="mt-4">
        <label className="text-white mr-2">RV/Camper</label>
        <input
          type="checkbox"
          checked={isRv}
          onChange={() => setIsRv((prev) => !prev)}
        />
      </div>
    </FormTemplate>
  );
};

export default VehicleForm;
