
// let apiKey = "AIzaSyCIQryaWnPEpRkVGdEtDfE2AyEK0Mg7ln0";
// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
// } from "@google/generative-ai";


// const genAI = new GoogleGenerativeAI(apiKey);
 
// const model = genAI.getGenerativeModel({
//     model: "gemini-2.0-flash",
// });

// const generationConfig = {
//     temperature: 1,
//     topp: 0.95,
//     topk: 40,
//     maxOutputTokens: 8192,
//     responseMimeType: "text/plain",
// };

// async function run(prompt) {
//     const chatSession = model.startChat({
//         generationConfig,
//         history: [],
//     });

//     const result = await chatSession.sendMessage(prompt);
//     return result.response.text()
// }

// export default run;
const apiKey = "AIzaSyCIQryaWnPEpRkVGdEtDfE2AyEK0Mg7ln0"; // Consider using environment variables
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // Using your specified model
    generationConfig: {
        temperature: 1,
        topP: 0.95,  // Correct parameter name (not 'topp')
        topK: 40,    // Correct parameter name (not 'topk')
        maxOutputTokens: 20,
    }
});

async function run(prompt) {
    try {
        const chatSession = model.startChat({
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
}

export default run;