import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const baseClass =
  "inline-flex items-center justify-center rounded-full px-5 py-2 text-12px font-semibold transition disabled:cursor-default disabled:opacity-50";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-accent text-black hover:brightness-110",
  secondary: "bg-background-elements text-text-base hover:bg-background-highlight",
  danger: "bg-red-500 text-white hover:brightness-110",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${baseClass} ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
