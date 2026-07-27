import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2">
      {label && (
        <span className="text-12px font-semibold text-text-base">{label}</span>
      )}
      <input
        className={`rounded-md bg-textbox-bg px-3 py-2.5 text-16px text-text-base outline-none placeholder:text-essential-subdued focus:bg-textbox-bg-selected focus:ring-2 focus:ring-accent ${className}`}
        {...props}
      />
    </label>
  );
}
