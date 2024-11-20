import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'parent' | 'provider' | 'admin';
  profile?: {
    name: string;
    phone?: string;
    avatar?: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      // For demo, create a mock user based on stored role or default to parent
      const storedRole = localStorage.getItem('lastRole') || 'parent';
      const mockUser = {
        id: 'mock-user-id',
        email,
        role: storedRole as 'parent' | 'provider',
        profile: {
          name: email.split('@')[0], // Use email username as display name
        }
      };
      
      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, role: string) => {
    try {
      setLoading(true);
      // For demo, create a mock user
      const mockUser = {
        id: 'mock-user-id',
        email,
        role: role as 'parent' | 'provider',
        profile: {
          name: email.split('@')[0], // Use email username as display name
        }
      };
      
      // Store user and role in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('lastRole', role);
      setUser(mockUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    // Clear user from localStorage and state
    localStorage.removeItem('user');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    // Mock password reset for demo
    console.log('Password reset requested for:', email);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 