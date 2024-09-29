import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Define the prompt template that will guide ChatGPT
const systemPrompt = `
You are a road trip planner. You take in:
- A beginning location, a final destination, preferences for the trip, and stops along the way.
- Vehicle details (make, model, year, mpg, and whether it's an RV).
- Accommodation details such as selected accommodations, number of adults, children, and pets.
- Budget level (from 1 to 5, with 1 being low-budget and 5 being high-budget).
- Interests, which are activities or items on the user's bucket list.

Based on this input, create a detailed road trip plan. Each location should have a small description that is exactly one sentence long. Separate the trip into days, where each day has a start and end point, as well as multiple stops in between. Return the trip plan in the following JSON format:

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
        console.error("Error generating roadtrip plan:", error.message);
        return NextResponse.json({
            error: "An error occurred while generating the roadtrip plan. Please try again.",
        });
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
        console.error("Error retrieving the latest content:", error.message);
        return NextResponse.json({
            error: "An error occurred while retrieving the latest content. Please try again.",
        });
    }
}
