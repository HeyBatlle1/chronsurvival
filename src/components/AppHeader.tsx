import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, AlertTriangle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../config/firebase';
import ChironLogo from './ChironLogo';

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isHome = location.pathname === '/';

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-gray-900 border-b border-red-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          {!isHome && (
            <button 
              onClick={() => navigate(-1)} 
              className="mr-2 text-gray-400 hover:text-white"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          
          <div className="flex items-center" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <ChironLogo size={42} className="mr-3" />
            <h1 className="text-xl font-bold text-white font-inter tracking-tight">
              ChironSurvival
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-red-900/30 px-2 py-1 rounded-md">
            <AlertTriangle size={16} className="text-red-500 mr-1 inline-block" />
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider font-inter">
              Emergency Use Only
            </span>
          </div>

          {user && (
            <button
              onClick={handleSignOut}
              className="text-gray-400 hover:text-white"
              title="Sign Out"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;