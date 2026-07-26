import { Link } from "react-router-dom";
import type { Music } from "../../types/music";
import { formatTrackDuration } from "../../utils/formatDuration";

interface MusicRowProps {
  music: Music;
  position: number;
}

export function MusicRow({ music, position }: MusicRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-md px-4 py-2 transition hover:bg-background-elements">
      <span className="w-6 shrink-0 text-right text-12px text-text-subdued">{position}</span>

      <img
        src={music.albumCoverUrl}
        alt={`Capa do álbum ${music.albumTitle}`}
        className="h-10 w-10 shrink-0 rounded-sm object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="truncate text-16px text-text-base">{music.title}</span>
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
    </div>
  );
}
