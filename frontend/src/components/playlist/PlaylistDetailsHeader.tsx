import type { Playlist } from "../../types/playlist";
import { formatPlaylistDuration } from "../../utils/formatDuration";
import { formatDate } from "../../utils/formatDate";
import { isLikedPlaylistName } from "../../utils/likedPlaylist";
import { PlaylistCover } from "./PlaylistCover";

interface PlaylistDetailsHeaderProps {
  playlist: Playlist;
}

export function PlaylistDetailsHeader({ playlist }: PlaylistDetailsHeaderProps) {
  const musicLabel = playlist.musicQtd === 1 ? "música" : "músicas";

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end">
      <PlaylistCover
        coverImageUrls={playlist.coverImageUrls}
        variant={isLikedPlaylistName(playlist.name) ? "liked" : "default"}
        className="h-40 w-40 shrink-0"
      />

      <div className="flex flex-col gap-2">
        <span className="text-12px font-semibold uppercase text-text-subdued">Playlist</span>

        <h1 className="text-64px font-bold leading-none text-text-base">{playlist.name}</h1>

        {playlist.description && (
          <p className="text-16px text-text-subdued">{playlist.description}</p>
        )}

        <p className="text-12px text-text-subdued">
          {playlist.musicQtd} {musicLabel} · {formatPlaylistDuration(playlist.duration)}
        </p>

        <div className="flex flex-col gap-0.5 text-12px text-essential-subdued">
          <span>Criada em {formatDate(playlist.createdAt)}</span>
          {playlist.updatedAt && <span>Editada em {formatDate(playlist.updatedAt)}</span>}
        </div>
      </div>
    </header>
  );
}