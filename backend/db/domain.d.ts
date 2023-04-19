interface Customer {
  telegramId: number;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
  createdAt: string;
  customerId?: string;
}

interface Cart {
  customerId: string;
  cartItems: string;
  createdAt: string;
  cartId?: string;
}

interface Image {
  small: string;
  big: string;
  productId: number;
  categoryId: number;
  createdAt: string;
  imageId?: string;
}

interface Category {
  name: string;
  description: string;
  imageId: string;
  createdAt: string;
  categoryId?: string;
}

interface Product {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageId: string[];
  createdAt: string;
  productId?: string;
}
