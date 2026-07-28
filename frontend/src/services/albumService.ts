import { apiGet } from "./api";
import type { Album, AlbumSummary } from "../types/album";

export function getAlbumById(albumId: string): Promise<Album> {
  return apiGet<Album>(`/album/${albumId}`);
}

export function getAllAlbums(): Promise<AlbumSummary[]> {
  return apiGet<AlbumSummary[]>("/album");
}
