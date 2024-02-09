import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const axiosInstance = axios.create({ baseURL: API_URL });

export * as ProductsAPI from './products';
