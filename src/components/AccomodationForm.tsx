import React, { useState } from 'react';
import FormTemplate from './FormTemplate';
import Select from 'react-select';

interface AccomodationFormProps {
  onBack: () => void;
  onNext: () => void;
  updateData: (data: {
    selectedAccommodations: string[];
    numAdults: number;
    numChildren: number;
    numPets: number;
  }) => void;
}

const AccomodationForm: React.FC<AccomodationFormProps> = ({ onBack, onNext, updateData }) => {
  const [selectedAccommodations, setSelectedAccommodations] = useState<string[]>([]);
  const [numAdults, setNumAdults] = useState<number>(0);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [numPets, setNumPets] = useState<number>(0);

  const options = [
    { label: 'Hotel', value: 'hotel' },
    { label: 'Hostel', value: 'hostel' },
    { label: 'Campground', value: 'campground' },
    { label: 'Bed and Breakfast', value: 'bnb' },
    { label: 'Airbnb', value: 'airbnb' },
    { label: 'Resort', value: 'resort' },
    { label: 'Motel', value: 'motel' },
    { label: 'Vacation Rental', value: 'vacation_rental' },
    { label: 'Villa', value: 'villa' },
    { label: 'Cottage', value: 'cottage' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'Lodge', value: 'lodge' },
    { label: 'Homestay', value: 'homestay' },
    { label: 'Houseboat', value: 'houseboat' },
    { label: 'Cabin', value: 'cabin' },
    { label: 'Chalet', value: 'chalet' },
    { label: 'Glamping', value: 'glamping' }, 
  ];

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setSelectedAccommodations(selectedValues);
  };

  // When the user clicks next, send the accommodation data to the parent
  const handleNext = () => {
    updateData({
      selectedAccommodations,
      numAdults,
      numChildren,
      numPets,
    });
    onNext();
  };

  const customStyles = {
    placeholder: (provided: any) => ({
      ...provided,
      color: 'black', 
    }),
    control: (provided: any) => ({
      ...provided,
      border: 'none', // Remove the border
      boxShadow: 'none', // Remove the outline/box-shadow
      borderRadius: '0.5rem', 
    }),
  };

  return (
    <FormTemplate onBack={onBack} onNext={handleNext}>
      <div className="space-y-4">
        <h3 className="text-center text-4xl font-semibold text-white">Accommodations</h3>
        <Select
          isMulti
          options={options}
          styles={customStyles}
          onChange={handleSelectChange}
          className="w-full py-3 px-4 bg-white bg-opacity-100 rounded-lg shadow-md focus:outline-none"
          placeholder="Choose your accommodations"
        />
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Number of Adults: 0"
            className="w-full py-3 px-4 bg-white bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
            value={numAdults === 0 ? '' : numAdults}
            onChange={(e) => setNumAdults(parseInt(e.target.value) || 0)}
            min={0}
          />
          <input
            type="number"
            placeholder="Number of Children: 0"
            className="w-full py-3 px-4 bg-white bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
            value={numChildren === 0 ? '' : numChildren}
            onChange={(e) => setNumChildren(parseInt(e.target.value) || 0)}
            min={0}
          />
          <input
            type="number"
            placeholder="Number of Pets: 0"
            className="w-full py-3 px-4 bg-white bg-opacity-100 rounded-lg placeholder-black text-black shadow-md focus:outline-none"
            value={numPets === 0 ? '' : numPets}
            onChange={(e) => setNumPets(parseInt(e.target.value) || 0)}
            min={0}
          />
        </div>
      </div>
    </FormTemplate>
  );
};

export default AccomodationForm;
