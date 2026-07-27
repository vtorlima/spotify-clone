import { Link } from "react-router-dom";
import type { AlbumSummary } from "../../types/album";

interface AlbumCardProps {
  album: AlbumSummary;
}

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link
      to={`/album/${album.id}`}
      className="group flex flex-col gap-3 rounded-lg bg-background-base p-4 transition-colors hover:bg-background-highlight"
    >
      <img
        src={album.coverUrl}
        alt={`Capa de ${album.title}`}
        className="aspect-square w-full rounded-md object-cover"
      />
      <div className="flex flex-col gap-1">
        <h3 className="truncate text-16px font-semibold text-text-base">{album.title}</h3>
        <p className="truncate text-12px text-text-subdued">{album.year}</p>
      </div>
    </Link>
  );
}
