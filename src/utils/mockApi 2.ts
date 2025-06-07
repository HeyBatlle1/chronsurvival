import { TraumaAssessmentRequest, TraumaAssessmentResponse } from '../types';

// Mock response for testing without actual API calls
export const mockAssessmentApi = async (request: TraumaAssessmentRequest): Promise<TraumaAssessmentResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Test case: 28-year-old male, mountain bike crash
  return {
    severity_level: 'serious',
    immediate_actions: [
      'Assess for signs of internal injury',
      'Check breathing pattern',
      'Monitor for signs of shock',
      'Keep patient warm and still'
    ],
    assessment_steps: [
      'Examine ribs for tenderness and deformity',
      'Monitor breathing rate and depth',
      'Check for chest wall movement',
      'Assess level of consciousness',
      'Look for bruising or other injuries'
    ],
    red_flags: [
      'Difficulty breathing or shortness of breath',
      'Severe pain with breathing',
      'Coughing up blood',
      'Signs of shock (pale, clammy skin, rapid pulse)'
    ],
    next_steps: [
      'Continue monitoring vital signs',
      'Help patient find comfortable position',
      'Plan evacuation if symptoms worsen',
      'Document any changes in condition'
    ]
  };
};