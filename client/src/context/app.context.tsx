import {
  ReactNode,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useContext,
} from "react";
import { Api } from "../api";

import { useTelegram } from "../hooks/useTelegram";
import { CartItemType, ProductItem, UserType } from "../types/types";

interface AppContext {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  cartItems: CartItemType[];
  userData: any;
  setCartItems: Dispatch<SetStateAction<CartItemType[]>>;
  onUpdate: (user: any, product: ProductItem) => void;
  onIncrement: (user: any, product: ProductItem) => void;
  onDecrement: (user: any, product: ProductItem) => void;
  onRemove: (user: any, product_id: Pick<ProductItem, "id">) => void;
}

interface AppProps {
  children: ReactNode;
}

const defaultStatePage: AppContext = {
  loading: false,
  setLoading: () => {},
  cartItems: [],
  userData: {},
  setCartItems: () => {},
  onUpdate: () => {},
  onIncrement: () => {},
  onDecrement: () => {},
  onRemove: () => {},
};

const AppContext = createContext<AppContext>(defaultStatePage);

export const AppProvider = ({ children }: AppProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [userData, setUserData] = useState<UserType | {}>({});

  const { user, init_data } = useTelegram();
  useEffect(() => {
    const abortController = new AbortController();
    const user_info = {
      telegram_id: 1294200727,
      first_name: "Ivan",
      last_name: "",
      username: "eachpw",
      init_data,
    };
    const fetchUser = async () => {
      try {
        const data = await Api().customer.findOne(user_info);
        // const data = await Api().customer.findOne({
        //   telegram_id: user.id,
        //   first_name: user.first_name,
        //   username: user.username,
        //   init_data,
        // });
        localStorage.setItem("user_token", data[0].token);
        setUserData(data[0]);
        setCartItems(data[0].cart_items);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      }
    };

    fetchUser();

    return () => abortController.abort();
  }, [setCartItems]);

  const onIncrement = async (user: any, product: ProductItem) => {
    try {
      setLoading(true);
      const exist = cartItems.find((prod) => prod.id === product.id);

      if (!exist) {
        return;
      } else {
        const item = cartItems.map((prod) =>
          prod.id === product.id
            ? { ...exist, quantity: exist.quantity + 1 }
            : prod
        );
        const data = await Api().cart.update(user, item);

        setCartItems(data);
      }
    } catch (error) {
      throw Error("Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };
  const onDecrement = async (user: any, product: ProductItem) => {
    try {
      setLoading(true);
      const exist = cartItems.find((prod) => prod.id === product.id);

      let data;
      if (!exist) {
        return;
      } else if (exist?.quantity === 1) {
        const item = cartItems.filter((prod) => prod.id !== product.id);
        data = await Api().cart.update(user, item);
      } else {
        const item = cartItems.map((prod) =>
          prod.id === product.id
            ? { ...exist, quantity: exist.quantity - 1 }
            : prod
        );
        data = await Api().cart.update(user, item);
      }
      setCartItems(data);
    } catch (error) {
      throw Error("Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (user: any, product: ProductItem) => {
    try {
      setLoading(true);
      const exist = cartItems.find((prod) => prod.id === product.id);

      if (!!exist) {
        const item = cartItems.map((prod) =>
          prod.id === product.id
            ? { ...exist, quantity: exist.quantity + 1 }
            : prod
        );
        const data = await Api().cart.update(user, item);

        setCartItems(data);
      } else {
        const data = await Api().cart.update(user, [
          ...cartItems,
          { ...product, quantity: 1 },
        ]);

        setCartItems(data);
      }
    } catch (error) {
      throw Error("Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const onRemove = async (user: any, product_id: Pick<ProductItem, "id">) => {
    const data = await Api().cart.delete(user, product_id);
    setCartItems(data);
  };
  const value = {
    loading,
    setLoading,
    cartItems,
    userData,
    setCartItems,
    onUpdate,
    onIncrement,
    onDecrement,
    onRemove,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
