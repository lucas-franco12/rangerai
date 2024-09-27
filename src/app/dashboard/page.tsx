// 'use client'
// import React, { useEffect, useState } from 'react';

// interface Day {
//   day: string;
//   locations: {
//     location: string;
//     bucketlistitems: {
//       item: string;
//       description: string;
//     }[];
//     locationsummary: string;
//   }[];
//   overallsummary: string;
// }

// interface Trip {
//   trip: {
//     start: string;
//     end: string;
//     days: Day[];
//   };
// }

// interface MapUrls {
//   wholeTrip: string;
//   days: { dayUrl: string }[];
// }

// const Dashboard: React.FC = () => {
//   const [tripData, setTripData] = useState<Trip | null>(null);
//   const [mapUrls, setMapUrls] = useState<MapUrls | null>(null);

//   // Fetch the GPT trip data (itinerary)
//   const fetchTripData = async () => {
//     try {
//       const response = await fetch('/api/gpt', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ trip: 'data' }), // Pass the relevant trip data
//       });
//       const trip = await response.json();
//       setTripData(trip);
//     } catch (error) {
//       console.error('Error fetching trip data:', error);
//     }
//   };

//   // Fetch the Google Maps URLs (waypoints)
//   const fetchMapUrls = async () => {
//     try {
//       const response = await fetch('/api/maps', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(tripData), // Pass the tripData to the maps API
//       });
//       const mapUrls = await response.json();
//       setMapUrls(mapUrls);
//     } catch (error) {
//       console.error('Error fetching map URLs:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTripData();
//   }, []);

//   // Once tripData is fetched, get map URLs
//   useEffect(() => {
//     if (tripData) {
//       fetchMapUrls();
//     }
//   }, [tripData]);

//   return (
//     <div className="flex flex-col items-center">
//       <h1 className="text-2xl font-semibold">Roadtrip Dashboard</h1>

//       {/* Map Section */}
//       {mapUrls && (
//         <iframe
//           className="w-full h-96 mt-6"
//           src={mapUrls.wholeTrip}
//           allowFullScreen
//           loading="lazy"
//         ></iframe>
//       )}

//       {/* Itinerary Section */}
//       <div className="mt-8 w-full max-w-4xl">
//         <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
//         {tripData?.trip.days.map((day, index) => (
//           <div key={index} className="mb-6">
//             <h3 className="text-lg font-semibold">Day {day.day}</h3>
//             <p className="italic">{day.overallsummary}</p>

//             {/* Locations */}
//             {day.locations.map((location, locIndex) => (
//               <div key={locIndex} className="mt-4">
//                 <h4 className="font-semibold">{location.location}</h4>
//                 <p>{location.locationsummary}</p>
//                 <ul className="list-disc ml-6">
//                   {location.bucketlistitems.map((item, itemIndex) => (
//                     <li key={itemIndex}>
//                       <strong>{item.item}: </strong>{item.description}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// version 2 --> test frontend
// 'use client'
// import React, { useState } from 'react';

// // Function to process waypoints (replace spaces with '+' for Google Maps URL)
// const processWaypoint = (waypoint: string): string => {
//   return waypoint.replace(/[^a-zA-Z0-9]/g, "+").replace(/\++/g, "+");
// };

// // Construct waypoints string from trip data
// const waypointsString = [
//   processWaypoint("Philadelphia, PA"),
//   processWaypoint("Pittsburgh, PA"),
//   processWaypoint("Chicago, IL")
// ].join("|");

// // Fake Data Structure for Trip
// const fakeTripData = {
//   trip: {
//     start: "New York City, NY",
//     end: "San Francisco, CA",
//     days: [
//       {
//         day: "1",
//         locations: [
//           {
//             location: "Philadelphia, PA",
//             bucketlistitems: [
//               {
//                 item: "Liberty Bell",
//                 description: "A visit to the famous Liberty Bell."
//               },
//               {
//                 item: "Philadelphia Museum of Art",
//                 description: "Walk up the famous Rocky steps."
//               }
//             ],
//             locationsummary: "Philadelphia is known for its rich history and cultural sites."
//           }
//         ],
//         overallsummary: "The first day includes a drive from New York to Philadelphia."
//       },
//       {
//         day: "2",
//         locations: [
//           {
//             location: "Pittsburgh, PA",
//             bucketlistitems: [
//               {
//                 item: "Mount Washington",
//                 description: "Amazing views of Pittsburgh's skyline."
//               }
//             ],
//             locationsummary: "Pittsburgh offers stunning views and a rich industrial history."
//           }
//         ],
//         overallsummary: "On day two, you'll travel across Pennsylvania to Pittsburgh."
//       },
//       {
//         day: "3",
//         locations: [
//           {
//             location: "Chicago, IL",
//             bucketlistitems: [
//               {
//                 item: "Millennium Park",
//                 description: "See the famous Cloud Gate (The Bean)."
//               }
//             ],
//             locationsummary: "Chicago is a vibrant city with great food and sights."
//           }
//         ],
//         overallsummary: "The third day brings you to the bustling city of Chicago."
//       },
//       {
//         day: "3",
//         locations: [
//           {
//             location: "Chicago, IL",
//             bucketlistitems: [
//               {
//                 item: "Millennium Park",
//                 description: "See the famous Cloud Gate (The Bean)."
//               }
//             ],
//             locationsummary: "Chicago is a vibrant city with great food and sights."
//           }
//         ],
//         overallsummary: "The third day brings you to the bustling city of Chicago."
//       }
//     ]
//   }
// };

