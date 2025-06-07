import { TraumaAssessmentRequest, TraumaAssessmentResponse } from '../types';

const MCP_SERVER_URL = 'http://localhost:8002';

export interface InjuryRecord {
  id?: number;
  userId: string;
  mechanismOfInjury: string;
  reportedSymptoms: string[];
  severityLevel: string;
  conscious: boolean;
  age?: number;
  gender?: string;
  obviousBleeding?: boolean;
  assessmentResult: TraumaAssessmentResponse;
  createdAt?: string;
}

export async function saveInjuryRecord(injury: InjuryRecord): Promise<InjuryRecord> {
  try {
    const response = await fetch(`${MCP_SERVER_URL}/api/injuries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(injury)
    });
    
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to save injury record');
  } catch (error) {
    console.warn('Database unavailable, using local storage fallback');
    throw error;
  }
}

export async function getInjuryHistory(userId: string): Promise<InjuryRecord[]> {
  try {
    const response = await fetch(`${MCP_SERVER_URL}/api/injuries/${userId}`);
    
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Failed to get injury history');
  } catch (error) {
    console.warn('Database unavailable');
    return [];
  }
}
