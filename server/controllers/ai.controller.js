const { GoogleGenerativeAI } = require('@google/generative-ai');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const suggestDoctor = async (req, res, next) => {
try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.trim().length < 10) {
    return next(new AppError('Please describe your symptoms in at least 10 characters', 400));
    }
    console.log('Gemini key loaded:', process.env.GEMINI_API_KEY ? 'YES' : 'NO - KEY MISSING');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });
//     const prompt = `
// You are a medical triage assistant for VitalSync, a healthcare platform.
// A patient has described their symptoms. Based on these symptoms, suggest the most appropriate medical specialist they should consult.

// Patient symptoms: "${symptoms}"

// You must respond ONLY with a valid JSON object matching this exact schema. Do not include markdown wrappers, backticks, or any text outside the JSON:

// {
// "suggestedSpecialty": "string — the medical specialty e.g. Cardiologist, General Physician",
// "reason": "string — one sentence explaining why this specialty is recommended",
// "urgency": "string — one of: routine, soon, urgent",
// "urgencyNote": "string — one sentence advice about timing",
// "disclaimer": "This is an AI-generated suggestion. Always consult a qualified medical professional."
// }
    //`;
    const prompt = `You are a medical triage assistant. A patient reports: "${symptoms}"

        Respond ONLY with this exact JSON, no markdown, no backticks:
        {"suggestedSpecialty":"string","reason":"string","urgency":"routine|soon|urgent","urgencyNote":"string","disclaimer":"This is AI-generated. Always consult a real doctor."}`;


    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    let suggestion;
    try {
    const cleaned = responseText.replace(/```json|```/g, '').trim();
    suggestion = JSON.parse(cleaned);
    } catch (parseError) {
    return next(new AppError('AI returned an unexpected response format. Please try again.', 500));
    }

    res.status(200).json({
    success: true,
    suggestion,
    });
// } catch (error) {
//     // Handle Gemini API specific errors
//     if (error.message?.includes('API_KEY')) {
//     return next(new AppError('AI service configuration error', 500));
//     }
//     next(error);
// }
} catch (error) {
    //logger.error('AI suggest error', { message: error.message });
    // console.error('AI suggest error:', error.message);
    // if (error.message?.includes('API_KEY')) {
    // return next(new AppError('AI service configuration error', 500));
    // }
    // next(error);
    console.log('GEMINI EXACT ERROR:', error.message);
    console.log('GEMINI ERROR STATUS:', error.status);
    if (error.message?.includes('API_KEY') || error.message?.includes('API key')) {
        return next(new AppError('AI service configuration error', 500));
    }
    next(error);
}
};

module.exports = { suggestDoctor };