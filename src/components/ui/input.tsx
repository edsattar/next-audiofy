import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        // prettier-ignore
        className={cn("flex w-full rounded-md border border-transparent bg-neutral-700 px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-75", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export default Input;
