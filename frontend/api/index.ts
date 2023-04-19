import axios from "axios";
import { CheckoutApi } from "./checkout";
import { OrderApi } from "./order";

export type ApiReturnType = {
  order: ReturnType<typeof OrderApi>;
  checkout: ReturnType<typeof CheckoutApi>;
};

export const Api = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    timeout: 10000,
    withCredentials: false,

    headers: {
      "Content-Type": "application/json",
      // Authorization: "Bearer localClient",
    },
  });

  const apis = {
    order: OrderApi,
    checkout: CheckoutApi,
  };

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);

  return result;
};
