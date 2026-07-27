import { Link } from "react-router-dom";
import type { PlaylistSummary } from "../../types/playlist";
import { formatPlaylistDuration } from "../../utils/formatDuration";
import { PlayButton } from "../ui/PlayButton";
import { PlaylistCover } from "./PlaylistCover";

interface PlaylistCardProps {
  playlist: PlaylistSummary;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const musicLabel = playlist.musicQtd === 1 ? "música" : "músicas";

  return (
    <Link
      to={`/playlist/${playlist.id}`}
      className="group flex flex-col gap-3 rounded-lg bg-background-base p-4 transition-colors hover:bg-background-highlight"
    >
      <div className="relative aspect-square w-full">
        <PlaylistCover coverImageUrls={playlist.coverImageUrls} className="h-full w-full" />

        <PlayButton
          as="span"
          size="sm"
          className="pointer-events-none absolute right-2 bottom-2 translate-y-1 opacity-0 duration-150 group-hover:translate-y-0 group-hover:opacity-100"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="truncate text-16px font-semibold text-text-base">
          {playlist.name}
        </h3>

        {playlist.description && (
          <p className="truncate text-12px text-text-subdued">
            {playlist.description}
          </p>
        )}

        <p className="text-12px text-text-subdued">
          {playlist.musicQtd} {musicLabel},{" "}
          {formatPlaylistDuration(playlist.duration)}
        </p>
      </div>
    </Link>
  );
}