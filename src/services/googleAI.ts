import { GoogleGenerativeAI } from '@google/generative-ai';
import { TraumaAssessmentRequest, TraumaAssessmentResponse } from '../types';

// Use environment variable or fallback to a placeholder
// This will be replaced with the actual API key in production
const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY || 'mock-key-for-development';
const MODEL_NAME = 'gemini-pro';

// Initialize the API client conditionally
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

try {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({ model: MODEL_NAME });
} catch (error) {
  console.error('Failed to initialize Google AI:', error);
}

const SYSTEM_PROMPT = `You are an emergency medical AI assistant. Analyze the provided injury information and provide structured guidance.
Focus on immediate survival actions and assessment steps. Be clear and concise.
Format your response as a JSON object with these fields:
- severity_level: "critical" | "serious" | "moderate" | "minor"
- immediate_actions: string[] of urgent steps
- assessment_steps: string[] of evaluation steps
- red_flags: string[] of warning signs
- next_steps: string[] of follow-up actions`;

const CHAT_PROMPT = `You are an emergency medical AI assistant providing guidance in a wilderness survival situation. 
Keep responses clear, direct, and focused on practical actions.
Consider the full context of the injury and previous assessment when answering.
If you're unsure about anything, err on the side of caution and recommend seeking professional medical care when available.`;

export async function getTraumaAssessment(request: TraumaAssessmentRequest): Promise<TraumaAssessmentResponse> {
  try {
    // Check if API is properly initialized
    if (!genAI || !model) {
      console.warn('Google AI not initialized, using mock response');
      return getMockResponse();
    }

    const prompt = `
Patient Information:
- Age: ${request.age || 'Unknown'}
- Gender: ${request.gender || 'Not specified'}
- Conscious: ${request.conscious ? 'Yes' : 'No'}
- Mechanism of Injury: ${request.mechanismOfInjury}
- Reported Symptoms: ${request.reportedSymptoms.join(', ')}
- Obvious Bleeding: ${request.obviousBleeding ? 'Yes' : 'No'}

Provide emergency medical guidance for this situation.`;

    const result = await model.generateContent([SYSTEM_PROMPT, prompt]);
    const response = result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.warn('Invalid AI response format, using mock response');
      return getMockResponse();
    }
    
    try {
      const parsedResponse = JSON.parse(jsonMatch[0]) as TraumaAssessmentResponse;
      
      if (!parsedResponse.severity_level || !parsedResponse.immediate_actions) {
        console.warn('Incomplete AI response, using mock response');
        return getMockResponse();
      }
      
      return parsedResponse;
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return getMockResponse();
    }
  } catch (error) {
    console.error('AI Assessment Error:', error);
    return getMockResponse();
  }
}

export async function getChatResponse(injuryContext: string, userMessage: string): Promise<string> {
  try {
    // Check if API is properly initialized
    if (!genAI || !model) {
      console.warn('Google AI not initialized, using mock response');
      return "I'm currently operating in offline mode. Based on the information provided, I recommend following the assessment steps and immediate actions listed above. If this is an emergency, focus on those critical steps first.";
    }

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [`Context: ${injuryContext}`],
        },
        {
          role: 'assistant',
          parts: [CHAT_PROMPT],
        },
      ],
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Chat response error:', error);
    return "I apologize, but I'm having trouble processing your question. Please try rephrasing it, or if this is an emergency, focus on the critical care steps provided above.";
  }
}

// Mock response for when API is unavailable
function getMockResponse(): TraumaAssessmentResponse {
  return {
    severity_level: 'serious',
    immediate_actions: [
      'Assess for signs of internal injury',
      'Check breathing pattern',
      'Monitor for signs of shock',
      'Keep patient warm and still'
    ],
    assessment_steps: [
      'Examine affected area for tenderness and deformity',
      'Monitor vital signs (breathing rate, pulse)',
      'Check for additional injuries',
      'Assess level of consciousness',
      'Look for bruising or other visible signs'
    ],
    red_flags: [
      'Difficulty breathing or shortness of breath',
      'Severe pain that increases over time',
      'Changes in level of consciousness',
      'Signs of shock (pale, clammy skin, rapid pulse)'
    ],
    next_steps: [
      'Continue monitoring vital signs',
      'Help patient find comfortable position',
      'Plan evacuation if symptoms worsen',
      'Document any changes in condition'
    ]
  };
}