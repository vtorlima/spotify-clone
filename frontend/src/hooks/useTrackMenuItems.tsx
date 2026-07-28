import { useNavigate } from "react-router-dom";
import { FiDisc, FiPlus, FiTrash2, FiUser } from "react-icons/fi";
import { useAddToPlaylist } from "./useAddToPlaylist";
import { useToast } from "./useToast";
import { ApiError } from "../services/api";
import { removeMusicFromPlaylist } from "../services/playlistService";
import type { MenuItem } from "../types/menu";
import type { Music } from "../types/music";

/**
 * Contexto opcional presente apenas quando a faixa é exibida dentro de uma
 * playlist (`/playlist/:playlistId`). É o que habilita a ação
 * "Remover desta playlist" nos menus de faixa.
 */
export interface TrackPlaylistContext {
  playlistId: string;
  onRemoved?: (musicId: string) => void;
}

interface UseTrackMenuItemsOptions {
  playlistContext?: TrackPlaylistContext;
}

export function useTrackMenuItems(
  music: Music | null,
  options?: UseTrackMenuItemsOptions
): {
  items: MenuItem[];
  loadPlaylists: () => void;
} {
  const navigate = useNavigate();
  const { playlists, isLoading, loadPlaylists, addToPlaylist } = useAddToPlaylist();
  const { showToast } = useToast();

  const playlistContext = options?.playlistContext;

  async function handleRemoveFromPlaylist(musicId: string) {
    if (!playlistContext) {
      return;
    }

    try {
      await removeMusicFromPlaylist(playlistContext.playlistId, musicId);
      playlistContext.onRemoved?.(musicId);
      showToast("Música removida da playlist.");
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 404) {
        // A faixa já não está na playlist no backend: reconcilia a UI local.
        playlistContext.onRemoved?.(musicId);
        showToast("Música ou playlist não encontrada.", "error");
        return;
      }
      showToast("Não foi possível remover a música da playlist.", "error");
    }
  }

  if (!music) {
    return { items: [], loadPlaylists };
  }

  const playlistItems: MenuItem[] = isLoading
    ? [{ id: "loading", label: "Carregando...", disabled: true }]
    : !playlists || playlists.length === 0
      ? [{ id: "empty", label: "Nenhuma playlist", disabled: true }]
      : playlists.map((playlist) => ({
          id: playlist.id,
          label: playlist.name,
          onSelect: () => addToPlaylist(playlist.id, music.id),
        }));

  const items: MenuItem[] = [
    {
      id: "add-header",
      label: "Adicionar à playlist",
      icon: <FiPlus className="text-[16px]" />,
      disabled: true,
    },
    ...playlistItems,
    {
      id: "artist",
      label: "Ir para artista",
      icon: <FiUser className="text-[16px]" />,
      onSelect: () => navigate(`/artist/${music.artistId}`),
    },
    {
      id: "album",
      label: "Ir para álbum",
      icon: <FiDisc className="text-[16px]" />,
      onSelect: () => navigate(`/album/${music.albumId}`),
    },
  ];

  if (playlistContext) {
    items.push({
      id: "remove-from-playlist",
      label: "Remover desta playlist",
      icon: <FiTrash2 className="text-[16px]" />,
      variant: "danger",
      onSelect: () => {
        void handleRemoveFromPlaylist(music.id);
      },
    });
  }

  return { loadPlaylists, items };
}
