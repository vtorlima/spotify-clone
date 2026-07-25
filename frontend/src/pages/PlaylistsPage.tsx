import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/api";
import { getUserPlaylists } from "../services/playlistService";
import type { PlaylistSummary } from "../types/playlist";
import { PlaylistCard } from "../components/playlist/PlaylistCard";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<PlaylistSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function loadPlaylists() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await getUserPlaylists();
        if (!ignore) {
          setPlaylists(data);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(
            error instanceof ApiError
              ? error.message
              : "Não foi possível carregar as playlists. Tente novamente."
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadPlaylists();

    return () => {
      ignore = true;
    };
  }, [reloadIndex]);

  const handleRetry = useCallback(() => {
    setReloadIndex((current) => current + 1);
  }, []);

  return (
    <section className="flex flex-col gap-6 p-6">
      <h1 className="text-20px font-bold text-text-base">Suas playlists</h1>

      {isLoading && <LoadingState message="Carregando suas playlists..." />}

      {!isLoading && errorMessage && (
        <ErrorState message={errorMessage} onRetry={handleRetry} />
      )}

      {!isLoading && !errorMessage && playlists.length === 0 && (
        <EmptyState
          title="Você ainda não tem playlists"
          description="Quando você criar uma playlist, ela aparece aqui."
        />
      )}

      {!isLoading && !errorMessage && playlists.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}
    </section>
  );
}
