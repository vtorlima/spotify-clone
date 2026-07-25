import { apiGet } from "./api";
import type { PlaylistSummary } from "../types/playlist";

export function getUserPlaylists(): Promise<PlaylistSummary[]> {
  return apiGet<PlaylistSummary[]>("/user/playlists");
}
