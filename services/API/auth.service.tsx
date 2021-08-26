import axios from 'axios';
import { Moment } from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  API_AUTH_LOGIN,
  API_AUTH_SIGN_UP,
  API_AUTH_RECOVERY_PASSWORD,
  API_AUTH_RENEW_PASSWORD,
  API_AUTH_LOGIN_PROVIDER_CODE,
  API_AUTH_CONFIRM_EMAIL,
  API_AUTH_SEND_CODE_PHONE,
  API_AUTH_CONFIRM_PHONE,
  SESSION_LOCAL_STORAGE,
} from '../../config';

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

export interface NewUser {
  email?: string;
  phoneNumber?: string;
  password?: string;
  displayName?: string;
  captcha?: string;
}

export interface ResponseVerificationPhone {
  verificationId: string;
  message: string;
}

export class AuthService {
  // eslint-disable-next-line
  constructor() {}
  async login(email: string, password: string): Promise<Session> {
    try {
      const response = await axios.post(API_AUTH_LOGIN, { email, password });
      if (response?.data?.token) {
        await AsyncStorage.setItem(SESSION_LOCAL_STORAGE, JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async signUp(user: NewUser): Promise<Session | ResponseVerificationPhone> {
    try {
      const response = await axios.post(API_AUTH_SIGN_UP, user);
      if (response?.data?.token) {
        await AsyncStorage.setItem(SESSION_LOCAL_STORAGE, JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async recoveryPassword(email: string): Promise<{ message: string }> {
    try {
      return axios.post(API_AUTH_RECOVERY_PASSWORD.replace(':email', email));
    } catch (error) {
      return error;
    }
  }
  async renewPassword(
    hash: string,
    password: string,
  ): Promise<Session> {
    try {
      const response = await axios.post(API_AUTH_RENEW_PASSWORD, {
        hash,
        password,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async confirmEmail(
    hash: string,
  ): Promise<Session> {
    try {
      const response = await axios.post(API_AUTH_CONFIRM_EMAIL, { hash });
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async sendCodePhone(
    phoneNumber: string,
    captcha: string,
  ): Promise<ResponseVerificationPhone> {
    try {
      const response = await axios.post(
        API_AUTH_SEND_CODE_PHONE.replace(':phoneNumber', phoneNumber),
        { captcha },
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async confirmPhone(verificationId:string, code: string): Promise<Session> {
    try {
      const response = await axios.post(API_AUTH_CONFIRM_PHONE, { verificationId, code });
      if (response?.data?.token) {
        await AsyncStorage.setItem(SESSION_LOCAL_STORAGE, JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async oauth(provider: string, code: string): Promise<Session> {
    try {
      const response = await axios.get(
        API_AUTH_LOGIN_PROVIDER_CODE.replace(':provider', provider).replace(':code', code),
      );
      if (response?.data.token) {
        await AsyncStorage.setItem(SESSION_LOCAL_STORAGE, JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async logout(): Promise<void> {
    await AsyncStorage.setItem(SESSION_LOCAL_STORAGE, '{}');
  }
  async getSession(): Promise<Session> {
    const session = await AsyncStorage.getItem(SESSION_LOCAL_STORAGE);
    return JSON.parse(session || '{}');
  }
}

export default AuthService;
