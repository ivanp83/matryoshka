import { FC } from "react";
import "./Cart.scss";
import { useAppContext } from "../../context/app.context";
import Container from "../../components/container/Container";
import CartItem from "./CartItem";
import { currencyFormat } from "../../utils/helpers";

const Cart: FC = () => {
  const { cartItems } = useAppContext();

  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <section className="cart">
      <Container>
        {cartItems.length === 0 ? (
          <span className="empty-cart">
            Пока ещё не выбрали ни одного букета
          </span>
        ) : (
          <>
            <h1>Добавленные товары</h1>

            <ul className="items">
              {cartItems.map((product) => (
                <CartItem key={product.id} {...{ product }} />
              ))}
            </ul>

            <div className="checkout">
              <span>Итого: {currencyFormat(totalPrice)}</span>
            </div>
          </>
        )}
      </Container>
    </section>
  );
};

export default Cart;
