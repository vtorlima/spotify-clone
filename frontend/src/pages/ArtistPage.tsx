import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiError } from "../services/api";
import {
  getArtistById,
  getArtistPopularSongs,
  getArtistAlbums,
} from "../services/artistService";
import { useAsyncData } from "../hooks/useAsyncData";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";

export default function ArtistPage() {
  const { artistId } = useParams<{ artistId: string }>();

  const fetchArtist = useCallback(() => {
    if (!artistId) {
      return Promise.reject(new ApiError(400, "Artista não informado na URL."));
    }
    return Promise.all([
      getArtistById(artistId),
      getArtistPopularSongs(artistId),
      getArtistAlbums(artistId),
    ]).then(([artist, popularSongs, albums]) => ({ artist, popularSongs, albums }));
  }, [artistId]);

  const { data, isLoading, error, reload } = useAsyncData(fetchArtist);

  if (isLoading) {
    return <LoadingState message="Carregando artista..." />;
  }

  if (error?.status === 404) {
    return (
      <ErrorState
        message="Artista não encontrado."
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
        message="Não foi possível carregar o artista."
        detail={error.message}
        onRetry={reload}
      />
    );
  }

  if (!data) {
    return null;
  }

  const { artist, popularSongs, albums } = data;

  // UI completa (header, populares, sobre, discografia) chega no próximo commit.
  return (
    <section className="flex flex-col gap-8 p-6">
      <h1 className="text-64px font-bold leading-none text-text-base">{artist.name}</h1>
      <p className="text-12px text-text-subdued">
        {popularSongs.length} músicas populares · {albums.length} álbuns
      </p>
    </section>
  );
}
