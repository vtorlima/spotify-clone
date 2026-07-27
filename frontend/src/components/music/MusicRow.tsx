import { Link } from "react-router-dom";
import { FiPause, FiPlay } from "react-icons/fi";
import type { Music } from "../../types/music";
import { usePlayerActions, usePlayerState } from "../../hooks/usePlayer";
import { formatTrackDuration } from "../../utils/formatDuration";
import { TrackActionMenu } from "./TrackActionMenu";

interface MusicRowProps {
  music: Music;
  position: number;
  queue?: Music[];
  showAddToPlaylist?: boolean;
}

export function MusicRow({
  music,
  position,
  queue,
  showAddToPlaylist,
}: MusicRowProps) {
  const { currentTrack, isPlaying } = usePlayerState();
  const { playTrack, togglePlay } = usePlayerActions();

  const isCurrentTrack = currentTrack?.id === music.id;
  const isThisTrackPlaying = isCurrentTrack && isPlaying;

  function handlePlay() {
    if (isCurrentTrack) {
      togglePlay();
      return;
    }
    playTrack(music, queue ?? [music]);
  }

  return (
    <div
      onDoubleClick={handlePlay}
      className="group flex items-center gap-4 rounded-md px-4 py-2 transition hover:bg-background-elements"
    >
      <button
        type="button"
        onClick={handlePlay}
        aria-label={isThisTrackPlaying ? "Pausar" : "Reproduzir"}
        className="flex h-6 w-6 shrink-0 items-center justify-center text-right"
      >
        <span
          className={`text-12px tabular-nums group-hover:hidden ${
            isCurrentTrack ? "text-accent" : "text-text-subdued"
          }`}
        >
          {position}
        </span>

        {isThisTrackPlaying ? (
          <FiPause className="hidden text-[16px] text-text-base group-hover:block" />
        ) : (
          <FiPlay className="hidden translate-x-[1px] text-[16px] text-text-base group-hover:block" />
        )}
      </button>

      <img
        src={music.albumCoverUrl}
        alt={`Capa do album ${music.albumTitle}`}
        className="h-10 w-10 shrink-0 rounded-sm object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`truncate text-16px ${
              isCurrentTrack ? "text-accent" : "text-text-base"
            }`}
          >
            {music.title}
          </span>
          {music.explicit && (
            <span className="shrink-0 rounded-sm bg-essential-subdued px-1 text-8px font-bold text-black">
              E
            </span>
          )}
        </div>

        <Link
          to={`/artist/${music.artistId}`}
          className="truncate text-12px text-text-subdued hover:text-text-base hover:underline"
        >
          {music.artistName}
        </Link>
      </div>

      <span className="hidden min-w-0 flex-1 truncate text-12px text-text-subdued md:block">
        {music.albumTitle}
      </span>

      <span className="w-12 shrink-0 text-right text-12px text-text-subdued">
        {formatTrackDuration(music.duration)}
      </span>

      {showAddToPlaylist && (
        <div className="shrink-0 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
          <TrackActionMenu musicId={music.id} />
        </div>
      )}
    </div>
  );
}
