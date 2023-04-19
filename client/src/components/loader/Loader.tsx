import { FC } from "react";
import * as ReactDOM from "react-dom";
import "./Loader.scss";

const Content = () => {
  const content = (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("loader") as Element
  );
};
const Loader: FC = () => {
  return <Content />;
};

export default Loader;
