import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "icon";
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle = "transition-all duration-300 focus:outline-none cursor-pointer";

  const variants = {
    primary:
      "w-full bg-primary text-on-primary font-label-md text-label-md py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-on-primary-fixed-variant shadow-primary/20",
    icon:
      "w-10 h-10 rounded-full flex items-center justify-center text-primary dark:text-inverse-primary hover:bg-surface-container",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
