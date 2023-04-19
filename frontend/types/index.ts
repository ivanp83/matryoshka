export type Category = {
  id: number;
  image: string;
  image_big: string;
  name: string;
  price: number;
};
export type ProductItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  small: string | ArrayBuffer | null;
  big: string | ArrayBuffer | null;
  category_id: number;
};

export type OrderData = {
  products: CartItemType[];
  userId?: number;
};
export type InputType = {
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  errorMessage?: string;
  label: string;
  pattern?: string;
  required?: boolean;
};
export type ShippingType = {
  first_name: string;
  last_name: string;
  phone: string;
  zip: string;
  city: string;
  address: string;
};

export type OrderCreateResponeType = {
  status: "pending" | "error";
  returnUrl: string;
  confirmationUrl: string;
};
export type OrderResponeType = {
  id: number;
  order_status: "pending" | "error" | "succeeded";
  shipping_address: string;
  order_items: string;
  yookassa_id: string;
  amount: string;
  currency: string;
  customer_id: number;
};
export type CartItemType = ProductItem & { quantity: number };