// // Fake Data for Google Maps URLs
// const start = 'New York City, NY';
// const end = 'San Francisco, CA';

// const fakeMapUrls = {
//   wholeTrip: `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDR8X_JTgG65Pr5tmdOQVZEhtbpSe9fcl8&origin=${processWaypoint(start)}&destination=${processWaypoint(end)}&waypoints=${waypointsString}&avoid=tolls|highways`,
//   days: [
//     { dayUrl: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyDR8X_JTgG65Pr5tmdOQVZEhtbpSe9fcl8&origin=New+York+City,NY&destination=Philadelphia,PA" },
//     { dayUrl: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyDR8X_JTgG65Pr5tmdOQVZEhtbpSe9fcl8&origin=Philadelphia,PA&destination=Pittsburgh,PA" },
//     { dayUrl: "https://www.google.com/maps/embed/v1/directions?key=AIzaSyDR8X_JTgG65Pr5tmdOQVZEhtbpSe9fcl8&origin=Pittsburgh,PA&destination=Chicago,IL" }
//   ]
// };

// const Dashboard: React.FC = () => {
//   const [tripData] = useState(fakeTripData);
//   const [mapUrls] = useState(fakeMapUrls);

//   return (
//     <div className="flex flex-col h-screen">

//       {/* Navbar */}
//       <nav className="bg-green-800 text-gray-200 p-4 flex justify-between items-center">
//         <h1 className=" font-bold text-xl">Ranger</h1>
//         <div className="">
//           <button className="mr-4">Dashboard</button>
//           <button>Logout</button>
//         </div>
//       </nav>

//       {/* Main content */}
//       <div className="flex flex-grow overflow-hidden">
        
//         <div className="w-1/3 h-full overflow-y-auto p-4 bg-gray-800 text-gray-200 shadow-lg">
//           <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
//           {tripData?.trip.days.map((day, index) => (
//             <div key={index} className="mb-6">
//               <h3 className="text-lg font-semibold">Day {day.day}</h3>
//               <p className="italic">{day.overallsummary}</p>

//               {/* Locations */}
//               {day.locations.map((location, locIndex) => (
//                 <div key={locIndex} className="mt-4">
//                   <h4 className="font-semibold">{location.location}</h4>
//                   <p>{location.locationsummary}</p>
//                   <ul className="list-disc ml-6">
//                     {location.bucketlistitems.map((item, itemIndex) => (
//                       <li key={itemIndex}>
//                         <strong>{item.item}: </strong>{item.description}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* Map Section (right side) */}
//         <div className="w-2/3 h-full">
//           {mapUrls && (
//             <iframe
//               className="w-full h-full"
//               src={mapUrls.wholeTrip}
//               allowFullScreen
//               loading="lazy"
//             ></iframe>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Dashboard;


'use client';
import React, { useEffect, useState } from 'react';

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
    const fetchTripData = async () => {
      try {
        const tripResponse = await fetch('/api/ai', { method: 'GET' });
        if (!tripResponse.ok) {
          throw new Error(`Error fetching trip: ${tripResponse.statusText}`);
        }
        const trip: Trip = await tripResponse.json();
        console.log('Recieved trip:',trip);
        
        if (trip.trip) {
          setTripData(trip);  // Update the state with trip data
        } else {
          console.error("No trip data available in response:", trip);
        }

        // Extract waypoints for Google Maps
        const waypoints = trip.trip.days
          .map((day) => processWaypoint(day.locations[0].location))
          .join('|');

        const start = processWaypoint(trip.trip.begin);
        const end = processWaypoint(trip.trip.end);

        setMapUrls({
          wholeTrip: `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDR8X_JTgG65Pr5tmdOQVZEhtbpSe9fcl8&origin=${start}&destination=${end}&waypoints=${waypoints}&avoid=tolls|highways`,
        });
      } catch (error) {
        console.error('Error fetching trip data:', error);
      }
    };

    fetchTripData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-green-800 text-gray-200 p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">Ranger</h1>
        <div className="">
          <button className="mr-4">Dashboard</button>
          <button>Logout</button>
        </div>
      </nav>

      {/* Main content */}
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
