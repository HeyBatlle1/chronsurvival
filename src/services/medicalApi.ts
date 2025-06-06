import { TraumaAssessmentRequest, TraumaAssessmentResponse } from '../types';
import { getTraumaAssessment as getGoogleAIAssessment } from './googleAI';

export async function getTraumaAssessment(request: TraumaAssessmentRequest): Promise<TraumaAssessmentResponse> {
  return getGoogleAIAssessment(request);
}