"use client";
import { ProductItem } from "@/types";
import React from "react";
import CustomImage from "../image";
import { currencyFormat } from "@/utils/helpers";
import Btns from "./btns";
import { useAppContext } from "@/app/context/app.context";
import Link from "next/link";

type Props = {
  item: ProductItem;
};

export default function CartItem({ item }: Props) {
  const { cartItems } = useAppContext();
  const count = cartItems.find((prod) => prod.id === item.id);
  return (
    <li key={item.id}>
      <style jsx>{`
        .image {
          position: relative;
          width: 8rem;
          height: calc(8rem * 4 / 3);
        }

        figure {
          display: grid;
          grid-auto-flow: column;
          grid-gap: var(--space-med);
          width: fit-content;
          position: relative;
        }
        figcaption {
          display: grid;
          height: fit-content;
          grid-gap: var(--space-small);
        }
        .proce {
          font-size: 16px;
        }
        .count {
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 14px;
          padding: 4px;
          z-index: 1;
          border-radius: 50%;
          background: var(--main-dark);
          color: var(--main-light);
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media all and (max-width: 600px) and (orientation: portrait) {
          figure {
            grid-gap: var(--space-small);
          }
        } ;
      `}</style>
      <figure>
        <Link href={`product/${item.id}`}>
          <div className="image">
            <CustomImage
              src={item.small}
              alt={item.name}
              sizes="(max-width: 768px) 50vw,
(max-width: 1200px) 300px"
            />
          </div>
        </Link>
        <figcaption>
          <div>
            <h3>{item.name}</h3>
            <span className="price">{currencyFormat(item.price)}</span>
          </div>
          <span className="count">{count?.quantity}</span>

          <Btns data={item} />
        </figcaption>
      </figure>
    </li>
  );
}
