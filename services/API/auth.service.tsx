import axios from 'axios';
import { Moment } from 'moment';

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
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default AuthService;
