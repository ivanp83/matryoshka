import { FC } from "react";
import "./Cart.scss";
import Button from "../../components/button/Button";

import { useTelegram } from "../../hooks/useTelegram";
import { useAppContext } from "../../context/app.context";
import { currencyFormat } from "../../utils/helpers";
import { CartItemType, ProductItem } from "../../types/types";

interface CartItemProps {
  product: CartItemType;
}

const CartItem: FC<CartItemProps> = ({ product }) => {
  const { user } = useTelegram();
  const { onIncrement, onDecrement, cartItems } = useAppContext();
  const count = cartItems.find((prod) => prod.id === product.id);

  const handleIncrement = (product: ProductItem) => {
    onIncrement(user.id, product);
  };
  const handleDecrement = (product: ProductItem) => {
    onDecrement(user.id, product);
  };
  return (
    <li className={"item"}>
      <picture>
        <span className={"item-num"}>{count?.quantity}</span>
        <source
          media="(max-width: 799px)"
          srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${
            product.small
          }`}
        />
        <source
          media="(min-width: 800px)"
          srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${product.big}`}
        />
        <img
          srcSet={`${import.meta.env.CLIENT_BACKEND_STATIC_URL}${product.big}`}
          alt="Chris standing up holding his daughter Elva"
        />
      </picture>

      <div className="info">
        <h2>{product.name}</h2>
        <span className="price">{currencyFormat(product.price)}</span>

        <div className="buttons-container">
          <Button
            title={"+"}
            actionType={"add"}
            onClick={() => handleIncrement(product)}
          />
          {count?.quantity !== 0 ? (
            <Button
              title={"-"}
              actionType={"remove"}
              onClick={() => handleDecrement(product)}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
};

export default CartItem;
