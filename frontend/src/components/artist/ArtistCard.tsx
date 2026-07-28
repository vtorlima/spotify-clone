import { Link } from "react-router-dom";
import type { Artist } from "../../types/artist";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link
      to={`/artist/${artist.id}`}
      className="group flex flex-col gap-3 rounded-lg bg-background-base p-4 transition-colors hover:bg-background-highlight"
    >
      <img
        src={artist.photoUrl}
        alt={artist.name}
        className="aspect-square w-full rounded-full object-cover"
      />

      <div className="flex flex-col gap-1">
        <h3 className="truncate text-16px font-semibold text-text-base">
          {artist.name}
        </h3>
        <p className="truncate text-12px text-text-subdued">Artista</p>
      </div>
    </Link>
  );
}
