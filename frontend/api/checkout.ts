import { OrderCreateResponeType, OrderData } from "@/types";
import { AxiosInstance } from "axios";

export const CheckoutApi = (instance: AxiosInstance) => ({
  async create(order: any) {
    const data = await instance.post<
      OrderData,
      { data: OrderCreateResponeType }
    >(`/checkout `, order);
    return data;
  },
});
