import { Link } from "react-router-dom";
import type { Album } from "../../types/album";
import { formatPlaylistDuration } from "../../utils/formatDuration";

interface AlbumHeaderProps {
  album: Album;
}

export function AlbumHeader({ album }: AlbumHeaderProps) {
  const totalDuration = album.musics.reduce((acc, music) => acc + music.duration, 0);
  const trackLabel = album.musics.length === 1 ? "música" : "músicas";

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end">
      <img
        src={album.coverUrl}
        alt={`Capa de ${album.title}`}
        className="h-40 w-40 shrink-0 rounded-md object-cover shadow-2xl"
      />

      <div className="flex flex-col gap-2">
        <span className="text-12px font-semibold uppercase text-text-subdued">Álbum</span>
        <h1 className="text-64px font-bold leading-none text-text-base">{album.title}</h1>

        <p className="text-12px text-text-subdued">
          <Link
            to={`/artist/${album.artistId}`}
            className="font-semibold text-text-base hover:underline"
          >
            {album.artistName}
          </Link>
          {" · "}
          {album.year}
          {" · "}
          {album.musics.length} {trackLabel}
          {" · "}
          {formatPlaylistDuration(totalDuration)}
        </p>
      </div>
    </header>
  );
}
