import { LibraryItem, type LibraryItemData } from "./LibraryItem";

interface LibrarySectionProps {
  items: LibraryItemData[];
}

export function LibrarySection({ items }: LibrarySectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="px-2 text-12px font-semibold text-text-subdued">
        Favoritos
      </h2>

      {items.length === 0 ? (
        <p className="px-2 py-2 text-12px text-text-subdued">
          Sua biblioteca está vazia.
        </p>
      ) : (
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={`${item.type}-${item.id}`}>
              <LibraryItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
