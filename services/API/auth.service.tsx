import axios from 'axios';
import { Moment } from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Session {
  token: string;
  refreshToken: string;
  firebaseToken: string;
  accessTokenExpiresIn: string | Date | Moment;
  refreshTokenExpiresIn: string | Date | Moment;
  user: {
    _id: string;
    role: string;
    displayName: string;
  };
}

export class AuthService {
  // eslint-disable-next-line
  constructor() {}
  async login(email: string, password: string): Promise<Session> {
    try {
      const response = await axios.post('/auth/login', { email, password });
      if (response?.data?.token) {
        await AsyncStorage.setItem('@session', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async signUp(email: string, password: string, displayName?: string): Promise<Session> {
    try {
      const response = await axios.post('/auth/sign-up', { email, password, displayName });
      if (response?.data?.token) {
        await AsyncStorage.setItem('@session', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async logout(): Promise<void> {
    await AsyncStorage.setItem('@session', '{}');
  }
  async getSession(): Promise<Session> {
    const session = await AsyncStorage.getItem('@session');
    return JSON.parse(session || '{}');
  }
}

export default AuthService;
