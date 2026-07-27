import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiError } from "../services/api";
import { getAlbumById } from "../services/albumService";
import { useAsyncData } from "../hooks/useAsyncData";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { AlbumHeader } from "../components/album/AlbumHeader";
import { AlbumTrackList } from "../components/album/AlbumTrackList";

export default function AlbumPage() {
  const { albumId } = useParams<{ albumId: string }>();

  const fetchAlbum = useCallback(() => {
    if (!albumId) {
      return Promise.reject(new ApiError(400, "Álbum não informado na URL."));
    }
    return getAlbumById(albumId);
  }, [albumId]);

  const { data: album, isLoading, error, reload } = useAsyncData(fetchAlbum);

  if (isLoading) {
    return <LoadingState message="Carregando álbum..." />;
  }

  if (error?.status === 404) {
    return (
      <ErrorState
        message="Álbum não encontrado."
        detail="Ele pode ter sido removido."
        action={
          <Link
            to="/"
            className="rounded-full bg-accent px-6 py-2 text-16px font-semibold text-black transition hover:brightness-110"
          >
            Voltar ao início
          </Link>
        }
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message="Não foi possível carregar o álbum."
        detail={error.message}
        onRetry={reload}
      />
    );
  }

  if (!album) {
    return null;
  }

  return (
    <section className="flex flex-col gap-8 p-6">
      <AlbumHeader album={album} />
      <AlbumTrackList tracks={album.musics} />
    </section>
  );
}
