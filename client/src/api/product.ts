import { AxiosInstance } from "axios";
import {
  ProductItem,
  ProductItemCreate,
  UpdateProductItem,
} from "../types/types";

export const ProductApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<ProductItem[]>(`/products`);
    return data;
  },

  async getOne(id: number) {
    const { data } = await instance.get<ProductItem[]>(`/products/${id}`);

    return data[0];
  },

  async create(payload: ProductItemCreate) {
    const { data } = await instance.post<{ status: number }>(
      `/products`,
      payload
    );
    return data;
  },
  async update(payload: UpdateProductItem) {
    const { data } = await instance.put<ProductItem>(`/products`, payload);
    return data;
  },
  async delete(id: number) {
    const { data } = await instance.delete(`/products/${id}`);
    return data;
  },
});
