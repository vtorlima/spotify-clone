import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface HomeShelfProps {
  title: string;
  actionLabel?: string;
  actionTo?: string;
  children: ReactNode;
}

export function HomeShelf({
  title,
  actionLabel,
  actionTo,
  children,
}: HomeShelfProps) {
  const showAction = Boolean(actionLabel && actionTo);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-20px font-bold text-text-base">{title}</h2>

        {showAction && (
          <Link
            to={actionTo!}
            className="text-12px font-bold text-text-subdued transition-colors hover:text-text-base"
          >
            {actionLabel}
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}
