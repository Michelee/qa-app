import React from "react";

const Input = ({ label, value, name, handleChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} value={value} onChange={(ev) => handleChange(ev)} />
    </div>
  );
};

export default Input;
