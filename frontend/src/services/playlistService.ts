import { apiGet } from "./api";
import type { Playlist, PlaylistSummary } from "../types/playlist";

export function getUserPlaylists(): Promise<PlaylistSummary[]> {
  return apiGet<PlaylistSummary[]>("/user/playlists");
}

export function getPlaylistById(playlistId: string): Promise<Playlist> {
  return apiGet<Playlist>(`/playlist/${playlistId}`);
}
