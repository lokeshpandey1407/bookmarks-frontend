import "./Button.css";
import PropTypes from "prop-types";

const Button = ({ text, ...rest }) => {
  return (
    <button className="button" {...rest}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
};

export default Button;
