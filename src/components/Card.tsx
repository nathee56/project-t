import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`bg-surface-container-lowest soft-shadow border border-surface-variant/50 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
