import { useCallback, useState } from "react";
import { ApiError } from "../services/api";
import {
  addMusicToPlaylist,
  removeMusicFromPlaylist,
} from "../services/playlistService";
import {
  resolveLikedPlaylistId,
  withLikedPlaylistId,
} from "../services/likedPlaylistService";
import { getCachedLikedPlaylistId, isMusicLiked } from "../utils/likedPlaylist";
import type { Music } from "../types/music";

export function useLikedSongActions() {
  const [likedPlaylistId, setLikedPlaylistId] = useState<string | null>(
    getCachedLikedPlaylistId()
  );

  const ensureLikedPlaylistId = useCallback(async () => {
    const id = await resolveLikedPlaylistId();
    setLikedPlaylistId(id);
    return id;
  }, []);

  const likeSong = useCallback(async (musicId: string) => {
    try {
      await withLikedPlaylistId((id) => addMusicToPlaylist(id, musicId));
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 400) {
        return;
      }
      throw caught;
    }
  }, []);

  const unlikeSong = useCallback(async (musicId: string) => {
    try {
      await withLikedPlaylistId((id) => removeMusicFromPlaylist(id, musicId));
    } catch (caught) {
      if (caught instanceof ApiError && caught.status === 404) {
        return;
      }
      throw caught;
    }
  }, []);

  const isLiked = useCallback(
    (music: Music) => isMusicLiked(music, likedPlaylistId),
    [likedPlaylistId]
  );

  return { likedPlaylistId, ensureLikedPlaylistId, likeSong, unlikeSong, isLiked };
}
