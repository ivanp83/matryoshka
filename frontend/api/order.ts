import { OrderResponeType } from "@/types";
import { AxiosInstance } from "axios";

export const OrderApi = (instance: AxiosInstance) => ({
  async find(id: number) {
    const { data } = await instance.get<OrderResponeType[]>(`/orders/${id}`);
    return data;
  },
});
