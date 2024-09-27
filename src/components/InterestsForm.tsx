import React, { useState } from 'react';
import FormTemplate from './FormTemplate';
import CreatableSelect from 'react-select/creatable';

interface InterestsFormProps {
  onBack: () => void;
  onNext: () => void;
  updateData: (data: { selectedInterests: string[] }) => void;
}

const InterestsForm: React.FC<InterestsFormProps> = ({ onBack, onNext, updateData }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const options = [
    { label: 'Hiking', value: 'hiking' },
    { label: 'Swimming', value: 'swimming' },
    { label: 'Camping', value: 'camping' },
    { label: 'Photography', value: 'photography' },
    { label: 'Bird Watching', value: 'bird_watching' },
    { label: 'Fishing', value: 'fishing' },
    { label: 'Rock Climbing', value: 'rock_climbing' },
    { label: 'Sightseeing', value: 'sightseeing' },
    { label: 'Stargazing', value: 'stargazing' },
    { label: 'Visiting National Parks', value: 'visiting_national_parks' },
    { label: 'Cave Exploring', value: 'cave_exploring' },
    { label: 'Kayaking', value: 'kayaking' },
    { label: 'Cycling', value: 'cycling' },
    { label: 'Scenic Drives', value: 'scenic_drives' },
    { label: 'Visiting Historic Sites', value: 'visiting_historic_sites' },
    { label: 'Exploring Small Towns', value: 'exploring_small_towns' },
    { label: 'Wine Tasting', value: 'wine_tasting' },
    { label: 'Food Tasting', value: 'food_tasting' },
    { label: 'Music Festivals', value: 'music_festivals' },
    { label: 'Attending Local Events', value: 'attending_local_events' },
    { label: 'Visiting Museums', value: 'visiting_museums' },
    { label: 'Picnicking', value: 'picnicking' },
    { label: 'Wildlife Watching', value: 'wildlife_watching' },
    { label: 'Roadside Attractions', value: 'roadside_attractions' },
    { label: 'Beachcombing', value: 'beachcombing' },
    { label: 'Boating', value: 'boating' },
    { label: 'Visiting Theme Parks', value: 'visiting_theme_parks' },
    { label: 'Horseback Riding', value: 'horseback_riding' },
    { label: 'Hot Air Ballooning', value: 'hot_air_ballooning' },
    { label: 'Surfing', value: 'surfing' },
    { label: 'Snowboarding', value: 'snowboarding' },
    { label: 'Skiing', value: 'skiing' },
    { label: 'Golfing', value: 'golfing' },
    { label: 'Geocaching', value: 'geocaching' },
    { label: 'Road Trip Games', value: 'road_trip_games' },
    { label: 'Visiting Friends/Family', value: 'visiting_friends_family' },
    { label: 'Exploring Forests', value: 'exploring_forests' },
    { label: 'Hot Springs', value: 'hot_springs' },
    { label: 'City Tours', value: 'city_tours' },
    { label: 'Ghost Towns', value: 'ghost_towns' },
    { label: 'Ziplining', value: 'ziplining' },
  ];

  const handleSelectChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
    setSelectedInterests(selectedValues);
  };

  const handleNext = () => {
    updateData({ selectedInterests });
    onNext();
  };

  const customStyles = {
    placeholder: (provided: any) => ({
      ...provided,
      color: 'black', 
    }),
    control: (provided: any) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      borderRadius: '0.5rem', 
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'black', // Change this to the desired arrow color
      '&:hover': {
        color: 'black', // Keep the color consistent on hover
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: 'black', // Set the separator line color to black
    }),
    
  };


  return (
    <FormTemplate onBack={onBack} onNext={handleNext}>
      <div className="space-y-8">
        <h2 className="mb-36 text-4xl font-semibold text-white text-center">Interests</h2>
        <div className="px-80">
        </div>
        <CreatableSelect
          isMulti
          onChange={handleSelectChange}
          options={options}
          styles={customStyles}
          formatCreateLabel={(inputValue: string) => `Add "${inputValue}"`}
          className="w-full py-3 px-4 bg-white bg-opacity-100 rounded-lg shadow-md focus:outline-none"
          placeholder="Type or select your interests"
        />
      </div>
    </FormTemplate>
  );
};

export default InterestsForm;
