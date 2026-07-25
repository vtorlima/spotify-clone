interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = "CARREGANDO (PLACEHOLDER)",
}: LoadingStateProps) {
  return (
    <div className="flex items-center justify-center py-16">
      <p className="text-16px text-text-subdued">{message}</p>
    </div>
  );
}