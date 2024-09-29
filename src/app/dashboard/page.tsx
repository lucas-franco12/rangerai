'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


// Function to process waypoints (replace spaces with '+' for Google Maps URL)
const processWaypoint = (waypoint: string): string => {
  return waypoint.replace(/[^a-zA-Z0-9]/g, '+').replace(/\++/g, '+');
};

// Define types for trip data
interface BucketListItem {
  item: string;
  description: string;
}

interface Location {
  location: string;
  bucketlistitems: BucketListItem[];
  locationsummary: string;
}

interface Day {
  day: string;
  locations: Location[];
  overallsummary: string;
}

interface Trip {
  trip: {
    begin: string;
    end: string;
    days: Day[];
  };
}

// Define the types for map URLs
interface MapUrls {
  wholeTrip: string;
}

const Dashboard: React.FC = () => {
  const [tripData, setTripData] = useState<Trip | null>(null);
  const [mapUrls, setMapUrls] = useState<MapUrls | null>(null);

  // ** Fetch trip and map data from the server **
  useEffect(() => {
    // this approach tried to call a get request to the open ai api. this was not working because dashboard runs on a different server instance than plan
    // const fetchTripData = async () => {
    //   try {
    //     const tripResponse = await fetch('/api/ai', { method: 'GET' });
    //     if (!tripResponse.ok) {
    //       throw new Error(`Error fetching trip: ${tripResponse.statusText}`);
    //     }
    //     const trip: Trip = await tripResponse.json();
    //     console.log('Recieved trip:',trip);
        
    //     if (trip.trip) {
    //       setTripData(trip);  // Update the state with trip data
    //     } else {
    //       console.error("No trip data available in response:", trip);
    //     }

    //     // Extract waypoints for Google Maps
    //     const waypoints = trip.trip.days
    //       .map((day) => processWaypoint(day.locations[0].location))
    //       .join('|');

    //     const start = processWaypoint(trip.trip.begin);
    //     const end = processWaypoint(trip.trip.end);

    //     setMapUrls({
    //       wholeTrip: `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDR8X_JTgG65Pr5tmdOQVZEhtbpSe9fcl8&origin=${start}&destination=${end}&waypoints=${waypoints}&avoid=tolls|highways`,
    //     });
    //   } catch (error) {
    //     console.error('Error fetching trip data:', error);
    //   }
    // };

    // this approach stores the trip data and map urls to local storage in plan and then retrieves it in dashboard
    const storedTripData = localStorage.getItem('tripData');
    const storedMapUrls = localStorage.getItem('mapUrls');

    if (storedTripData && storedMapUrls) {
      // If data is found in localStorage, set the state directly
      setTripData(JSON.parse(storedTripData));
      setMapUrls(JSON.parse(storedMapUrls));
      console.log('Trip data loaded from localStorage');
      return; // No need to make the API call
    } else {
      console.error("No trip data or map URLs found in localStorage");
      }
    }, []);

  return (
    <div className="flex flex-col h-screen">

      <nav className="bg-green-800 text-gray-200 p-4 flex justify-between items-center">
        <Link href="/"><h1 className="font-bold text-xl">Ranger</h1></Link>
        <div className="">
          <Link href="/plan"><button className="mr-4">New Trip</button></Link>
          <button>Logout</button>
        </div>
      </nav>

      <div className="flex flex-grow overflow-hidden">
        {/* Itinerary Section */}
        <div className="w-1/3 h-full overflow-y-auto p-4 bg-gray-800 text-gray-200 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
          {tripData?.trip?.days.map((day, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold">Day {day.day}</h3>
              <p className="italic">{day.overallsummary}</p>
              {day.locations.map((location, locIndex) => (
                <div key={locIndex} className="mt-4">
                  <h4 className="font-semibold">{location.location}</h4>
                  <p>{location.locationsummary}</p>
                  <ul className="list-disc ml-6">
                    {location.bucketlistitems.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <strong>{item.item}: </strong>{item.description}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {index < tripData.trip.days.length - 1 && <hr className="my-4 border-gray-600" />}
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="w-2/3 h-full">
          {mapUrls && (
            <iframe
              className="w-full h-full"
              src={mapUrls.wholeTrip}
              allowFullScreen
              loading="lazy"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
