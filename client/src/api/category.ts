import { AxiosInstance } from "axios";
import { CategoryItem, UpdateCategoryItem } from "../types/types";

export const CategoryApi = (instance: AxiosInstance) => ({
  async getAll() {
    const { data } = await instance.get<CategoryItem[]>("/categories");
    return data;
  },

  async getOne(id: number) {
    const { data } = await instance.get<CategoryItem[]>(`/categories/${id}`);

    return data;
  },
  async getOneWithProducts(id: number) {
    const { data } = await instance.get<CategoryItem>(
      `/category-with-products/${id}`
    );

    return data;
  },
  async create(category: Partial<CategoryItem>) {
    const { data } = await instance.post<CategoryItem>(`/categories`, category);
    return data;
  },
  async update(payload: UpdateCategoryItem) {
    const { data } = await instance.put<CategoryItem>(`/categories`, payload);
    return data;
  },

  async delete(id: number) {
    const { data } = await instance.delete(`/categories/${id}`);
    return data;
  },
});
