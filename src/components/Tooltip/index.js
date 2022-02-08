import React from "react";
import './Tooltip.css'

const Tooltip = ({children, text}) => {
  return (
    <div className="tooltip__container">
      {children}
      <p className="tooltip__text">{text}</p>
    </div>
  );
};

export default Tooltip;
