import { useCallback } from "react";
import { getUserPlaylists } from "../../services/playlistService";
import { useAsyncData } from "../../hooks/useAsyncData";
import { PlaylistCard } from "../playlist/PlaylistCard";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";
import { EmptyState } from "../ui/EmptyState";
import { HomeShelf } from "./HomeShelf";

const MAX_VISIBLE_PLAYLISTS = 4;

export function HomePlaylistsShelf() {
  const fetchPlaylists = useCallback(() => getUserPlaylists(), []);
  const { data: playlists, isLoading, error, reload } =
    useAsyncData(fetchPlaylists);

  const visiblePlaylists = playlists?.slice(0, MAX_VISIBLE_PLAYLISTS) ?? [];
  const hasPlaylists = visiblePlaylists.length > 0;

  return (
    <HomeShelf
      title="Suas playlists"
      actionLabel={hasPlaylists ? "Mostrar tudo" : undefined}
      actionTo={hasPlaylists ? "/playlists" : undefined}
    >
      {isLoading && <LoadingState message="Carregando suas playlists..." />}

      {!isLoading && error && (
        <ErrorState
          message="Não foi possível carregar suas playlists."
          detail={error.message}
          onRetry={reload}
        />
      )}

      {!isLoading && !error && !hasPlaylists && (
        <EmptyState
          title="Você ainda não tem playlists"
          description="Quando você criar uma playlist, ela aparece aqui."
        />
      )}

      {!isLoading && !error && hasPlaylists && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visiblePlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      )}
    </HomeShelf>
  );
}
