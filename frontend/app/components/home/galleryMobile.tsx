import { Category } from "@/types";
import React, { forwardRef } from "react";

import CardMobile from "./cardMobile";

type Props = {
  data: Array<Category>;
};

export default function GalleryMobile({ data }: Props) {
  return (
    <div className="wheel">
      <style jsx>{`
        .wheel {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 10px;
        }

        @media all and (orientation: portrait) {
          h1 {
            position: relative;
            width: 80%;
            font-size: 8vw;
          }
        }

        @keyframes scroll {
          0% {
            opacity: 1;

            transform: translateY(0);
          }
          100% {
            opacity: 0;

            transform: translateY(20px);
          }
        }
      `}</style>
      {data.map((item, i) => (
        <CardMobile data={item} key={item.id} />
      ))}
    </div>
  );
}
