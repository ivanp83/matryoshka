import { AxiosInstance } from "axios";
import { OrderData } from "../types/types";

export const OrderApi = (instance: AxiosInstance) => ({
  async create(order: OrderData) {
    const { data } = await instance.post<OrderData>(`/orders`, order);
    return data;
  },
});
