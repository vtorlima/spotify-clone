import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { ApiError } from "../services/api";
import {
  deletePlaylist,
  getPlaylistById,
  reorderPlaylistMusics,
  updatePlaylistAttributes,
} from "../services/playlistService";
import { useAsyncData } from "../hooks/useAsyncData";
import { useToast } from "../hooks/useToast";
import { usePlayerActions } from "../hooks/usePlayer";
import { PlaylistDetailsHeader } from "../components/playlist/PlaylistDetailsHeader";
import { PlaylistActionsBar } from "../components/playlist/PlaylistActionsBar";
import {
  PlaylistFormModal,
  type PlaylistFormValues,
} from "../components/playlist/PlaylistFormModal";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { SortableMusicRow } from "../components/music/SortableMusicRow";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { EmptyState } from "../components/ui/EmptyState";
import type { Music } from "../types/music";

export default function PlaylistDetailsPage() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { playTrack } = usePlayerActions();

  const fetchPlaylist = useCallback(() => {
    if (!playlistId) {
      return Promise.reject(new ApiError(400, "Playlist não informada na URL."));
    }
    return getPlaylistById(playlistId);
  }, [playlistId]);

  const { data: playlist, isLoading, error, reload } = useAsyncData(fetchPlaylist);

  const [isEditOpen, setEditOpen] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const [orderedMusics, setOrderedMusics] = useState<Music[]>([]);
  const [isReordering, setIsReordering] = useState(false);

  useEffect(() => {
    setOrderedMusics(playlist?.musics ?? []);
  }, [playlist]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  function handlePlayPlaylist() {
    if (orderedMusics.length === 0) {
      return;
    }
    playTrack(orderedMusics[0], orderedMusics);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || !playlist || isReordering) {
      return;
    }

    const oldIndex = orderedMusics.findIndex((m) => m.id === active.id);
    const newIndex = orderedMusics.findIndex((m) => m.id === over.id);
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const previous = orderedMusics;
    const next = [...orderedMusics];
    const [moved] = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved);

    setOrderedMusics(next);
    setIsReordering(true);

    try {
      await reorderPlaylistMusics(playlist.id, next.map((m) => m.id));
    } catch (caught) {
      setOrderedMusics(previous);
      const message =
        caught instanceof ApiError
          ? caught.message
          : "Não foi possível salvar a nova ordem.";
      showToast(message, "error");
    } finally {
      setIsReordering(false);
    }
  }

  async function handleEditSubmit(values: PlaylistFormValues) {
    if (!playlist) {
      return;
    }

    setSaving(true);

    try {
      await updatePlaylistAttributes(playlist.id, values);
      setEditOpen(false);
      showToast("Playlist atualizada.");
      reload();
    } catch (caught) {
      const message =
        caught instanceof ApiError
          ? caught.message
          : "Não foi possível atualizar a playlist.";
      showToast(message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleConfirmDelete() {
    if (!playlist) {
      return;
    }

    setDeleting(true);

    try {
      await deletePlaylist(playlist.id);
      showToast("Playlist excluída.");
      navigate("/playlists");
    } catch (caught) {
      const message =
        caught instanceof ApiError
          ? caught.message
          : "Não foi possível apagar a playlist.";
      showToast(message, "error");
      setDeleting(false);
    }
  }

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

      <PlaylistActionsBar
        canPlay={orderedMusics.length > 0}
        onPlay={handlePlayPlaylist}
        onEdit={() => setEditOpen(true)}
        onDelete={() => setDeleteOpen(true)}
      />

      {orderedMusics.length === 0 ? (
        <EmptyState
          title="Essa playlist ainda não tem músicas"
          description="Adicione faixas para começar a ouvir."
        />
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center gap-4 border-b border-divider px-4 pb-2 text-12px uppercase text-text-subdued">
            <span className="w-5 shrink-0" />
            <span className="w-6 shrink-0 text-right">#</span>
            <span className="w-10 shrink-0" />
            <span className="min-w-0 flex-1">Título</span>
            <span className="hidden min-w-0 flex-1 md:block">Álbum</span>
            <span className="w-6 shrink-0" />
            <span className="w-12 shrink-0 text-right">Duração</span>
            <span className="w-10 shrink-0" />
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="flex flex-col pt-2">
              {orderedMusics.map((music, index) => (
                <SortableMusicRow
                  key={music.id}
                  music={music}
                  position={index + 1}
                  queue={orderedMusics}
                  disabled={isReordering}
                />
              ))}
            </div>
          </DndContext>
        </div>
      )}

      <PlaylistFormModal
        isOpen={isEditOpen}
        mode="edit"
        initialValues={{ name: playlist.name, description: playlist.description ?? "" }}
        isSubmitting={isSaving}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEditSubmit}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Apagar playlist"
        message={`Tem certeza que deseja apagar "${playlist.name}"? Essa ação não pode ser desfeita.`}
        confirmLabel="Apagar"
        isProcessing={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteOpen(false)}
      />
    </section>
  );
}
