import React from "react";
import "./Input.css";
import PropTypes from "prop-types";

const Input = React.forwardRef(({ placeholder, type, value, ...rest }, ref) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      ref={ref}
      className="input"
      value={value}
      {...rest}
    />
  );
});

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
};
Input.displayName = "Input";

export default Input;
