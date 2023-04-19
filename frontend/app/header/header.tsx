"use client";
import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { useAppContext } from "../context/app.context";
import Humburger from "./humburger";
import { BsBag } from "react-icons/bs";
import Nav from "./nav";

export default function Header() {
  const { cartItems, setMenuIsOpen } = useAppContext();
  const sum = () =>
    cartItems.reduce((partialSum, a) => partialSum + a.quantity, 0);

  return (
    <header>
      <style jsx>{`
        header {
          padding: 20px;
          display: grid;
          position: fixed;
          z-index: 100;
          left: 0;
          top: 0;
          width: 100vw;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: center;
        }
        .logo {
          grid-column: 1/2;
          width: 10rem;
          grid-row: 1;
          line-height: 1;
        }
        .cart-icon {
          grid-column: 3/4;
          grid-row: 1;
          width: fit-content;
          position: relative;
          justify-self: end;
          display: flex;
          align-items: center;
        }
        .num {
          position: absolute;
          top: 60%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .num span {
          font-size: 13px;
        }
        a {
          display: contents;
        }
        @media all and (max-width: 700px) and (orientation: portrait) {
          .cart-icon {
            margin-right: 3rem;
          }
        }
      `}</style>
      <div className="logo" onClick={() => setMenuIsOpen(false)}>
        <Logo />
      </div>

      <Nav />
      <Humburger />

      <div className="cart-icon">
        <Link href="/cart">
          <BsBag style={{ width: "24px", height: "24px" }} />
          <div className="num">
            <span>{sum()}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
