import React, { createContext, useEffect, useState } from 'react';
import {
  storeUserSession,
  retrieveUserSession,
  clearUserSession,
} from '../services/storage';
import { AuthContextType, UserData, userLoginData } from '../types/auth';
import { useQueryClient } from '@tanstack/react-query';

// Dari undefined menjadi object cast
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const signIn = async (userData: userLoginData) => {
    try {
      if (
        userData?.email === 'womtest@mail.com' &&
        userData?.password === 'womtest'
      ) {
        const mockToken = 'JWT_DUMMY_TOKEN_' + Math.random().toString(36);
        setIsLoading(true);
        const sessionToStore: UserData = {
          email: userData.email,
          token: mockToken,
          loginTime: Date.now(),
        };

        await storeUserSession(sessionToStore);
        setUserEmail(userData.email);
        setUserToken(mockToken);
        return { success: true };
      } else {
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      return { success: false, message: 'An error occurred during sign-in' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await clearUserSession();
      setUserToken(null);
      setUserEmail(null);
      queryClient.clear();
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setUserToken(null);
      setUserEmail(null);
    }
  };

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const session: UserData | null = await retrieveUserSession();

        if (session) {
          const isExpired = Date.now() - session.loginTime > 360000; // 1 hour in milliseconds

          if (!isExpired) {
            setUserToken(session.token);
            setUserEmail(session.email);
          } else {
            await clearUserSession();
          }
        }
      } catch (error) {
        console.error('Failed to load session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);
  return (
    <AuthContext.Provider
      value={{ logout, signIn, userEmail, userToken, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
