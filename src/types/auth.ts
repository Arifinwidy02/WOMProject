export interface UserData {
  token: string;
  email: string;
  loginTime: number;
}

// JANGAN gunakan extends UserData agar tidak wajib mengisi token saat login
export interface userLoginData {
  email: string;
  password?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface AuthContextType {
  userToken: string | null;
  userEmail: string | null;
  isLoading: boolean;
  signIn: (userData: userLoginData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}
