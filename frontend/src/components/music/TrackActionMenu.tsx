import { ActionMenu, type ActionMenuItem } from "../ui/ActionMenu";
import { useAddToPlaylist } from "../../hooks/useAddToPlaylist";

interface TrackActionMenuProps {
  musicId: string;
}

export function TrackActionMenu({ musicId }: TrackActionMenuProps) {
  const { playlists, isLoading, loadPlaylists, addToPlaylist } = useAddToPlaylist();

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
        onSelect: () => addToPlaylist(playlist.id, musicId),
      })),
    ];
  }

  return (
    <ActionMenu ariaLabel="Adicionar à playlist" items={items} onOpen={loadPlaylists} />
  );
}
