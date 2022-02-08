import React from "react";
import "./Textarea.css";

const Textarea = ({
  label,
  value,
  name,
  dataTest,
  placeholder = "",
  handleChange,
}) => {
  return (
    <div className="textarea__container">
      <label htmlFor={name}>{label}</label>

      <textarea
        data-testid={dataTest}
        name={name}
        rows="10"
        cols="50"
        value={value}
        onChange={handleChange}
      >
        {placeholder}
      </textarea>
    </div>
  );
};

export default Textarea;
