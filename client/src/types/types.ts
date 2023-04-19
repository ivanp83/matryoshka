export type CustomerType = {
  telegram_id: number;
  first_name: string;
  username: string;
  init_data: any;
};
export type UserType = {
  id: number;
  telegram_id: number;
  username: string;
  first_name: string;
  created_at: string;
  token: string;
  last_name: string | null;
  customer_id: number;
  cart_items: CartItemType[];
};
export type CategoryItem = {
  id: number;
  name: string;
  description: string;
  image: string | ArrayBuffer | null;
};
export type UpdateCategoryItem = {
  id: number;
  name: string;
  description: string;
  base64Data: string | ArrayBuffer | null;
};
export type ProductItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  small: string | ArrayBuffer | null;
  big: string | ArrayBuffer | null;
  category_id: string;
};
export type ProductItemCreate = {
  name: string;
  price: string;
  description: string;
  image: string | ArrayBuffer | null;
  category: number;
};
export type UpdateProductItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  category_id: number;
  base64Data?: string | ArrayBuffer | null;
};
export type PageItem = {
  name: string;
  data: string[];
  small: string;
  big: string;
};
export type OrderData = {
  products: CartItemType[];
  userId?: number;
};
export type ResolvedProductResponse = {
  product: ProductItem;
};
export type ResolvedCategoriesResponse = {
  categories: Array<CategoryItem>;
};
export type ResolvedCategoryResponse = {
  category: CategoryItem;
};
export type ResolvedProductsResponse = {
  products: ProductItem[];
};

export type CartItemType = ProductItem & { quantity: number };
