interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <p className="text-18px font-semibold text-text-base">{title}</p>
      {description && <p className="text-12px text-text-subdued">{description}</p>}
    </div>
  );
}
