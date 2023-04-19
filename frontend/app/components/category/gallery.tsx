"use client";
import { ProductItem } from "@/types";
import React from "react";
import CustomImage from "../image";
import { currencyFormat } from "@/utils/helpers";
import Link from "next/link";

type Props = {
  data: Array<ProductItem>;
};

export default function Gallery({ data }: Props) {
  return (
    <ul>
      <style jsx>{`
        ul {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          grid-row-gap: 30px;
          grid-column-gap: var(--space-small);
        }

        .image {
          position: relative;
          width: 100%;
          height: calc((100vw / 5 - var(--space-small) * 2) * 4 / 3);
        }
        figcaption {
          text-align: center;
          margin-top: 5px;
        }
        figcaption span {
          font-size: 16px;
        }
        @media all and (max-width: 1024px) {
          ul {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-row-gap: 2rem;
            grid-column-gap: 1rem;
          }
          .image {
            height: calc((100vw / 2 - var(--space-small) * 2) * 4 / 3);
          }
          figcaption span {
            font-size: 16px;
          }
        }
      `}</style>
      {data.map((prod) => (
        <li key={prod.id}>
          <Link href={String(`product/${prod.id}`)}>
            <figure>
              <div className="image">
                <CustomImage
                  src={prod.big}
                  alt={prod.name}
                  sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw,
20vw"
                />
              </div>
              <figcaption>
                <h3>{prod.name}</h3>
                <span>{currencyFormat(prod.price)}</span>
              </figcaption>
            </figure>
          </Link>
        </li>
      ))}
    </ul>
  );
}
