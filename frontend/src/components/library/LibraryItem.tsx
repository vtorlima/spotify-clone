import { useState } from "react";
import { Link } from "react-router-dom";
import type { Music } from "../../types/music";
import { getPlaylistById } from "../../services/playlistService";
import { getAlbumById } from "../../services/albumService";
import { getArtistPopularSongs } from "../../services/artistService";
import { usePlayerActions, usePlayerState } from "../../hooks/usePlayer";
import { useToast } from "../../hooks/useToast";
import { PlayButton } from "../ui/PlayButton";
import { PlaylistCover } from "../playlist/PlaylistCover";

export type LibraryItemData =
  | { type: "liked"; id: string; title: string; subtitle: string; to: string }
  | {
      type: "playlist";
      id: string;
      title: string;
      subtitle: string;
      to: string;
      coverImageUrls: string[];
    }
  | {
      type: "artist";
      id: string;
      title: string;
      subtitle: string;
      to: string;
      imageUrl: string;
    }
  | {
      type: "album";
      id: string;
      title: string;
      subtitle: string;
      to: string;
      imageUrl: string;
    };

interface LibraryItemProps {
  item: LibraryItemData;
}

// Origem da fila. "liked" é uma playlist, então compartilha o mesmo esquema
// "playlist:<id>" para ficar em sincronia com os cards de playlist.
function sourceIdFor(item: LibraryItemData): string {
  if (item.type === "liked") {
    return `playlist:${item.id}`;
  }
  return `${item.type}:${item.id}`;
}

async function fetchQueue(item: LibraryItemData): Promise<Music[]> {
  if (item.type === "liked" || item.type === "playlist") {
    return (await getPlaylistById(item.id)).musics;
  }
  if (item.type === "album") {
    return (await getAlbumById(item.id)).musics;
  }
  return getArtistPopularSongs(item.id);
}

export function LibraryItem({ item }: LibraryItemProps) {
  const { currentTrack, isPlaying, sourceId } = usePlayerState();
  const { playTrack, togglePlay } = usePlayerActions();
  const { showToast } = useToast();
  const [isStarting, setStarting] = useState(false);

  const itemSource = sourceIdFor(item);
  const isActive = sourceId === itemSource && currentTrack !== null;
  const isPlayingThis = isActive && isPlaying;

  async function handlePlay() {
    if (isStarting) {
      return;
    }

    // Se já é esta origem, só alterna play/pause (sem refazer o fetch).
    if (isActive) {
      togglePlay();
      return;
    }

    setStarting(true);
    try {
      const queue = await fetchQueue(item);
      if (queue.length === 0) {
        return;
      }
      playTrack(queue[0], queue, itemSource);
    } catch {
      showToast("Não foi possível tocar.", "error");
    } finally {
      setStarting(false);
    }
  }

  const shapeClass = item.type === "artist" ? "rounded-full" : "rounded-md";
  // Enquanto esta origem toca, o overlay fica fixo (pause); senão, só no hover.
  const overlayReveal = isPlayingThis
    ? "opacity-100"
    : "opacity-0 group-hover:opacity-100";

  return (
    <article className="group flex min-w-0 items-center gap-3 rounded-md p-2 transition-colors hover:bg-background-elements">
      <button
        type="button"
        onClick={handlePlay}
        disabled={isStarting}
        aria-label={
          isPlayingThis ? `Pausar ${item.title}` : `Tocar ${item.title}`
        }
        className={`relative h-12 w-12 shrink-0 overflow-hidden ${shapeClass}`}
      >
        <LibraryItemThumb item={item} />

        <span
          className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-150 ${overlayReveal}`}
        >
          <PlayButton as="span" size="xs" playing={isPlayingThis} />
        </span>
      </button>

      <Link to={item.to} className="min-w-0 flex-1">
        <p
          className={`truncate text-16px font-semibold ${
            isActive ? "text-accent" : "text-text-base"
          }`}
        >
          {item.title}
        </p>
        <p className="truncate text-12px text-text-subdued">{item.subtitle}</p>
      </Link>
    </article>
  );
}

function LibraryItemThumb({ item }: LibraryItemProps) {
  if (item.type === "liked") {
    return <PlaylistCover variant="liked" coverImageUrls={[]} className="h-full w-full" />;
  }

  if (item.type === "playlist") {
    return (
      <PlaylistCover coverImageUrls={item.coverImageUrls} className="h-full w-full" />
    );
  }

  return (
    <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
  );
}
