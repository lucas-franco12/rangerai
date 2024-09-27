import React, { useState } from 'react';
import FormTemplate from './FormTemplate';

interface DateLocationFormProps {
  onBack: () => void;
  onNext: () => void;
  updateData: (data: { startLocation: string; endLocation: string; startDate: string; endDate: string }) => void;
}

const DateLocationForm: React.FC<DateLocationFormProps> = ({ onBack, onNext, updateData }) => {
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleNext = () => {
    updateData({ startLocation, endLocation, startDate, endDate });
    onNext(); 
  };

  return (
    <FormTemplate onBack={onBack} onNext={handleNext}>
      <h3 className="text-center text-4xl font-semibold text-white">Locations and Dates</h3>
      <input
        type="text"
        placeholder="Coming from ..."
        className="w-full py-3 px-4  bg-white  bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
        value={startLocation}
        onChange={(e) => setStartLocation(e.target.value)} 
      />
      <input
        type="text"
        placeholder="Traveling to ..."
        className="w-full py-3 px-4 bg-white  bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
        value={endLocation}
        onChange={(e) => setEndLocation(e.target.value)}
      />
      <input
        type="date"
        placeholder="From ..."
        className="w-full py-3 px-4 bg-white  bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        placeholder="Until ..."
        className="w-full py-3 px-4 bg-white  bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </FormTemplate>
    
  );
};

export default DateLocationForm;
