import axios from 'axios';
import { User } from '../../types';

export class UserService {
  // eslint-disable-next-line
  constructor() {}
  async getAll(): Promise<User[]> {
    try {
      const response = await axios.get('/users');
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async show(id: number): Promise<User> {
    try {
      const response = await axios.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default UserService;
