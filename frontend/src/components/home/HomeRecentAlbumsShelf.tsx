import { useCallback } from "react";
import { getUserRecentAlbums } from "../../services/albumService";
import { useAsyncData } from "../../hooks/useAsyncData";
import { AlbumCard } from "../album/AlbumCard";
import { LoadingState } from "../ui/LoadingState";
import { ErrorState } from "../ui/ErrorState";
import { EmptyState } from "../ui/EmptyState";
import { HomeShelf } from "./HomeShelf";

const MAX_VISIBLE_ALBUMS = 4;

export function HomeRecentAlbumsShelf() {
  const fetchAlbums = useCallback(() => getUserRecentAlbums(), []);
  const { data: albums, isLoading, error, reload } = useAsyncData(fetchAlbums);

  const visibleAlbums = albums?.slice(0, MAX_VISIBLE_ALBUMS) ?? [];
  const hasAlbums = visibleAlbums.length > 0;

  return (
    <HomeShelf title="Álbuns em destaque">
      {isLoading && <LoadingState message="Carregando álbuns..." />}

      {!isLoading && error && (
        <ErrorState
          message="Não foi possível carregar os álbuns."
          detail={error.message}
          onRetry={reload}
        />
      )}

      {!isLoading && !error && !hasAlbums && (
        <EmptyState
          title="Nenhum álbum encontrado"
          description="Quando houver álbuns recentes, eles aparecem aqui."
        />
      )}

      {!isLoading && !error && hasAlbums && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibleAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </HomeShelf>
  );
}
