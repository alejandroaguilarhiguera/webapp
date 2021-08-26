import axios from 'axios';
import { User } from '../../types';
import {
  API_GET_ALL_USERS,
  API_SHOW_USER,
} from '../../config';

export class UserService {
  // eslint-disable-next-line
  constructor() {}
  async getAll(): Promise<User[]> {
    try {
      const response = await axios.get(API_GET_ALL_USERS);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async show(id: string): Promise<User> {
    try {
      const response = await axios.get(API_SHOW_USER.replace(':id', id));
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
