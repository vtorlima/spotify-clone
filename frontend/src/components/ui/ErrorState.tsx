interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <p className="text-16px text-text-base">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-full bg-accent px-6 py-2 text-12px font-semibold text-black transition hover:brightness-110"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}
