import { AxiosInstance } from "axios";
import { CartItemType, ProductItem } from "../types/types";

export const CartApi = (instance: AxiosInstance) => ({
  async update(customer: any, products: CartItemType[]) {
    const { data } = await instance.put<Array<{ cart_items: CartItemType[] }>>(
      `/carts`,
      {
        customer,
        products,
      }
    );

    return data[0].cart_items;
  },
  async delete(customer_id: number, product_id: Pick<ProductItem, "id">) {
    const { data } = await instance.delete<
      Array<{ cart_items: CartItemType[] }>
    >(`/carts`, {
      data: { customer_id, product_id },
    });

    return data[0].cart_items;
  },
});
