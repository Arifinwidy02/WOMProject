import EncryptedStorage from 'react-native-encrypted-storage';
import { UserData } from '../types/auth';

const SESSION_KEY = 'user_session';

export const storeUserSession = async (userData: UserData) => {
  try {
    await EncryptedStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

export const retrieveUserSession = async (): Promise<UserData | null> => {
  try {
    const session = await EncryptedStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Error retrieving user session:', error);
    return null;
  }
};

export const clearUserSession = async () => {
  try {
    await EncryptedStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};
