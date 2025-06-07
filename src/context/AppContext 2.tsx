import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, InjuryData, EmergencyContact } from '../types';
import { useAuth } from './AuthContext';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

// Initial state with empty arrays
const initialState: AppState = {
  currentInjury: null,
  injuryHistory: [],
  emergencyContacts: [],
  isOffline: !navigator.onLine
};

type Action =
  | { type: 'SET_CURRENT_INJURY'; payload: InjuryData | null }
  | { type: 'ADD_INJURY'; payload: InjuryData }
  | { type: 'UPDATE_INJURY'; payload: InjuryData }
  | { type: 'ADD_CONTACT'; payload: EmergencyContact }
  | { type: 'REMOVE_CONTACT'; payload: string }
  | { type: 'SET_OFFLINE_STATUS'; payload: boolean }
  | { type: 'LOAD_STORED_DATA'; payload: Partial<AppState> }
  | { type: 'SET_INJURY_HISTORY'; payload: InjuryData[] };

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_CURRENT_INJURY':
      return {
        ...state,
        currentInjury: action.payload
      };
    case 'ADD_INJURY': {
      const newHistory = Array.isArray(state.injuryHistory) 
        ? [action.payload, ...state.injuryHistory]
        : [action.payload];
      return {
        ...state,
        injuryHistory: newHistory,
        currentInjury: action.payload
      };
    }
    case 'UPDATE_INJURY': {
      const updatedHistory = Array.isArray(state.injuryHistory)
        ? state.injuryHistory.map(injury =>
            injury.id === action.payload.id ? action.payload : injury
          )
        : [action.payload];
      return {
        ...state,
        injuryHistory: updatedHistory,
        currentInjury: state.currentInjury?.id === action.payload.id
          ? action.payload
          : state.currentInjury
      };
    }
    case 'ADD_CONTACT': {
      const newContacts = Array.isArray(state.emergencyContacts)
        ? [...state.emergencyContacts, action.payload]
        : [action.payload];
      return {
        ...state,
        emergencyContacts: newContacts
      };
    }
    case 'REMOVE_CONTACT': {
      const filteredContacts = Array.isArray(state.emergencyContacts)
        ? state.emergencyContacts.filter(contact => contact.id !== action.payload)
        : [];
      return {
        ...state,
        emergencyContacts: filteredContacts
      };
    }
    case 'SET_OFFLINE_STATUS':
      return {
        ...state,
        isOffline: action.payload
      };
    case 'LOAD_STORED_DATA':
      return {
        ...state,
        ...action.payload,
        injuryHistory: Array.isArray(action.payload.injuryHistory) 
          ? action.payload.injuryHistory 
          : [],
        emergencyContacts: Array.isArray(action.payload.emergencyContacts)
          ? action.payload.emergencyContacts
          : []
      };
    case 'SET_INJURY_HISTORY':
      return {
        ...state,
        injuryHistory: Array.isArray(action.payload) ? action.payload : []
      };
    default:
      return state;
  }
};

type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { user } = useAuth();

  // Subscribe to user's assessments in Firestore
  useEffect(() => {
    if (!user) {
      dispatch({ type: 'SET_INJURY_HISTORY', payload: [] });
      return;
    }

    const q = query(
      collection(db, 'assessments'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const assessments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as InjuryData[];

      dispatch({ type: 'SET_INJURY_HISTORY', payload: assessments });
    }, (error) => {
      console.error('Error fetching assessments:', error);
      dispatch({ type: 'SET_INJURY_HISTORY', payload: [] });
    });

    return () => unsubscribe();
  }, [user]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      dispatch({ type: 'SET_OFFLINE_STATUS', payload: !navigator.onLine });
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};