import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className = "", ...props }: TextareaProps) {
  return (
    <label className="flex flex-col gap-2">
      {label && (
        <span className="text-12px font-semibold text-text-base">{label}</span>
      )}
      <textarea
        className={`min-h-24 resize-none rounded-md bg-textbox-bg px-3 py-2.5 text-16px text-text-base outline-none placeholder:text-essential-subdued focus:bg-textbox-bg-selected focus:ring-2 focus:ring-accent ${className}`}
        {...props}
      />
    </label>
  );
}
