import * as React from "react";

const buttonVariants = {
  variant: {
    default: "bg-primary text-dark shadow-md hover:bg-primary/80",
    outline: "border border-input bg-secondary hover:bg-secondary/90",
    secondary: "bg-secondary text-primary hover:bg-secondary/80",
    dark: "bg-dark text-default hover:bg-secondary/80",
    ghost: "shadow-none hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 shadow-none hover:underline",
  },
  size: {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-8 w-8 p-0",
  },
};

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<IButton> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`transition-all text-white duration-300 border border-dark rounded-md text-lg font-semibold shadow-lg flex items-center justify-center ${buttonVariants.variant.default} ${buttonVariants.size.default} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
