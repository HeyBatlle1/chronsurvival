import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, FileWarning, History } from 'lucide-react';
import EmergencyDisclaimer from '../components/EmergencyDisclaimer';
import ActionButton from '../components/ActionButton';
import EmergencyContacts from '../components/EmergencyContacts';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import ChironLogo from '../components/ChironLogo';

const Home: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-lg">
        <div className="flex justify-center my-8">
          <ChironLogo size={120} />
        </div>
        <EmergencyDisclaimer />
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      <div className="flex flex-col items-center mb-8">
        <ChironLogo size={160} className="mb-6" />
        
        <h1 className="text-3xl font-bold text-white text-center mb-3">
          ChironSurvival
        </h1>
        <p className="text-gray-300 text-center">
          AI-powered emergency medical guidance for wilderness survival situations
        </p>
      </div>

      <EmergencyDisclaimer />
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        <Link to="/triage/new" className="block">
          <ActionButton 
            label="New Emergency Assessment"
            onClick={() => {}}
            icon={<Camera size={20} />}
            variant="danger"
            fullWidth
          />
        </Link>
        
        <Link to="/guides" className="block">
          <ActionButton
            label="First Aid Guides"
            onClick={() => {}}
            icon={<FileWarning size={20} />}
            variant="secondary"
            fullWidth
          />
        </Link>
        
        <Link to="/history" className="block">
          <ActionButton
            label="Assessment History"
            onClick={() => {}}
            icon={<History size={20} />}
            variant="secondary"
            fullWidth
          />
        </Link>
      </div>
      
      <EmergencyContacts />
      
      <footer className="mt-8 text-center text-xs text-gray-500">
        <p>ChironSurvival v1.0</p>
        <p className="mt-1">For emergency use in wilderness survival situations only.</p>
        <p className="mt-1">Always seek professional medical help when available.</p>
      </footer>
    </div>
  );
};

export default Home;