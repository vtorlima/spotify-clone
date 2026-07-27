import type { Music } from "./music";

export interface PlaylistSummary {
  id: string;
  name: string;
  description: string | null;
  musicQtd: number;
  duration: number;
  coverImageUrls: string[];
  createdAt: string;
  updatedAt: string | null;
}

export interface Playlist extends PlaylistSummary {
  musics: Music[];
}

export interface CreatePlaylistInput {
  name: string;
  description?: string;
}

export interface UpdatePlaylistInput {
  name?: string;
  description?: string;
}