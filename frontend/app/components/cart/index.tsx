"use client";
import { useAppContext } from "@/app/context/app.context";
import { currencyFormat } from "@/utils/helpers";
import Button from "../buttons/button";
import CartItem from "./cartItem";
import { useRouter } from "next/navigation";
export default function Index() {
  const { cartItems } = useAppContext();
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const router = useRouter();
  return (
    <div className="cart-content">
      <style jsx>{`
        .cart-content {
          display: grid;
          grid-gap: var(--space-med);
        }
        ul {
          display: grid;
          grid-auto-flow: row;
          grid-gap: var(--space-small);
        }
        .total {
          display: grid;
          grid-auto-flow: row;
          grid-gap: var(--space-small);
          border-top: 1px solid;
          padding: var(--space-small) 0;
          font-weight: 600;
        }
        h1 {
          font-size: 30px;
        }
        .heading {
          width: 100%;
          display: flex;
          justify-content: space-between;
        }
        .empty-text {
          text-align: center;
        }
      `}</style>
      {cartItems.length ? (
        <>
          <h1>Корзина</h1>
          <ul>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))}
          </ul>
          <div className="total">
            <div className="heading">
              <span>Итого: </span>
              <span>{currencyFormat(totalPrice)}</span>
            </div>
            <Button
              actionType="checkout"
              title="К оплате"
              type="button"
              onClick={() => router.push("/shipping")}
            />
          </div>
        </>
      ) : (
        <span className="empty-text">
          Пока еще не добавлено ни одного букета{" "}
        </span>
      )}
    </div>
  );
}
