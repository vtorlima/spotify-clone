import { useMemo, useState } from "react";
import { ApiError } from "../../services/api";
import { createPlaylist } from "../../services/playlistService";
import { useLibraryData } from "../../hooks/useLibraryData";
import { useToast } from "../../hooks/useToast";
import { isLikedPlaylistName } from "../../utils/likedPlaylist";
import {
  PlaylistFormModal,
  type PlaylistFormValues,
} from "../playlist/PlaylistFormModal";
import { LibraryHeader } from "./LibraryHeader";
import { LibrarySection } from "./LibrarySection";
import type { LibraryItemData } from "./LibraryItem";

const MAX_PLAYLISTS = 15;
const MAX_ARTISTS = 3;
const MAX_ALBUMS = 2;

export function LibraryPanel() {
  const { playlists, artists, albums, isLoading, error, reload } =
    useLibraryData();
  const { showToast } = useToast();

  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);

  const items = useMemo<LibraryItemData[]>(() => {
    const likedPlaylist = playlists.find((playlist) =>
      isLikedPlaylistName(playlist.name)
    );
    const otherPlaylists = playlists.filter(
      (playlist) => !isLikedPlaylistName(playlist.name)
    );

    const result: LibraryItemData[] = [];

    // "Músicas curtidas" fica sempre fixada no topo.
    if (likedPlaylist) {
      const count = likedPlaylist.musicQtd;
      result.push({
        type: "liked",
        id: likedPlaylist.id,
        title: "Músicas curtidas",
        subtitle: `Playlist · ${count} ${count === 1 ? "música" : "músicas"}`,
        to: `/playlist/${likedPlaylist.id}`,
      });
    }

    // Os demais itens podem vir em ordem mista; usamos uma ordem determinística.
    for (const playlist of otherPlaylists.slice(0, MAX_PLAYLISTS)) {
      result.push({
        type: "playlist",
        id: playlist.id,
        title: playlist.name,
        subtitle: "Playlist",
        to: `/playlist/${playlist.id}`,
        coverImageUrls: playlist.coverImageUrls,
      });
    }

    for (const artist of artists.slice(0, MAX_ARTISTS)) {
      result.push({
        type: "artist",
        id: artist.id,
        title: artist.name,
        subtitle: "Artista",
        to: `/artist/${artist.id}`,
        imageUrl: artist.photoUrl,
      });
    }

    for (const album of albums.slice(0, MAX_ALBUMS)) {
      result.push({
        type: "album",
        id: album.id,
        title: album.title,
        subtitle: `Álbum · ${album.artistName}`,
        to: `/album/${album.id}`,
        imageUrl: album.coverUrl,
      });
    }

    return result;
  }, [playlists, artists, albums]);

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
    <div className="flex flex-col gap-4">
      <LibraryHeader onCreatePlaylist={() => setCreateOpen(true)} />

      {isLoading && (
        <p className="px-2 text-12px text-text-subdued">
          Carregando biblioteca...
        </p>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-start gap-2 px-2">
          <p className="text-12px text-text-subdued">
            Não foi possível carregar a biblioteca.
          </p>
          <button
            type="button"
            onClick={reload}
            className="text-12px font-semibold text-text-base hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!isLoading && !error && <LibrarySection items={items} />}

      <PlaylistFormModal
        isOpen={isCreateOpen}
        mode="create"
        isSubmitting={isCreating}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}
