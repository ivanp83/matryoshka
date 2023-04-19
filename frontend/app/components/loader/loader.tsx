"use client";
import { FC } from "react";
import * as ReactDOM from "react-dom";

const Content = () => {
  const content = (
    <div className="lds-ellipsis">
      <style jsx>{`
        .lds-ellipsis {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
          position: fixed;
          top: 50vh;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 100;
        }
        .lds-ellipsis div {
          position: absolute;
          top: 33px;
          width: 13px;
          height: 13px;
          border-radius: 50%;
          background: #b22a2a;
          animation-timing-function: cubic-bezier(0, 1, 1, 0);
        }
        div :nth-child(1) {
          left: 8px;
          animation: lds-ellipsis1 0.6s infinite;
        }
        div :nth-child(2) {
          left: 8px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        div :nth-child(3) {
          left: 32px;
          animation: lds-ellipsis2 0.6s infinite;
        }
        div :nth-child(4) {
          left: 56px;
          animation: lds-ellipsis3 0.6s infinite;
        }

        @keyframes lds-ellipsis1 {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes lds-ellipsis3 {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(0);
          }
        }
        @keyframes lds-ellipsis2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(24px, 0);
          }
        }
      `}</style>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return ReactDOM.createPortal(
    content,

    document?.getElementById("root-loader") as Element
  );
};
const Loader: FC = () => {
  return <Content />;
};

export default Loader;
