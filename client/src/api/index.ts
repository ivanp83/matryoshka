import axios from "axios";
import { CustomerApi } from "./customer";
import { OrderApi } from "./order";
import { PagetApi } from "./pages";
import { CartApi } from "./cart";
import { ProductApi } from "./product";
import { CategoryApi } from "./category";

export type ApiReturnType = {
  customer: ReturnType<typeof CustomerApi>;
  product: ReturnType<typeof ProductApi>;
  category: ReturnType<typeof CategoryApi>;
  page: ReturnType<typeof PagetApi>;
  cart: ReturnType<typeof CartApi>;
  order: ReturnType<typeof OrderApi>;
};

export const Api = (): ApiReturnType => {
  const user = localStorage.getItem("user_token");

  const instance = axios.create({
    baseURL: import.meta.env.CLIENT_BACKEND_BASE_URL,
    timeout: 80000,
    withCredentials: false,

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user,
    },
    // transformRequest: [(data) => JSON.stringify(data.data)],
  });

  const apis = {
    customer: CustomerApi,
    product: ProductApi,
    category: CategoryApi,
    page: PagetApi,
    cart: CartApi,
    order: OrderApi,
  };

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);

  return result;
};
