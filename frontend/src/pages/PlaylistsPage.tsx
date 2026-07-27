import { useCallback, useState } from "react";
import { ApiError } from "../services/api";
import { createPlaylist, getUserPlaylists } from "../services/playlistService";
import { useAsyncData } from "../hooks/useAsyncData";
import { useToast } from "../hooks/useToast";
import { PlaylistCard } from "../components/playlist/PlaylistCard";
import {
  PlaylistFormModal,
  type PlaylistFormValues,
} from "../components/playlist/PlaylistFormModal";
import { Button } from "../components/ui/Button";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";

export function PlaylistsPage() {
  const fetchPlaylists = useCallback(() => getUserPlaylists(), []);
  const { data: playlists, isLoading, error, reload } = useAsyncData(fetchPlaylists);
  const { showToast } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);

  async function handleCreate(values: PlaylistFormValues) {
    setCreating(true);

    try {
      await createPlaylist(values);
      setCreateOpen(false);
      showToast("Playlist criada.");
      reload();
    } catch (caught) {
      const message =
        caught instanceof ApiError
          ? caught.message
          : "Não foi possível criar a playlist.";
      showToast(message, "error");
    } finally {
      setCreating(false);
    }
  }

  return (
    <section className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-20px font-bold text-text-base">Suas playlists</h1>
        <Button type="button" onClick={() => setCreateOpen(true)}>
          Criar playlist
        </Button>
      </div>

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

      <PlaylistFormModal
        isOpen={isCreateOpen}
        mode="create"
        isSubmitting={isCreating}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />
    </section>
  );
}