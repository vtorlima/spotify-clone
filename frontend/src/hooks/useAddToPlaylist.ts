import { useState } from "react";
import { ApiError } from "../services/api";
import { addMusicToPlaylist, getUserPlaylists } from "../services/playlistService";
import { useToast } from "./useToast";
import { useLikedSongs } from "../stores/LikedSongsContext";
import type { PlaylistSummary } from "../types/playlist";

export function useAddToPlaylist() {
  const { showToast } = useToast();
  const { ensureLikedPlaylistId, markLiked } = useLikedSongs();
  const [playlists, setPlaylists] = useState<PlaylistSummary[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loadPlaylists() {
    if (playlists || isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      setPlaylists(await getUserPlaylists());
    } catch {
      showToast("Não foi possível carregar suas playlists.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function addToPlaylist(playlistId: string, musicId: string) {
    try {
      await addMusicToPlaylist(playlistId, musicId);

      const likedPlaylistId = await ensureLikedPlaylistId().catch(() => null);
      if (playlistId === likedPlaylistId) {
        markLiked(musicId);
      }

      showToast("Adicionada à playlist.");
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 400) {
        const likedPlaylistId = await ensureLikedPlaylistId().catch(() => null);
        if (playlistId === likedPlaylistId) {
          markLiked(musicId);
        }

        showToast("Já está nessa playlist.", "error");
        return;
      }
      showToast("Não foi possível adicionar à playlist.", "error");
    }
  }

  return { playlists, isLoading, loadPlaylists, addToPlaylist };
}
