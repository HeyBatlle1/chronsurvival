import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { AlertCircle, Share2, Download, Clock, Phone, ArrowRight, MapPin } from 'lucide-react';
import TriageCard from '../components/TriageCard';
import ActionButton from '../components/ActionButton';
import ChatInterface from '../components/ChatInterface';
import { getChatResponse } from '../services/googleAI';

const TriageResult: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useAppContext();
  const navigate = useNavigate();
  const [injury, setInjury] = useState(state.currentInjury);
  const [showEmergencyCall, setShowEmergencyCall] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundInjury = state.injuryHistory.find(item => item.id === id);
      if (foundInjury) {
        setInjury(foundInjury);
      } else {
        navigate('/');
      }
    }
  }, [id, state.injuryHistory, navigate]);

  const handleEmergencyCall = () => {
    setShowEmergencyCall(!showEmergencyCall);
  };

  const handleContinueAssessment = () => {
    navigate('/triage/new');
  };

  const handleChatMessage = async (message: string) => {
    try {
      setChatError(null);
      // Create context from injury data
      const context = `
        Patient Situation:
        ${injury?.description || ''}
        
        Current Assessment:
        - Severity: ${injury?.severity_level || 'Unknown'}
        - Immediate Actions Required: ${injury?.immediate_actions?.join(', ') || 'None specified'}
        - Warning Signs: ${injury?.red_flags?.join(', ') || 'None specified'}
        
        Question: ${message}
      `;

      return await getChatResponse(context, message);
    } catch (error) {
      console.error('Chat error:', error);
      setChatError(error instanceof Error ? error.message : 'Failed to get AI response');
      throw error;
    }
  };

  if (!injury) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-lg">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
          <AlertCircle className="text-yellow-500 mx-auto mb-3\" size={48} />
          <h2 className="text-xl font-bold text-white mb-2">Assessment Not Found</h2>
          <p className="text-gray-300 mb-4">The requested assessment could not be found.</p>
          <ActionButton
            label="Go Back Home"
            onClick={() => navigate('/')}
            variant="secondary"
            fullWidth
          />
        </div>
      </div>
    );
  }

  const formattedDate = new Date(injury.timestamp).toLocaleString();

  const getSeverityVariant = (severity: string): 'low' | 'medium' | 'high' | 'critical' => {
    switch (severity) {
      case 'critical':
        return 'critical';
      case 'serious':
        return 'high';
      case 'moderate':
        return 'medium';
      case 'minor':
        return 'low';
      default:
        return 'medium';
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-white">Assessment Results</h2>
          <div className="flex items-center text-xs text-gray-400">
            <Clock size={14} className="mr-1" />
            {formattedDate}
          </div>
        </div>

        <div className="mb-4">
          <img
            src={injury.photoUrl}
            alt="Injury"
            className="w-full h-48 object-cover rounded-lg border border-gray-700"
          />
        </div>

        {injury.description && (
          <div className="mb-4 bg-gray-700 p-3 rounded">
            <h3 className="text-sm font-medium text-gray-300 mb-1">Patient Description:</h3>
            <p className="text-white">{injury.description}</p>
          </div>
        )}
        
        {injury.location && (
          <div className="flex items-center text-sm text-gray-300">
            <MapPin size={14} className="text-gray-400 mr-1" />
            <span>Location recorded for emergency services</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Medical Guidance:</h3>
          
          <span className={`text-xs font-bold px-2 py-1 rounded ${
            injury.severity_level === 'critical' ? 'bg-red-900 text-red-300' :
            injury.severity_level === 'serious' ? 'bg-orange-900 text-orange-300' :
            injury.severity_level === 'moderate' ? 'bg-yellow-900 text-yellow-300' :
            'bg-blue-900 text-blue-300'
          }`}>
            {injury.severity_level?.toUpperCase() || 'PENDING'}
          </span>
        </div>

        {injury.immediate_actions && (
          <TriageCard
            title="Immediate Actions Required"
            content={injury.immediate_actions.join('\n')}
            severity={getSeverityVariant(injury.severity_level || '')}
          />
        )}

        {injury.assessment_steps && (
          <TriageCard
            title="Assessment Steps"
            content={injury.assessment_steps.join('\n')}
            severity="medium"
          />
        )}

        {injury.red_flags && injury.red_flags.length > 0 && (
          <TriageCard
            title="Warning Signs"
            content={injury.red_flags.join('\n')}
            severity="critical"
          />
        )}

        {injury.next_steps && (
          <TriageCard
            title="Next Steps"
            content={injury.next_steps.join('\n')}
            severity="low"
          />
        )}

        <div className="mt-6 mb-6">
          <ChatInterface
            injuryContext={injury.description || ''}
            onSendMessage={handleChatMessage}
          />
          {chatError && (
            <div className="mt-2 bg-red-900/30 border border-red-800 rounded-lg p-3 text-red-300 text-sm">
              {chatError}
            </div>
          )}
        </div>

        {showEmergencyCall && (
          <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-bold text-white mb-2">Emergency Services</h3>
            <p className="text-gray-300 text-sm mb-3">
              If available, call emergency services immediately:
            </p>
            <div className="grid grid-cols-1 gap-2">
              <a 
                href="tel:911" 
                className="bg-red-700 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center"
              >
                <Phone className="mr-2" size={18} />
                Call 911 (US)
              </a>
              <a 
                href="tel:112" 
                className="bg-red-700 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center"
              >
                <Phone className="mr-2" size={18} />
                Call 112 (EU)
              </a>
              <a 
                href="tel:999" 
                className="bg-red-700 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-bold flex items-center justify-center"
              >
                <Phone className="mr-2" size={18} />
                Call 999 (UK)
              </a>
            </div>
            {state.emergencyContacts.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-white mb-2">Your Emergency Contacts:</h4>
                <div className="space-y-2">
                  {state.emergencyContacts.map(contact => (
                    <a 
                      key={contact.id} 
                      href={`tel:${contact.phone}`}
                      className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded-lg font-medium flex items-center justify-between text-sm"
                    >
                      <span>{contact.name}</span>
                      <Phone size={14} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col space-y-3 mt-4">
          <ActionButton
            label="Emergency Services"
            onClick={handleEmergencyCall}
            icon={<Phone size={18} />}
            variant="danger"
            fullWidth
          />
          
          <div className="flex space-x-3">
            <ActionButton
              label="Share"
              onClick={() => {/* Implement sharing */}}
              icon={<Share2 size={18} />}
              variant="secondary"
              fullWidth
            />
            <ActionButton
              label="Save Offline"
              onClick={() => {/* Implement download */}}
              icon={<Download size={18} />}
              variant="secondary"
              fullWidth
            />
          </div>
          
          <ActionButton
            label="Continue Assessment"
            onClick={handleContinueAssessment}
            icon={<ArrowRight size={18} />}
            variant="primary"
            fullWidth
          />
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4">
        <p className="text-center text-xs text-gray-500 mb-2">
          REMINDER: This is not professional medical advice.
        </p>
        <p className="text-center text-xs text-red-500 font-bold">
          Seek professional medical help as soon as possible.
        </p>
      </div>
    </div>
  );
};

export default TriageResult;