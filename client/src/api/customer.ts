import { AxiosInstance } from "axios";
import { CustomerType, OrderData } from "../types/types";

export const CustomerApi = (instance: AxiosInstance) => ({
  async findOne(customer: CustomerType) {
    const { data } = await instance.post(`/customers`, customer);

    return data;
  },
  async create(order: OrderData) {
    const { data } = await instance.post<OrderData>(`/`, order);

    return data;
  },
});
