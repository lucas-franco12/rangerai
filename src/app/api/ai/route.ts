import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Define the prompt template that will guide ChatGPT
const systemPrompt = `
You are a road trip planner. Based on the following input, create a highly detailed, personalized road trip plan:

Starting point: Beginning location of the road trip.
Ending point: Final destination of the road trip.
Vehicle details: make, model, year, fuel efficiency (miles per gallon), and whether it is an RV.
Accommodation preferences: the number of adults, children, and pets; and any specific accommodation types (e.g., hotels, motels, campsites, or Airbnb).
Budget level: From 1 to 5, where 1 is low-budget and 5 is high-budget.
Interests: activities or items on the user's bucket list that should guide suggestions for things to do along the trip.

Based on this input, create a detailed road trip plan in the specified JSON format. Separate the trip into days, where each day has a start and end point, as well as multiple stops in between. 
Each location should have a small description that is exactly one sentence long. 

Each day should have the following locations:
Gas Station: Calculate when and where users should stop for gas based off their fuel efficiency. 
Food Options: Recommend 2 - 3 places to eat based off of budget levels.
Accomodations: Recommend 2 - 3 accomodations based off of their accomodation and budget level preferences.
Activities: Very important. Recommend things to do based off of their interests preferences


*VERY IMPORTANT*: Return the trip plan in the following JSON format:

{
  "trip": {
    "begin": "Where the user said they will start the trip",
    "end": "Where the user said they want to end the trip",
    "days": [
      {
        "day": "Which day of the trip this is",
        "locations": [
          {
            "location": "General area of where to stop",
            "bucketlistitems": [
              {
                "item": "Specific location of the bucket list item",
                "description": "Description of this bucket list item"
              }
            ],
            "locationsummary": "Summary of the location"
          }
        ],
        "overallsummary": "Summary of the day"
      }
    ]
  }
}
`;
let latestContent = "";
export async function POST(req: NextRequest) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        // get trip data
        const tripData = await req.json();
        console.log('Received trip data on Open AI Route:', tripData); 

        const startLocation = tripData.itinerary?.startLocation;
        const endLocation = tripData.itinerary?.endLocation;
        const vehicle = tripData.itinerary?.vehicle;
        const accommodation = tripData.itinerary?.accommodation;
        const budgetLevel = tripData.itinerary?.budgetLevel;
        const interests = tripData.itinerary?.interests;

        if (!startLocation || !endLocation) {
            throw new Error('Missing start or end location');
        }

        // Structure the user input for the API
        const userInput = JSON.stringify({
            startLocation,
            endLocation,
            vehicle,
            accommodation,
            budget: budgetLevel,
            interests,
        });

        // Send to OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userInput },
            ],
        });

        // get the response content
        const content = completion.choices[0].message.content;
        if (!content) {
            throw new Error("No content returned from OpenAI API");
        }
        latestContent = content;
        console.log('Open AI Response in latestContent:',latestContent); // Log the response content


        // Parse the content as JSON
        const tripPlan = JSON.parse(content);

        console.log('Response after JSON parsing:', tripPlan)

        // Return the trip plan to the frontend
        return NextResponse.json(tripPlan);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error generating roadtrip plan:", error.message);
            return NextResponse.json({
                error: "An error occurred while generating the roadtrip plan. Please try again.",
            });
        } else {
            console.error("Error generating roadtrip plan:", error);
            return NextResponse.json({
                error: "An unknown error occurred while generating the roadtrip plan. Please try again.",
            });
        }
    }
}

// GET request handler to retrieve the latest content (not in use)
export async function GET(req: NextRequest) {
    try {
        if (!latestContent) {
            return NextResponse.json({
                error: "No content available. Please generate a roadtrip plan first.",
            });
        }

        return NextResponse.json({
            latestContent,
        });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error retrieving the latest content:", error.message);
            return NextResponse.json({
                error: "An error occurred while retrieving the latest content. Please try again.",
            });
        } else {
            console.error("Error retrieving the latest content:", error);
            return NextResponse.json({
                error: "An unknown error occurred while retrieving the latest content. Please try again.",
            });
        }
    }
}