import { Category } from "@/types";
import React from "react";
import CustomImage from "../image";
import Link from "next/link";
import useWindowSize from "@/app/hooks/useWindowSize";

type Props = {
  theta: number;
  radius: number;
  center: { x: number; y: number };
  data: Category;
  index: number;
};

const getMyCords = (theta: number, radius: number) => ({
  x: Math.sin(theta) * radius,
  y: Math.cos(theta) * radius,
});

function Card({ theta, center, radius, data, index }: Props) {
  const { x, y } = getMyCords(theta, radius);
  const { isMobile } = useWindowSize();
  return (
    <figure key={data.id} style={{}}>
      <style jsx>{`
        figure {
          position: ${isMobile ? "relative" : "absolute"};
          width: 100%;
          height: 100%;
          border-radius: ${isMobile ? "none" : "50%"};
          overflow: ${isMobile ? "none" : "hidden"};
          z-index: ${10 - index};
          left: ${isMobile ? "0" : center.x + x + "px"};
          top: ${isMobile ? "0" : center.y + y + "px"};
        }
        .image {
          transition: 0.5s;
          filter: brightness(0.8);
          position: ${isMobile ? "relative" : "absolute"};
          width: 100%;
          aspect-ratio: ${isMobile ? "3/4" : "1"};
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
          text-align: center;
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
            font-size: 1rem;
          }
        }
      `}</style>

      <Link href={`category/${data.id}`}>
        <figcaption>{data.name}</figcaption>
        <div className="image">
          <CustomImage
            src={data?.image}
            alt={data?.name}
            sizes="(max-width: 768px) 50vw,
(max-width: 1200px) 20vw"
          />
        </div>
      </Link>
    </figure>
  );
}
export default React.memo(Card);
