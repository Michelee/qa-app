import React from "react";
import './Checkbox.css'

const Checkbox = ({ name, value, handleChange, label, dataTest }) => {
  return (
    <div className="checkbox__container">
      <input type="checkbox" data-testid={dataTest} name={name} value={value} checked={value} onChange={() => handleChange(!value)} />{" "}
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;
