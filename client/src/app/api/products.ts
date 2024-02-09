import { axiosInstance } from '.';

export const getProducts = () => {
  return axiosInstance.get('products').then((res) => res.data);
};
