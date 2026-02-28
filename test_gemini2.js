const prompt = 'Act as an expert travel planner and comedian for India. The user is traveling from Mumbai to Goa from 2026-03-01 to 2026-03-08 (a 7-day trip). Their absolute maximum budget for the entire trip is 50000 INR. Step 1: Evaluate the budget. Is 50000 INR realistic for a 7-day trip from Mumbai to Goa including transport, hotel, and food? Step 2: If the budget is absurdly low (e.g., 500 INR for 5 days), set "is_budget_realistic" to false. Leave the itinerary blank, and write a hilarious, playful roast in "roast_message" telling them to wake up to reality, or suggest they walk there. Step 3: If the budget is realistic (even if it is a bit tight/budget-friendly), set "is_budget_realistic" to true. Provide a full itinerary and adjust the estimated costs to fit within or near their 50000 INR budget. You MUST return ONLY a valid JSON object matching this exact structure, with no markdown formatting: { "is_budget_realistic": true, "roast_message": "Fill this only if budget is false. Make it funny.", "itinerary": [ { "day": "Day 1: Arrival", "activities": "Brief description", "dining": "Restaurant tips" } ], "highlights": [ { "name": "Key Place", "description": "Brief detail" } ], "communication_tips": "Brief tip on local transport or language.", "costs": { "transport": 0, "hotel": 0, "food": 0 } }';

const payload = { contents: [{ parts: [{ text: prompt }] }] };
const apiKey = 'AIzaSyAwvznSRpcvqvvM1ayOtVyG4BDwfWEEUm0';
const modelsToTest = ['gemini-2.5-flash', 'gemini-2.0-flash'];

async function testModels() {
    for (const model of modelsToTest) {
        console.log(`Testing model: ${model}`);
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey;
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.error) {
                console.log(`=> Error for ${model}: ${data.error.message}`);
            } else {
                console.log(`=> Success for ${model}!`);
                return;
            }
        } catch (e) {
            console.log(`=> Network Error: ${e.message}`);
        }
    }
}

testModels();
