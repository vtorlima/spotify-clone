import type { SearchItem } from "../../types/search";

const TYPE_LABELS: Record<SearchItem["type"], string> = {
  music: "Musicas",
  artist: "Artistas",
  album: "Albuns",
};

interface SearchSuggestionsProps {
  items: SearchItem[];
  onSelect: (item: SearchItem) => void;
}

export function SearchSuggestions({ items, onSelect }: SearchSuggestionsProps) {
  if (items.length === 0) {
    return (
      <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-md bg-popup-bg p-4 text-center text-12px text-text-subdued shadow-2xl">
        Nenhum resultado encontrado.
      </div>
    );
  }

  const groups = (Object.keys(TYPE_LABELS) as SearchItem["type"][])
    .map((type) => ({
      type,
      items: items.filter((item) => item.type === type),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-md bg-popup-bg py-2 shadow-2xl">
      {groups.map((group) => (
        <div key={group.type} className="flex flex-col">
          <span className="px-4 pb-1 pt-2 text-12px font-semibold uppercase text-text-subdued">
            {TYPE_LABELS[group.type]}
          </span>

          {group.items.map((item) => (
            <button
              key={`${item.type}-${item.id}`}
              type="button"
              onMouseDown={() => onSelect(item)}
              className="flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-background-highlight"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className={`h-9 w-9 shrink-0 object-cover ${
                  item.type === "artist" ? "rounded-full" : "rounded-sm"
                }`}
              />

              <span className="flex min-w-0 flex-col">
                <span className="truncate text-14px text-text-base">
                  {item.title}
                </span>
                <span className="truncate text-12px text-text-subdued">
                  {item.subtitle}
                </span>
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
