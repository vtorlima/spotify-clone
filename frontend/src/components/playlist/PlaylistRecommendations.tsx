import { useState } from "react";
import { Link } from "react-router-dom";
import type { Music } from "../../types/music";
import { ApiError } from "../../services/api";
import { addMusicToPlaylist } from "../../services/playlistService";
import { useToast } from "../../hooks/useToast";

interface PlaylistRecommendationsProps {
  playlistId: string;
  recommendations: Music[];
  subtitle: string;
  onAdded: () => void;
}

export function PlaylistRecommendations({
  playlistId,
  recommendations,
  subtitle,
  onAdded,
}: PlaylistRecommendationsProps) {
  const { showToast } = useToast();
  const [addingId, setAddingId] = useState<string | null>(null);

  if (recommendations.length === 0) {
    return null;
  }

  async function handleAdd(music: Music) {
    setAddingId(music.id);
    try {
      await addMusicToPlaylist(playlistId, music.id);
      window.dispatchEvent(new Event("library:refresh"));
      showToast("Adicionada à playlist.");
      onAdded();
    } catch (caught) {
      const message =
        caught instanceof ApiError
          ? caught.message
          : "Não foi possível adicionar a música.";
      showToast(message, "error");
    } finally {
      setAddingId(null);
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-20px font-bold text-text-base">Recomendações</h2>
        <p className="text-12px text-text-subdued">{subtitle}</p>
      </div>

      <div className="flex flex-col">
        {recommendations.map((music) => (
          <div
            key={music.id}
            className="flex items-center gap-4 rounded-md px-4 py-2 transition hover:bg-background-elements"
          >
            <img
              src={music.albumCoverUrl}
              alt={`Capa do album ${music.albumTitle}`}
              className="h-10 w-10 shrink-0 rounded-sm object-cover"
            />

            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-16px text-text-base">
                {music.title}
              </span>
              <Link
                to={`/artist/${music.artistId}`}
                className="truncate text-12px text-text-subdued hover:text-text-base hover:underline"
              >
                {music.artistName}
              </Link>
            </div>

            <Link
              to={`/album/${music.albumId}`}
              className="hidden min-w-0 flex-1 truncate text-12px text-text-subdued hover:text-text-base hover:underline md:block"
            >
              {music.albumTitle}
            </Link>

            <button
              type="button"
              onClick={() => handleAdd(music)}
              disabled={addingId === music.id}
              className="shrink-0 rounded-full border border-text-subdued px-4 py-1.5 text-12px font-semibold text-text-base transition hover:border-text-base disabled:cursor-default disabled:opacity-50"
            >
              Adicionar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
