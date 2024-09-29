'use client' 
import React, { useState, useEffect } from 'react';
import '@fontsource/righteous';
import { useRouter } from 'next/navigation'; 
import AccomodationForm from '@/components/AccomodationForm';
import DateLocationForm from '@/components/DateLocationForm';
import InterestsForm from '@/components/InterestsForm';
import VehicleForm from '@/components/VehicleForm';
import BudgetForm from '@/components/BudgetForm';

interface Trip {
  dateLocation: {
    startLocation: string;
    endLocation: string;
    startDate: string;
    endDate: string;
  };
  vehicle: {
    make: string;
    model: string;
    year: number;
    mpg: number;
    isRv: boolean;
  };
  accommodation: {
    selectedAccommodations: string[];
    numAdults: number;
    numChildren: number;
    numPets: number;
  };
  budget: {
    budgetLevel: number; 
  };
  interests: {
    selectedInterests: string[];
  };
}


const PlanningPage: React.FC = () => {
  const [currentForm, setCurrentForm] = useState(1);

  // Initialize trip object state
  const [trip, setTrip] = useState<Trip>({
    dateLocation: {
      startLocation: '',
      endLocation: '',
      startDate: '',
      endDate: '',
    },
    vehicle: {
      make: '',
      model: '',
      year: 0,
      mpg: 0,
      isRv: false,
    },
    accommodation: {
      selectedAccommodations: [],
      numAdults: 0,
      numChildren: 0,
      numPets: 0,
    },
    budget: {
      budgetLevel: 3, // Default to medium budget
    },
    interests: {
      selectedInterests: [],
    },
  });

  const router = useRouter();

  // Handler functions to update specific sections of the trip object
  const updateDateLocation = (data: Trip['dateLocation']) => setTrip(prev => ({ ...prev, dateLocation: data }));
  const updateVehicle = (data: Trip['vehicle']) => setTrip(prev => ({ ...prev, vehicle: data }));
  const updateAccommodation = (data: Trip['accommodation']) => setTrip(prev => ({ ...prev, accommodation: data }));
  const updateBudget = (data: Trip['budget']) => setTrip(prev => ({ ...prev, budget: data }));
  const updateInterests = (data: Trip['interests']) => setTrip(prev => ({ ...prev, interests: data }));

  const organizeTrip = (tripData: Trip) => ({
    itinerary: {
      startLocation: tripData.dateLocation.startLocation,
      endLocation: tripData.dateLocation.endLocation,
      startDate: tripData.dateLocation.startDate,
      endDate: tripData.dateLocation.endDate,
      vehicle: {
        make: tripData.vehicle.make,
        model: tripData.vehicle.model,
        year: tripData.vehicle.year,
        mpg: tripData.vehicle.mpg,
        isRv: tripData.vehicle.isRv,
      },
      accommodation: {
        selectedAccommodations: tripData.accommodation.selectedAccommodations,
        numAdults: tripData.accommodation.numAdults,
        numChildren: tripData.accommodation.numChildren,
        numPets: tripData.accommodation.numPets,
      },
      budgetLevel: tripData.budget.budgetLevel,
      interests: tripData.interests.selectedInterests,
    },
  });

  const onSubmit = async () => {
    try {
      const organizedTrip = organizeTrip(trip);  // Organize the trip data

      // OpenAI API Request
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(organizedTrip),
      });

      const generatedTrip = await response.json();  // response from ChatGPT
      console.log('Generated Trip:', generatedTrip);

      // *** Google Maps API Request ***
      const mapResponse = await fetch("/api/maps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generatedTrip),  // Pass the generated trip to maps API
      });

      const mapUrls = await mapResponse.json();  // map URLs
      console.log('Map URLs:', mapUrls);

      // Store the trip data and map URLs in localStorage 
      localStorage.setItem('tripData', JSON.stringify(generatedTrip));
      localStorage.setItem('mapUrls', JSON.stringify(mapUrls));

      //  Save the trip and map data to state or navigate to Dashboard 
      router.push('/dashboard');
    } catch (error) {
      console.error("Error submitting trip data:", error);
    }
  }; 


  // Navigation handlers
  const onBack = () => {
    setCurrentForm((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const onNext = () => {
    setCurrentForm((prev) => (prev < 5 ? prev + 1 : 5));
  };

  const onRoute = () => {
    router.push('/'); 
  };

  const getForm = () => {
    switch (currentForm) {
      case 1:
        return <DateLocationForm onBack={onRoute} onNext={onNext} updateData={updateDateLocation}/>;
      case 2:
        return <VehicleForm onBack={onBack} onNext={onNext} updateData={updateVehicle} />;
      case 3:
        return <AccomodationForm onBack={onBack} onNext={onNext} updateData={updateAccommodation} />;
      case 4:
        return <BudgetForm onBack={onBack} onNext={onNext} updateData={updateBudget} />;
      case 5:
        return <InterestsForm onBack={onBack} onNext={onSubmit} updateData={updateInterests}/>;
      default:
        return <DateLocationForm onBack={onRoute} onNext={onNext} updateData={updateDateLocation}/>;
    }
  };
  

  return (
    <div
      className="font-righteous bg-cover bg-center flex justify-center bg-fixed h-screen"
      style={{ backgroundImage: `url('/assets/images/form-background-${currentForm}.jpg')` }}
    >
      <div className="mb-4">{getForm()}</div>
    </div>
  );
};

export default PlanningPage;
