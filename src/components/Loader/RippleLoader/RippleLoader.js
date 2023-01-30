import React from "react";
import "./RippleLoader.scss";

const RippleLoader = () => {
  return (
    <div className="loader-window">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default RippleLoader;
