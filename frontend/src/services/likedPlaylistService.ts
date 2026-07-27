import { ApiError } from "./api";
import { getUserPlaylists } from "./playlistService";
import {
  forgetLikedPlaylistId,
  getCachedLikedPlaylistId,
  isLikedPlaylistName,
  saveLikedPlaylistId,
} from "../utils/likedPlaylist";

export async function resolveLikedPlaylistId(): Promise<string> {
  const cached = getCachedLikedPlaylistId();
  if (cached) {
    return cached;
  }
  return discoverLikedPlaylistId();
}

async function discoverLikedPlaylistId(): Promise<string> {
  const playlists = await getUserPlaylists();
  const liked = playlists.find((playlist) => isLikedPlaylistName(playlist.name));

  if (!liked) {
    throw new ApiError(404, 'Playlist "Músicas Curtidas" não encontrada.');
  }

  saveLikedPlaylistId(liked.id);
  return liked.id;
}

export async function withLikedPlaylistId<T>(
  action: (likedPlaylistId: string) => Promise<T>
): Promise<T> {
  const id = await resolveLikedPlaylistId();

  try {
    return await action(id);
  } catch (caught) {
    if (caught instanceof ApiError && caught.status === 404) {
      forgetLikedPlaylistId();
      const freshId = await discoverLikedPlaylistId();

      if (freshId !== id) {
        return action(freshId); 
      }
    }
    throw caught; 
  }
}
