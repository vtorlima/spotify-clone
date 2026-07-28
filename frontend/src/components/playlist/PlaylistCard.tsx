import { useState } from "react";
import { Link } from "react-router-dom";
import type { PlaylistSummary } from "../../types/playlist";
import { formatPlaylistDuration } from "../../utils/formatDuration";
import { isLikedPlaylistName } from "../../utils/likedPlaylist";
import { getPlaylistById } from "../../services/playlistService";
import { usePlayerActions, usePlayerState } from "../../hooks/usePlayer";
import { useToast } from "../../hooks/useToast";
import { PlayButton } from "../ui/PlayButton";
import { PlaylistCover } from "./PlaylistCover";

interface PlaylistCardProps {
  playlist: PlaylistSummary;
}

export function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { currentTrack, isPlaying, sourceId } = usePlayerState();
  const { playTrack, togglePlay } = usePlayerActions();
  const { showToast } = useToast();
  const [isStarting, setStarting] = useState(false);

  const musicLabel = playlist.musicQtd === 1 ? "música" : "músicas";
  const isEmpty = playlist.musicQtd === 0;

  // Mesmo esquema "playlist:<id>" do item da biblioteca lateral, p/ sincronizar.
  const playlistSource = `playlist:${playlist.id}`;
  const isActivePlaylist = sourceId === playlistSource && currentTrack !== null;
  const isPlayingThis = isActivePlaylist && isPlaying;

  async function handlePlay() {
    if (isEmpty || isStarting) {
      return;
    }

    if (isActivePlaylist) {
      togglePlay();
      return;
    }

    setStarting(true);
    try {
      const fullPlaylist = await getPlaylistById(playlist.id);
      if (fullPlaylist.musics.length === 0) {
        return;
      }
      playTrack(fullPlaylist.musics[0], fullPlaylist.musics, playlistSource);
    } catch {
      showToast("Não foi possível tocar a playlist.", "error");
    } finally {
      setStarting(false);
    }
  }

  const revealClass = isPlayingThis
    ? "pointer-events-auto translate-y-0 opacity-100"
    : "pointer-events-none translate-y-1 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100";

  return (
    <article className="group flex flex-col gap-3 rounded-lg bg-background-base p-4 transition-colors hover:bg-background-highlight">
      <div className="relative aspect-square w-full">
        <Link
          to={`/playlist/${playlist.id}`}
          aria-label={`Abrir playlist ${playlist.name}`}
          className="block h-full w-full"
        >
          <PlaylistCover
            coverImageUrls={playlist.coverImageUrls}
            variant={isLikedPlaylistName(playlist.name) ? "liked" : "default"}
            className="h-full w-full"
          />
        </Link>

        {!isEmpty && (
          <PlayButton
            as="button"
            size="sm"
            playing={isPlayingThis}
            ariaLabel={isPlayingThis ? `Pausar ${playlist.name}` : `Tocar ${playlist.name}`}
            disabled={isStarting}
            onClick={handlePlay}
            className={`absolute right-2 bottom-2 duration-150 ${revealClass}`}
          />
        )}
      </div>

      <Link to={`/playlist/${playlist.id}`} className="flex flex-col gap-1">
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
      </Link>
    </article>
  );
}
