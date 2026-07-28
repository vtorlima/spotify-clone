import { useCallback } from "react";
import { ApiError } from "../services/api";
import {
  addMusicToPlaylist,
  removeMusicFromPlaylist,
} from "../services/playlistService";
import { withLikedPlaylistId } from "../services/likedPlaylistService";
import { useLikedSongs } from "../stores/LikedSongsContext";

export function useLikedSongActions() {
  const { likedPlaylistId, ensureLikedPlaylistId, isLiked, markLiked, markUnliked } =
    useLikedSongs();

  const likeSong = useCallback(
    async (musicId: string) => {
      try {
        await withLikedPlaylistId((id) => addMusicToPlaylist(id, musicId));
      } catch (caught) {
        if (caught instanceof ApiError && caught.status === 400) {
          markLiked(musicId);
          return;
        }
        throw caught;
      }
      markLiked(musicId);
    },
    [markLiked]
  );

  const unlikeSong = useCallback(
    async (musicId: string) => {
      try {
        await withLikedPlaylistId((id) => removeMusicFromPlaylist(id, musicId));
      } catch (caught) {
        if (caught instanceof ApiError && caught.status === 404) {
          markUnliked(musicId);
          return;
        }
        throw caught;
      }
      markUnliked(musicId);
    },
    [markUnliked]
  );

  return { likedPlaylistId, ensureLikedPlaylistId, likeSong, unlikeSong, isLiked };
}
