import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./header/Header";
import { useTelegram } from "../hooks/useTelegram";
import { useAppContext } from "../context/app.context";
import { Api } from "../api";
// import apiWrapper from "../lib";
import Loader from "./loader/Loader";
import { CartItemType } from "../types/types";
import { currencyFormat } from "../utils/helpers";

export default function Root() {
  const { tg, queryId, user } = useTelegram();

  let { pathname } = useLocation();
  const { loading } = useAppContext();
  const getTotalPrice = (items: CartItemType[] = []) => {
    return items.reduce((acc, item) => {
      return (acc += item.price * item.quantity);
    }, 0);
  };
  const { cartItems } = useAppContext();
  useEffect(() => {
    tg.ready();
    // const { api } = apiWrapper;
  }, []);

  useEffect(() => {
    if (cartItems?.length > 0) {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Оплатить ${currencyFormat(getTotalPrice(cartItems))}`,
      });
    } else {
      tg.MainButton.hide();
    }
  }, [cartItems, pathname]);

  const order = { products: cartItems, queryId, userId: user?.id };

  const onSendData = async () => {
    await Api().order.create(order);
    tg.close();
  };

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);

    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);
  return (
    <>
      <Header />
      {loading && <Loader />}

      <main id="main">
        <Outlet />
      </main>
    </>
  );
}
