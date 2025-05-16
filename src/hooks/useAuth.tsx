
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const { toast } = useToast();

  const isAuthenticated = !!user;

  const hasPermission = (roles: UserRole[]) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple mock authentication
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser && password === 'password') { // simplified for demo
          setUser(foundUser);
          localStorage.setItem('user', JSON.stringify(foundUser));
          toast({
            title: "Login Successful",
            description: `Welcome back, ${foundUser.name}!`,
          });
          resolve();
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password.",
            variant: "destructive",
          });
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
