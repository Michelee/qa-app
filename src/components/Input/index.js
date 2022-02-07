import React from "react";

const Input = ({ label, value, handleChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" value={value} onChange={(ev) => handleChange(ev.target.value)} />
    </div>
  );
};

export default Input;
