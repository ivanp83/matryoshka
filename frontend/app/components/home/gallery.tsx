import React, { useEffect, useRef, useState } from "react";
import Card from "./card";
import { Category } from "@/types";

type Props = {
  data: Array<Category>;
};

export default function Gallery({ data }: Props) {
  const wheel = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState({ radius: 400, tmpTheta: 0, theta: 0 });
  const [centerOfTheWheel, setCenterOfTheWheele] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setCenterOfTheWheele({
      x: 0,
      y: 0,
    });
  }, []);

  const handleScroll = (e: any) => {
    let scrollSpeed = (e.deltaY / 360) * 20;
    setState({ ...state, tmpTheta: (state.tmpTheta += scrollSpeed) });
    if (wheel.current) {
      wheel.current.style.transitionDelay = `0s`;
      wheel.current.style.transitionDuration = `0s`;
      wheel.current.style.transform = `translate(-50%, -50%) rotate(${state.tmpTheta}deg)`;

      for (let i = 0; i < wheel.current.children.length; i++) {
        const element = wheel.current.children[i] as HTMLDivElement;
        element.style.transitionDelay = `0s`;
        element.style.transitionDuration = `0s`;
        element.style.transform = `rotate(${-1 * state.tmpTheta}deg)`;
      }
    }
  };
  return (
    <div className="wheel" ref={wheel} onWheel={handleScroll}>
      <style jsx>{`
        .wheel {
          width: 400px;
          height: 400px;
          position: fixed;
          transform: translate(-50%, -50%);
          top: 100%;
          left: 50%;
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
        <Card
          data={item}
          key={item.id}
          theta={((2 * Math.PI) / data.length) * i}
          radius={state.radius}
          center={centerOfTheWheel}
          index={i}
        />
      ))}
    </div>
  );
}
