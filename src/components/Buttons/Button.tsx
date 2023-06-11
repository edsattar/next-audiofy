import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        type={type}
        disabled={disabled}
        // prettier-ignore
        className={twMerge("w-full rounded-full border border-transparent bg-green-500 px-3 py-3 font-bold text-black transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50", className)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
