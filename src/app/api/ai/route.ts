//Version 1
// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const systemPrompt = `
// You are a roadtrip planner, you take in a beginning location, a final destination, preferences for the trip, and stops along the way
// to create a plan for a roadtrip. Each location should have a small description that is exactly one sentence long. Separate the trip
// in days. Each day of the trip should have a start and end point which is where a user is expected to start and end for the day of the trip.
// You should return in the following JSON format:
// {
//   "trip": {
// 	"begin": "Where the user said they will start the trip",
// 	"end": "Where the user said they want to end the trip",
//     "days": [
//       {
//         "day": "Which day of the trip this is",
//         "locations": [
//           {
//             "location": "General area of where to stop",
//             "bucketlistitems": [
//               {
//                 "item": "Specific location of the bucket list item",
//                 "description": "Description of this bucket list item"
//               }
//             ],
//             "locationsummary": "Summary of the location"
//           }
//         ],
//         "overallsummary": "Summary of the day"
//       }
//     ]
//   }
// }


// `;

// export async function POST(req: NextRequest) {
// 	const openai = new OpenAI();
// 	const data = await req.text();

// 	try {
// 		const completion = await openai.chat.completions.create({
// 			messages: [
// 				{ role: "system", content: systemPrompt },
// 				{ role: "user", content: data },
// 			],
// 			model: "gpt-4o-mini",
// 			response_format: { type: "json_object" },
// 		});

// 		// Check if the content is a string before parsing
// 		const content = completion.choices[0].message?.content;
// 		return NextResponse.json(content);
// 	} catch (error) {
// 		console.error("Error generating roadtrip plan:", error);
// 		return NextResponse.json({
// 			error:
// 				"An error occurred while generating the roadtrip plan. Please try again.",
// 		});
// 	}
// }

//Version 2
// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";

// const systemPrompt = `
// You are a road trip planner. You take in:
// - A beginning location, a final destination, preferences for the trip, and stops along the way.
// - Vehicle details (make, model, year, mpg, and whether it's an RV).
// - Accommodation details such as selected accommodations, number of adults, children, and pets.
// - Budget level (from 1 to 5, with 1 being low-budget and 5 being high-budget).
// - Interests, which are activities or items on the user's bucket list.

// Based on this input, create a detailed road trip plan. Each location should have a small description that is exactly one sentence long. Separate the trip into days, where each day has a start and end point, as well as multiple stops in between. Return the trip plan in the following JSON format:

// {
//   "trip": {
// 	"begin": "Where the user said they will start the trip",
// 	"end": "Where the user said they want to end the trip",
//     "days": [
//       {
//         "day": "Which day of the trip this is",
//         "locations": [
//           {
//             "location": "General area of where to stop",
//             "bucketlistitems": [
//               {
//                 "item": "Specific location of the bucket list item",
//                 "description": "Description of this bucket list item"
//               }
//             ],
//             "locationsummary": "Summary of the location"
//           }
//         ],
//         "overallsummary": "Summary of the day"
//       }
//     ]
//   }
// }
// `;

// export async function POST(req: NextRequest) {
// 	const openai = new OpenAI();
// 	const tripData = await req.json(); // Expect the new trip structure from the client

// 	try {
// 		const completion = await openai.chat.completions.create({
// 			messages: [
// 				{ role: "system", content: systemPrompt },
// 				{ 
// 					role: "user", 
// 					content: JSON.stringify({
// 						startLocation: tripData.dateLocation.startLocation,
// 						endLocation: tripData.dateLocation.endLocation,
// 						vehicle: tripData.vehicle,
// 						accommodation: tripData.accommodation,
// 						budget: tripData.budget.budgetLevel,
// 						interests: tripData.interests.selectedInterests
// 					})
// 				},
// 			],
// 			model: "gpt-4o-mini",
// 			response_format: { type: "json_object" },
// 		});

// 		// Check if the content is a string before parsing
// 		const content = completion.choices[0].message?.content;
// 		return NextResponse.json(JSON.parse(content));
// 	} catch (error) {
// 		console.error("Error generating roadtrip plan:", error);
// 		return NextResponse.json({
// 			error:
// 				"An error occurred while generating the roadtrip plan. Please try again.",
// 		});
// 	}
// }

// version 3
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
        // Get the trip data from the request
        const tripData = await req.json();
        console.log('Received trip data on Open AI Route:', tripData); // Log input data to verify structure

        // Correct the field access based on the actual structure of the input
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

        // Send the structured input to OpenAI's chat completion API
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userInput },
            ],
        });

        // Extract the response content
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
// GET request handler to retrieve the latest content
export async function GET(req: NextRequest) {
    try {
        if (!latestContent) {
            return NextResponse.json({
                error: "No content available. Please generate a roadtrip plan first.",
            });
        }

        // 
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
