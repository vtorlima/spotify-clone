import { Link } from "react-router-dom";
import { usePlayerState } from "../../hooks/usePlayer";

export function CurrentTrackPanel() {
  const { currentTrack } = usePlayerState();

  if (!currentTrack) {
    return (
      <div className="flex min-h-40 items-start">
        <p className="text-12px text-text-subdued">Nenhuma música tocando</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        to={`/album/${currentTrack.albumId}`}
        className="block min-w-0 truncate text-16px font-bold text-text-base hover:underline"
      >
        {currentTrack.albumTitle}
      </Link>

      <img
        src={currentTrack.albumCoverUrl}
        alt={`Capa do album ${currentTrack.albumTitle}`}
        className="aspect-square w-full rounded-md object-cover"
      />

      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="truncate text-20px font-bold text-text-base">
          {currentTrack.title}
        </h2>

        <Link
          to={`/artist/${currentTrack.artistId}`}
          className="block min-w-0 truncate text-12px text-text-subdued hover:text-text-base hover:underline"
        >
          {currentTrack.artistName}
        </Link>
      </div>
    </div>
  );
}
