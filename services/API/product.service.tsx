import axios from 'axios';
import { Product, ProductInstance } from '../../types';

const baseUrl = '/products';

export class ProductService {
  // eslint-disable-next-line
  constructor() {}
  async getAll(): Promise<Product[]> {
    try {
      const response = await axios.get(baseUrl);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async show(id: number): Promise<Product> {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
  async add(product: ProductInstance): Promise<Product> {
    try {
      const response = await axios.post(`${baseUrl}`, product);
      return response.data.product;
    } catch (error) {
      return error;
    }
  }
  async edit(product: Product): Promise<Product> {
    try {
      const response = await axios.patch(`${baseUrl}/${product._id}`, product);
      return response.data.product;
    } catch (error) {
      return error;
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      return true;
    } catch (error) {
      return error;
    }
  }
}

export default ProductService;
