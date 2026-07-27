import { useState } from "react";
import { ActionMenu, type ActionMenuItem } from "../ui/ActionMenu";
import { ApiError } from "../../services/api";
import {
  addMusicToPlaylist,
  getUserPlaylists,
} from "../../services/playlistService";
import { useToast } from "../../hooks/useToast";
import type { PlaylistSummary } from "../../types/playlist";

interface TrackActionMenuProps {
  musicId: string;
}

export function TrackActionMenu({ musicId }: TrackActionMenuProps) {
  const { showToast } = useToast();
  const [playlists, setPlaylists] = useState<PlaylistSummary[] | null>(null);
  const [isLoading, setLoading] = useState(false);

  async function loadPlaylists() {
    if (playlists || isLoading) {
      return;
    }
    setLoading(true);
    try {
      setPlaylists(await getUserPlaylists());
    } catch {
      showToast("Não foi possível carregar suas playlists.", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(playlistId: string) {
    try {
      await addMusicToPlaylist(playlistId, musicId);
      showToast("Adicionada à playlist.");
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 400) {
        showToast("Já está nessa playlist.", "error");
        return;
      }
      showToast("Não foi possível adicionar à playlist.", "error");
    }
  }

  const header: ActionMenuItem = {
    id: "header",
    label: "Adicionar à playlist",
    disabled: true,
  };

  let items: ActionMenuItem[];
  if (isLoading) {
    items = [header, { id: "loading", label: "Carregando...", disabled: true }];
  } else if (!playlists || playlists.length === 0) {
    items = [header, { id: "empty", label: "Nenhuma playlist", disabled: true }];
  } else {
    items = [
      header,
      ...playlists.map((playlist) => ({
        id: playlist.id,
        label: playlist.name,
        onSelect: () => handleAdd(playlist.id),
      })),
    ];
  }

  return (
    <ActionMenu
      ariaLabel="Adicionar à playlist"
      items={items}
      onOpen={loadPlaylists}
    />
  );
}
