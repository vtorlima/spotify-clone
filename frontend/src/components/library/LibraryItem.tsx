import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { PlaylistCover } from "../playlist/PlaylistCover";

export type LibraryItemData =
  | { type: "liked"; id: string; title: string; subtitle: string; to: string }
  | {
      type: "playlist";
      id: string;
      title: string;
      subtitle: string;
      to: string;
      coverImageUrls: string[];
    }
  | {
      type: "artist";
      id: string;
      title: string;
      subtitle: string;
      to: string;
      imageUrl: string;
    }
  | {
      type: "album";
      id: string;
      title: string;
      subtitle: string;
      to: string;
      imageUrl: string;
    };

interface LibraryItemProps {
  item: LibraryItemData;
}

const LIKED_GRADIENT =
  "linear-gradient(135deg, #4300b0 0%, #8ba5d8 100%)";

export function LibraryItem({ item }: LibraryItemProps) {
  return (
    <Link
      to={item.to}
      className="group flex min-w-0 items-center gap-3 rounded-md p-2 transition-colors hover:bg-background-elements"
    >
      <LibraryItemThumb item={item} />

      <div className="min-w-0 flex-1">
        <p className="truncate text-16px font-semibold text-text-base">
          {item.title}
        </p>
        <p className="truncate text-12px text-text-subdued">{item.subtitle}</p>
      </div>
    </Link>
  );
}

function LibraryItemThumb({ item }: LibraryItemProps) {
  if (item.type === "liked") {
    return (
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundImage: LIKED_GRADIENT }}
      >
        <FiHeart className="text-[20px] text-text-base" fill="currentColor" />
      </div>
    );
  }

  if (item.type === "playlist") {
    return (
      <PlaylistCover
        coverImageUrls={item.coverImageUrls}
        className="h-12 w-12 shrink-0"
      />
    );
  }

  const shapeClass = item.type === "artist" ? "rounded-full" : "rounded-md";

  return (
    <img
      src={item.imageUrl}
      alt={item.title}
      className={`h-12 w-12 shrink-0 object-cover ${shapeClass}`}
    />
  );
}
