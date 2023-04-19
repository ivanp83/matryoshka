"use client";
import { ProductItem } from "@/types";
import React, { FC } from "react";
import { currencyFormat } from "@/utils/helpers";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Envs } from "@/utils/config";

type Props = { data: ProductItem[] };

const FeaturedProducts: FC<Props> = ({ data }) => {
  return (
    <section>
      <style jsx>{`
        section {
          width: 100%;
          display: grid;
          grid-gap: var(--space-small);
        }
        .swiper {
          width: 100%;
          height: 40rem;
        }
        .swiper-container {
          width: 480px;
        }

        .card-wrapp {
          width: 100%;
        }
        .image {
          position: relative;
          width: 100%;
          height: calc(((50rem - 20px * 2) / 3) / 3 * 4);
          object-position: top;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .details {
          margin-top: 5px;
          width: 100%;
          text-align: center;
        }
        .details span {
          font-size: 14px;
        }
        @media screen and (max-width: 1024px) {
          .image {
            position: relative;
            width: 100%;
            height: calc(((100vw - 20px * 4) / 3) / 3 * 4);
          }
        }
      `}</style>
      <h2> Другие букеты</h2>

      <Swiper spaceBetween={20} slidesPerView={3} style={{ width: "100%" }}>
        {data.map((prod) => (
          <SwiperSlide key={prod.id}>
            <div className="card-wrapp">
              <Link href={`product/${prod.id}`}>
                <div className="image">
                  <img
                    src={`${Envs.NEXT_PUBLIC_BACKEND_STATIC_URL}/${prod.small}`}
                    alt={prod.name}
                  />
                </div>
              </Link>
              <div className="details">
                <h3>{prod.name}</h3>
                <span>{currencyFormat(prod.price)}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default FeaturedProducts;
