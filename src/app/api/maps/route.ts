import { NextRequest, NextResponse } from "next/server";

interface BucketListItem {
	item: string;
	description: string;
}

interface Location {
	location: string;
	bucketlistitems: BucketListItem[];
	locationSummary: string;
}

interface Day {
	day: string;
	locations: Location[];
	overallSummary: string;
}

interface TripData {
  trip: {
    begin: string;
    end: string;
    days: Day[];
  };
}

interface WholeTrip {
  wholeTrip: string;
  days: {
    dayUrl: string;
  }[];
}
const organizeTrip = (tripData: TripData): WholeTrip => {
  const { trip } = tripData;
  const dayUrls: string[] = [];
  let allWaypoints: string[] = [];

  for (const day of trip.days) {
    let dayWaypoints: string[] = [];
    
    for (const location of day.locations) {
      const area = location.location;
      dayWaypoints.push(processWaypoint(area));
      
      for (const item of location.bucketlistitems) {
        const bucketItem = item.item;
        const combinedPoint = area + " " + bucketItem;
        dayWaypoints.push(processWaypoint(combinedPoint));
      }
    }

    const dayUrl = createMapUrl(trip.begin, trip.end, dayWaypoints);
    dayUrls.push(dayUrl);
    allWaypoints = allWaypoints.concat(dayWaypoints);
  }

  const wholeTripUrl = createMapUrl(trip.begin, trip.end, allWaypoints);

  return {
    wholeTrip: wholeTripUrl,
    days: dayUrls.map(url => ({ dayUrl: url }))
  };
};

const processWaypoint = (waypoint: string): string => {
  return waypoint.replace(/[^a-zA-Z0-9]/g, "+").replace(/\++/g, "+");
};

const createMapUrl = (start: string, end: string, waypoints: string[]): string => {
  const waypointsString = waypoints.join("|");
  return `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDR8X_JTgG65Pr5tmdOQVZEhtbpSe9fcl8&origin=${processWaypoint(start)}&destination=${processWaypoint(end)}&waypoints=${waypointsString}&avoid=tolls|highways`;
};

export async function POST(req: NextRequest) {
  try {
    const tripData: TripData = await req.json();
    const maps: WholeTrip = organizeTrip(tripData);
    return NextResponse.json(maps);
  } catch (error) {
    console.error("Error generating embedded URLs:", error);
    return NextResponse.json({
      error: "An error occurred while generating the embedded URLs. Please try again.",
    });
  }
}
 