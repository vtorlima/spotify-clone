import { useCallback } from "react";
import { getUserPlaylists } from "../services/playlistService";
import { useAsyncData } from "../hooks/useAsyncData";
import { PlaylistCard } from "../components/playlist/PlaylistCard";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";

export function PlaylistsPage() {
  const fetchPlaylists = useCallback(() => getUserPlaylists(), []);
  const { data: playlists, isLoading, error, reload } = useAsyncData(fetchPlaylists);

  return (
    <section className="flex flex-col gap-6 p-6">
      <h1 className="text-20px font-bold text-text-base">Suas playlists</h1>

      {isLoading && <LoadingState message="Carregando suas playlists..." />}

      {!isLoading && error && (
        <ErrorState
          message="Não foi possível carregar as playlists."
          detail={error.message}
          onRetry={reload}
        />
      )}

      {!isLoading && !error && playlists?.length === 0 && (
        <EmptyState
          title="Você ainda não tem playlists"
          description="Quando você criar uma playlist, ela aparece aqui."
        />
      )}

      {!isLoading && !error && playlists && playlists.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}
    </section>
  );
}