import { Category } from "@/types";
import React from "react";
import CustomImage from "../image";
import Link from "next/link";

type Props = {
  data: Category;
};

function Card({ data }: Props) {
  return (
    <figure key={data.id}>
      <style jsx>{`
        figure {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .image {
          transition: 0.5s;
          filter: brightness(0.8);
          position: relative;
          width: 100%;

          height: calc((100vw / 2 - var(--space-small) * 2) * 4 / 3);
        }
        figcaption {
          transition: 0.5s;
          position: absolute;
          z-index: 1;
          color: var(--main-light);
          font-weight: 600;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
        }
        @media (hover: hover) and (pointer: fine) {
          figure:hover .image {
            filter: brightness(1);
          }
          figure:hover figcaption {
            color: var(--main-red);
          }
        }
        @media all and (orientation: portrait) {
          figcaption {
            font-size: 1.4rem;
          }
        }
        @media all and (orientation: portrait) and (max-width: 600px) {
          figcaption {
            font-size: 20px;
          }
        }
      `}</style>

      <Link href={`category/${data.id}`}>
        <figcaption>{data.name}</figcaption>
        <div className="image">
          <CustomImage
            src={data?.image}
            alt={data?.name}
            sizes="(max-width: 768px)50vw, 33vw"
          />
        </div>
      </Link>
    </figure>
  );
}
export default Card;
