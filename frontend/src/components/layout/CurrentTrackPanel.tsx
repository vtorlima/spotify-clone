import { Link } from "react-router-dom";
import { usePlayerState } from "../../hooks/usePlayer";
import { formatDate } from "../../utils/formatDate";
import { formatTrackDuration } from "../../utils/formatDuration";
import { LikedSongButton } from "../music/LikedSongButton";

export function CurrentTrackPanel() {
  const { currentTrack, queue, currentIndex, progress, isPlaying } =
    usePlayerState();

  if (!currentTrack) {
    return (
      <div className="flex min-h-40 items-start">
        <p className="text-12px text-text-subdued">Nenhuma música tocando</p>
      </div>
    );
  }

  const nextTrack = queue[currentIndex + 1];

  const progressPercent =
    currentTrack.duration > 0
      ? Math.min(100, (progress / currentTrack.duration) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-5">
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

      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
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

        <LikedSongButton music={currentTrack} />
      </div>

      <section className="rounded-md bg-background-highlight p-4">
        <h3 className="mb-3 text-14px font-bold text-text-base">
          Detalhes da faixa
        </h3>

        <div className="flex flex-col gap-2 text-12px text-text-subdued">
          <div className="flex justify-between gap-3">
            <span>Duração</span>
            <span className="text-text-base">
              {formatTrackDuration(currentTrack.duration)}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span>Lançamento</span>
            <span className="text-right text-text-base">
              {formatDate(currentTrack.releaseDate)}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span>Reproduções</span>
            <span className="text-text-base">
              {currentTrack.timesListen.toLocaleString("pt-BR")}
            </span>
          </div>

          {currentTrack.explicit && (
            <div className="flex justify-between gap-3">
              <span>Conteúdo</span>
              <span className="rounded-sm bg-essential-subdued px-1.5 py-0.5 text-10px font-bold text-black">
                EXPLÍCITO
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-md bg-background-highlight p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-14px font-bold text-text-base">
            {isPlaying ? "Tocando agora" : "Pausado"}
          </h3>

          <span className="text-12px text-text-subdued">
            {formatTrackDuration(progress)}
          </span>
        </div>

        <div className="h-1 overflow-hidden rounded-full bg-track-bar">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {nextTrack && (
        <section className="rounded-md bg-background-highlight p-4">
          <h3 className="mb-3 text-14px font-bold text-text-base">A seguir</h3>

          <Link
            to={`/album/${nextTrack.albumId}`}
            className="flex min-w-0 items-center gap-3 rounded-md p-2 transition hover:bg-background-elements"
          >
            <img
              src={nextTrack.albumCoverUrl}
              alt={`Capa do album ${nextTrack.albumTitle}`}
              className="h-12 w-12 shrink-0 rounded-md object-cover"
            />

            <div className="min-w-0">
              <p className="truncate text-14px font-semibold text-text-base">
                {nextTrack.title}
              </p>
              <p className="truncate text-12px text-text-subdued">
                {nextTrack.artistName}
              </p>
            </div>
          </Link>
        </section>
      )}
    </div>
  );
}
