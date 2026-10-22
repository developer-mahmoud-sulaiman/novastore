import { forwardRef, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${hasError ? styles.error : ""} ${className ?? ""} `}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
export default Input;
