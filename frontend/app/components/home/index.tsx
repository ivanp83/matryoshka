"use client";
import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("../loader/loader"), { ssr: false });
const GalleryMobile = dynamic(() => import("./galleryMobile"), {
  loading: () => <Loader />,
});
const Gallery = dynamic(() => import("./gallery"), {
  loading: () => <Loader />,
});
import { Category } from "@/types";
import useWindowSize from "@/app/hooks/useWindowSize";

type Props = { data: Array<Category> };

export default function Index({ data }: Props) {
  const wheel = useRef<HTMLDivElement | null>(null);

  const [state, setState] = useState({ radius: 400, tmpTheta: 0, theta: 0 });
  const [indicator, setIndicator] = useState(true);
  const { isMobile } = useWindowSize();
  // function createWheelStopListener(
  //   element: HTMLDivElement,
  //   callback: () => void,
  //   timeout?: number
  // ) {
  //   let handle: ReturnType<typeof setTimeout> | null = null;
  //   const onScroll = function () {
  //     if (handle) {
  //       clearTimeout(handle);
  //     }
  //     handle = setTimeout(callback, timeout || 1000);
  //   };
  //   element.addEventListener("wheel", onScroll);
  //   return function () {
  //     element.removeEventListener("wheel", onScroll);
  //   };
  // }

  // useEffect(() => {}, []);
  const handleScroll = (e: WheelEvent) => {
    if (isMobile) return;
    let scrollSpeed = (e.deltaY / 360) * 10;
    if (wheel.current) {
      setState({ ...state, theta: (state.theta += scrollSpeed) });
      wheel.current.style.transitionDelay = "0s";
      wheel.current.style.transform = `translate(-50%, -50%) rotate(${state.theta}deg)`;

      for (let i = 0; i < wheel.current.children.length; i++) {
        const element = wheel.current.children[i] as HTMLDivElement;
        element.style.transform = `rotate(${-1 * state.theta}deg)`;
        element.style.transitionDuration = "0s";
        element.style.transitionDelay = "0s";
      }
    }
  };

  return (
    <article onWheel={handleScroll}>
      <style jsx>{`
        article {
          width: 100vw;
          height: 100%;
          overflow: hidden;
          margin-top: var(--space-med);
          padding: 0 20px;
          display: grid;
          grid-gap: 2rem;
        }
        h1 {
          position: relative;
          z-index: 10;
          left: 50%;
          width: 900px;
          transform: translateX(-50%);
          text-align: center;
          margin-top: var(--space-small);
        }
        h1 span:not(:last-of-type) {
          display: block;
        }
        h1 .red {
          color: var(--main-red);
        }

        .mouse {
          display: block;
          width: 28px;
          height: 48px;
          border-radius: 11px 11px 15px 15px;
          border: 2px solid var(--main-dark);
          position: absolute;
          left: 50%;
          z-index: 10;
          bottom: 2rem;
        }

        .mouse span {
          display: block;
          margin: 6px auto;
          width: 4px;
          height: 8px;
          border-radius: 4px;
          background: var(--main-red);
          border: 1px solid transparent;
          animation-duration: 1s;
          animation-fill-mode: both;
          animation-iteration-count: infinite;
          animation-name: scroll;
        }

        @media all and (orientation: portrait) {
          h1 {
            position: relative;
            width: 90%;
          }
        }
        @media all and (max-width: 760px) and (orientation: portrait) {
          h1 {
            font-size: 30px;
          }
        }
        @media all and (max-width: 960px) and (orientation: landscape) {
          h1 {
            width: 80%;
            font-size: 6vw;
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

      <h1>
        <span>
          Все начинается с любви к себе, дому и
          <span className="red">&nbsp;цветам</span>
        </span>
      </h1>
      {!isMobile && (
        <div className="mouse">
          <span></span>
        </div>
      )}
      {isMobile ? <GalleryMobile data={data} /> : <Gallery data={data} />}
    </article>
  );
}
