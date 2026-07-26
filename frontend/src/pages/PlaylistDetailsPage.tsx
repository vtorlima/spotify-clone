import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiError } from "../services/api";
import { getPlaylistById } from "../services/playlistService";
import { useAsyncData } from "../hooks/useAsyncData";
import { PlaylistDetailsHeader } from "../components/playlist/PlaylistDetailsHeader";
import { MusicRow } from "../components/music/MusicRow";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";

export default function PlaylistDetailsPage() {
  const { playlistId } = useParams<{ playlistId: string }>();

  const fetchPlaylist = useCallback(() => {
    if (!playlistId) {
      return Promise.reject(new ApiError(400, "Playlist não informada na URL."));
    }
    return getPlaylistById(playlistId);
  }, [playlistId]);

  const { data: playlist, isLoading, error, reload } = useAsyncData(fetchPlaylist);

  if (isLoading) {
    return <LoadingState message="Carregando playlist..." />;
  }

  if (error?.status === 404) {
    return (
      <ErrorState
        message="Playlist não encontrada."
        detail="Ela pode ter sido removida."
        action={
          <Link
            to="/playlists"
            className="rounded-full bg-accent px-6 py-2 text-16px font-semibold text-black transition hover:brightness-110"
          >
            Ver todas as playlists
          </Link>
        }
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message="Não foi possível carregar a playlist."
        detail={error.message}
        onRetry={reload}
      />
    );
  }

  if (!playlist) {
    return null;
  }

  return (
    <section className="flex flex-col gap-8 p-6">
      <PlaylistDetailsHeader playlist={playlist} />

      {playlist.musics.length === 0 ? (
        <EmptyState
          title="Essa playlist ainda não tem músicas"
          description="Adicione faixas para começar a ouvir."
        />
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-4 border-b border-divider px-4 pb-2 text-12px uppercase text-text-subdued">
            <span className="w-6 shrink-0 text-right">#</span>
            <span className="w-10 shrink-0" />
            <span className="min-w-0 flex-1">Título</span>
            <span className="hidden min-w-0 flex-1 md:block">Álbum</span>
            <span className="w-12 shrink-0 text-right">Duração</span>
          </div>

          <div className="flex flex-col pt-2">
            {playlist.musics.map((music, index) => (
              <MusicRow key={music.id} music={music} position={index + 1} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
