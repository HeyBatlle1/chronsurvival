import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a minimal placeholder User type or use a generic object/null
export interface User {
  uid: string;
  email?: string | null;
  displayName?: string | null; // Added displayName
  // Add other properties if your app uses them directly from the User object elsewhere
}

interface AuthContextType {
  user: User | null; 
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: false });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({ // Ensure type matches User or null
    uid: 'anonymous-user',
    email: 'test@example.com',
    displayName: 'Test User'
  });
  const [loading, setLoading] = useState(false); // Set to false so it doesn't show loading

  // The useEffect for onAuthStateChanged is removed as it's Firebase-specific.

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
