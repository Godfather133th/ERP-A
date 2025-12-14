import { GoogleGenAI } from "@google/genai";

// Safely access process.env to prevent crashes in browsers where it might be undefined
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateSmartResponse = async (
  prompt: string, 
  context: string,
  language: 'ar' | 'en'
): Promise<string> => {
  if (!ai || !apiKey) {
    return language === 'ar' 
      ? "عذراً، مفتاح API غير متوفر. يرجى تكوين النظام." 
      : "Sorry, API key is missing. Please configure the system.";
  }

  try {
    const systemInstruction = `
      You are an expert government ERP assistant for the Iraqi National Data Center.
      Your goal is to assist ministry employees with drafting official letters (الكتب الرسمية), analyzing financial data, and summarizing reports.
      
      Current Context: ${context}
      Response Language: ${language === 'ar' ? 'Arabic (Formal, Governmental)' : 'English (Formal)'}.
      
      If drafting a letter, follow standard Iraqi government correspondence protocols (Ministry header, Date, Subject, Greeting, Body, Signature).
      Be precise, formal, and respectful.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Low temperature for more deterministic/formal output
      }
    });

    return response.text || (language === 'ar' ? "لم يتم استلام رد." : "No response received.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'ar' 
      ? "حدث خطأ أثناء الاتصال بالمساعد الذكي." 
      : "An error occurred while contacting the AI assistant.";
  }
};