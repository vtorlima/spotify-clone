import type { ReactNode } from "react";

interface ErrorStateProps {
  message: string;
  detail?: string;
  onRetry?: () => void;
  action?: ReactNode;
}

export function ErrorState({ message, detail, onRetry, action }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex flex-col gap-1">
        <p className="text-16px text-text-base">{message}</p>
        {detail && <p className="text-12px text-text-subdued">{detail}</p>}
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-accent px-6 py-2 text-16px font-semibold text-black transition hover:brightness-110"
        >
          Tentar novamente
        </button>
      )}

      {action}
    </div>
  );
}