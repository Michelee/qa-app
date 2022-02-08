import React from "react";
import "./Button.css";

const Button = ({ type = "button", handleClick, label, loading, dataTest }) => {
  return (
    <button
      data-testid={dataTest}
      className="app__button"
      type={type}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default Button;
