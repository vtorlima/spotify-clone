import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./api";
import type {
  CreatePlaylistInput,
  Playlist,
  PlaylistSummary,
  UpdatePlaylistInput,
} from "../types/playlist";

export function getUserPlaylists(): Promise<PlaylistSummary[]> {
  return apiGet<PlaylistSummary[]>("/user/playlists");
}

export function getPlaylistById(playlistId: string): Promise<Playlist> {
  return apiGet<Playlist>(`/playlist/${playlistId}`);
}

export function createPlaylist(
  input: CreatePlaylistInput
): Promise<PlaylistSummary> {
  return apiPost<PlaylistSummary>("/playlist", {
    name: input.name,
    description: input.description ?? "",
  });
}

export function updatePlaylistAttributes(
  playlistId: string,
  input: UpdatePlaylistInput
): Promise<PlaylistSummary> {
  return apiPut<PlaylistSummary>(
    `/playlist/${playlistId}/attributes`,
    input
  );
}

export function deletePlaylist(playlistId: string): Promise<void> {
  return apiDelete<void>(`/playlist/${playlistId}`);
}

export function addMusicToPlaylist(
  playlistId: string,
  musicId: string
): Promise<Playlist> {
  return apiPatch<Playlist>(`/playlist/${playlistId}/${musicId}`);
}
