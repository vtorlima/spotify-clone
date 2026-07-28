import { useNavigate } from "react-router-dom";
import { FiDisc, FiPlus, FiUser } from "react-icons/fi";
import { useAddToPlaylist } from "./useAddToPlaylist";
import type { MenuItem } from "../types/menu";
import type { Music } from "../types/music";

export function useTrackMenuItems(music: Music | null): {
  items: MenuItem[];
  loadPlaylists: () => void;
} {
  const navigate = useNavigate();
  const { playlists, isLoading, loadPlaylists, addToPlaylist } = useAddToPlaylist();

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

  return {
    loadPlaylists,
    items: [
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
    ],
  };
}
