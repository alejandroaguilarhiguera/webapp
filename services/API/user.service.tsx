import axios from 'axios';
import oneSlash from '../../utils/oneSlash';
import { User } from '../../types';
import config from '../../config';

const { API_URL } = config;

export class UserService {
  // eslint-disable-next-line
  constructor() {}
  async getAll(): Promise<User[]> {
    try {
      const response = await axios.get(oneSlash('api/users'));
      return response.data;
    } catch (error) {
      console.log('ERROR !!', JSON.stringify(error));
      return error;
    }
  }
  async show(id: number): Promise<User> {
    try {
      const response = await axios.get(oneSlash(`${API_URL}/users/${id}`));
      return response.data;
    } catch (error) {
      console.log('ERROR !!', JSON.stringify(error));
      return error;
    }
  }
}

export default UserService;
