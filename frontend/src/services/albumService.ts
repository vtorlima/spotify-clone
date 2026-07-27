import { apiGet } from "./api";
import type { Album } from "../types/album";

export function getAlbumById(albumId: string): Promise<Album> {
  return apiGet<Album>(`/album/${albumId}`);
}
