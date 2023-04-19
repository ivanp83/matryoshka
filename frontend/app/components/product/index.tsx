"use client";
import { ProductItem } from "@/types";
import React from "react";
import CustomImage from "../image";
import { currencyFormat } from "@/utils/helpers";
import Button from "../buttons/button";
import { useAppContext } from "@/app/context/app.context";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Loader = dynamic(() => import("../loader/loader"), { ssr: false });
const FeaturedProducts = dynamic(() => import("./featuredProducts"), {
  ssr: false,
  loading: () => <Loader />,
});
type Props = {
  data: ProductItem;
  faturedData: ProductItem[];
};

export default function Index({ data: product, faturedData }: Props) {
  const { onUpdate, cartItems } = useAppContext();
  const addToCart = (product: ProductItem) => {
    onUpdate(product);
  };
  const router = useRouter();
  return (
    <div className="wrapp">
      <style jsx>{`
        .wrapp {
          width: 50rem;
          margin: 0 auto;
          display: grid;
          grid-gap: var(--space-med);
        }

        .content {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: var(--space-small) var(--space-med);
        }
        .image {
          position: relative;
          width: 30rem;
          height: calc(30rem * 4 / 3);
        }
        .details {
          display: grid;
          height: fit-content;
          grid-gap: var(--space-small);
        }
        .top {
          width: 100%;
          display: grid;
          grid-gap: 5px;
        }
        h1 {
          line-height: 1.2;
          font-size: 30px;
        }
        .descr {
          margin-bottom: var(--space-small);
        }
        @media all and (max-width: 1024px) and (orientation: portrait) {
          .wrapp {
            width: 100%;
          }
          .image {
            width: 100%;
            height: calc((100vw - var(--space-small) * 2) * 4 / 3);
          }
        }
        @media all and (max-width: 768px) and (orientation: portrait) {
          .content {
            width: 100%;
            grid-template-columns: 1fr;
          }
        }
        @media all and (max-width: 1024px) and (orientation: landscape) {
          .wrapp {
            width: 100%;
          }
        }
      `}</style>
      <section className="content">
        <div className="image">
          <CustomImage
            src={product.big}
            alt={product.name}
            sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 50vw"
          />
        </div>
        <div className="details">
          <div className="top">
            <h1>{product.name}</h1>
            <span>{currencyFormat(product.price)}</span>
          </div>
          <span className="descr">{product.description}</span>
          <Button
            actionType="shop"
            title="В корзину"
            onClick={() => addToCart(product)}
          />
          {cartItems.length && (
            <Button
              actionType="finish"
              title="Завершить"
              onClick={() => router.push("/shipping")}
            />
          )}
        </div>
      </section>
      <FeaturedProducts data={faturedData} />
    </div>
  );
}
