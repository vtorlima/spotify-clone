import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  FiPause,
  FiPlay,
  FiSkipBack,
  FiSkipForward,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import { usePlayerActions, usePlayerState } from "../../hooks/usePlayer";
import { formatTime } from "../../utils/formatDuration";
import { LikedSongButton } from "../music/LikedSongButton";

export default function BottomPlayer() {
  const { currentTrack, isPlaying, progress, volume, isMuted } =
    usePlayerState();
  const { togglePlay, next, previous, seek, setVolume, toggleMute } =
    usePlayerActions();

  const duration = currentTrack?.duration ?? 0;
  const effectiveVolume = isMuted ? 0 : volume;
  const isSilent = isMuted || volume === 0;

  const progressPercent =
    duration > 0 ? Math.min(100, (progress / duration) * 100) : 0;

  const progressRangeStyle = {
    "--range-progress": `${progressPercent}%`,
  } as CSSProperties;

  const volumeRangeStyle = {
    "--range-progress": `${effectiveVolume * 100}%`,
  } as CSSProperties;

  return (
    <footer className="flex h-20 shrink-0 items-center gap-4 border-t border-divider bg-black px-4">
      <div className="flex min-w-0 items-center gap-3 md:w-[30%]">
        {currentTrack ? (
          <>
            <img
              src={currentTrack.albumCoverUrl}
              alt={`Capa do album ${currentTrack.albumTitle}`}
              className="h-14 w-14 shrink-0 rounded-md object-cover"
            />
            <div className="min-w-0">
              <Link
                to={`/album/${currentTrack.albumId}`}
                className="block truncate text-16px text-text-base hover:underline"
              >
                {currentTrack.title}
              </Link>
              <Link
                to={`/artist/${currentTrack.artistId}`}
                className="block truncate text-12px text-text-subdued hover:text-text-base hover:underline"
              >
                {currentTrack.artistName}
              </Link>
            </div>
            <LikedSongButton music={currentTrack} />
          </>
        ) : (
          <p className="text-12px text-text-subdued">
            Nenhuma musica selecionada
          </p>
        )}
      </div>

      <div className="flex flex-1 flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={previous}
            disabled={!currentTrack}
            aria-label="Faixa anterior"
            className="text-text-subdued hover:text-text-base disabled:cursor-default disabled:opacity-40"
          >
            <FiSkipBack className="text-[20px]" />
          </button>
          <button
            type="button"
            onClick={togglePlay}
            disabled={!currentTrack}
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-text-base text-black transition hover:scale-105 disabled:cursor-default disabled:opacity-40"
          >
            {isPlaying ? (
              <FiPause className="text-[18px]" />
            ) : (
              <FiPlay className="translate-x-[1px] text-[18px]" />
            )}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!currentTrack}
            aria-label="Proxima faixa"
            className="text-text-subdued hover:text-text-base disabled:cursor-default disabled:opacity-40"
          >
            <FiSkipForward className="text-[20px]" />
          </button>
        </div>

        <div className="flex w-full max-w-[32rem] items-center gap-2">
          <span className="w-10 text-right text-11px tabular-nums text-text-subdued">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 1}
            step={1}
            value={progress}
            onChange={(event) => seek(Number(event.target.value))}
            disabled={!currentTrack}
            aria-label="Progresso da musica"
            style={progressRangeStyle}
            className="player-range flex-1 disabled:cursor-default"
          />
          <span className="w-10 text-11px tabular-nums text-text-subdued">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="hidden items-center justify-end gap-2 md:flex md:w-[30%]">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isSilent ? "Ativar som" : "Silenciar"}
          className="text-text-subdued hover:text-text-base"
        >
          {isSilent ? (
            <FiVolumeX className="text-[18px]" />
          ) : (
            <FiVolume2 className="text-[18px]" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={effectiveVolume}
          onChange={(event) => setVolume(Number(event.target.value))}
          aria-label="Volume"
          style={volumeRangeStyle}
          className="player-range w-24"
        />
      </div>
    </footer>
  );
}
