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
import { ArtistHeader } from "../components/artist/ArtistHeader";
import { ArtistAbout } from "../components/artist/ArtistAbout";
import { ArtistPopularSongs } from "../components/artist/ArtistPopularSongs";
import { ArtistAlbums } from "../components/artist/ArtistAlbums";

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

  return (
    <section className="flex flex-col gap-8 p-6">
      <ArtistHeader artist={artist} />
      <ArtistPopularSongs songs={popularSongs} />
      <ArtistAbout about={artist.about} />
      <ArtistAlbums albums={albums} />
    </section>
  );
}
