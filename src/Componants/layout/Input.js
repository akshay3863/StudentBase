import React from "react";

function Input(props) {
  const {
    placeholder = "Enter Value here",
    type = "text",
    name,
    onChange,
    value,
  } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
    />
  );
}

export default Input;
