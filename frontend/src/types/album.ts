import type { Music } from "./music";

export interface AlbumSummary {
  id: string;
  title: string;
  year: string;
  coverUrl: string;
  artistId: string;
  artistName: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Album extends AlbumSummary {
  musics: Music[];
}
