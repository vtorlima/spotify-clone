import { useCallback } from "react";
import { getUserRecentArtists } from "../../services/artistService";
import { useAsyncData } from "../../hooks/useAsyncData";
import { ArtistCard } from "../artist/ArtistCard";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";
import { EmptyState } from "../ui/EmptyState";
import { HomeShelf } from "./HomeShelf";

const MAX_VISIBLE_ARTISTS = 4;

export function HomeRecentArtistsShelf() {
  const fetchArtists = useCallback(() => getUserRecentArtists(), []);
  const { data: artists, isLoading, error, reload } = useAsyncData(fetchArtists);

  const visibleArtists = artists?.slice(0, MAX_VISIBLE_ARTISTS) ?? [];
  const hasArtists = visibleArtists.length > 0;

  return (
    <HomeShelf title="Artistas recentes">
      {isLoading && <LoadingState message="Carregando artistas..." />}

      {!isLoading && error && (
        <ErrorState
          message="Não foi possível carregar os artistas."
          detail={error.message}
          onRetry={reload}
        />
      )}

      {!isLoading && !error && !hasArtists && (
        <EmptyState
          title="Nenhum artista encontrado"
          description="Quando houver artistas recentes, eles aparecem aqui."
        />
      )}

      {!isLoading && !error && hasArtists && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibleArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </HomeShelf>
  );
}
