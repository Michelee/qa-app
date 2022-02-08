import React from "react";
import "./Input.css";

const Input = ({ label, value, name, handleChange, dataTest }) => {
  return (
    <div className="input__container">
      <label htmlFor={name}>{label}</label>
      <input
        data-testid={dataTest}
        type="text"
        name={name}
        value={value}
        onChange={(ev) => handleChange(ev)}
      />
    </div>
  );
};

export default Input;
