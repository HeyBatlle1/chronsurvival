import { TraumaAssessmentRequest, TraumaAssessmentResponse } from '../types';
import { getTraumaAssessment as getGoogleAIAssessment } from './googleAI';

const MCP_SERVER_URL = 'http://localhost:8002';

export async function getTraumaAssessment(request: TraumaAssessmentRequest): Promise<TraumaAssessmentResponse> {
  try {
    // Try MCP server first (specialized medical AI with Army Ranger protocols)
    const response = await fetch(`${MCP_SERVER_URL}/api/medical/trauma-assessment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });
    
    if (response.ok) {
      const mcpResponse = await response.json();
      console.log('MCP server response received:', mcpResponse);
      return mcpResponse;
    } else {
      console.warn('MCP server returned error:', response.status);
      throw new Error('MCP server unavailable');
    }
  } catch (error) {
    console.warn('MCP server unavailable, falling back to Gemini:', error);
    // Fallback to Gemini if MCP fails
    return getGoogleAIAssessment(request);
  }
}
