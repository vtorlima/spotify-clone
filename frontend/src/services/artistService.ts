import { apiGet } from "./api";
import type { Artist } from "../types/artist";
import type { Album } from "../types/album";
import type { Music } from "../types/music";

export function getArtistById(artistId: string): Promise<Artist> {
  return apiGet<Artist>(`/artist/${artistId}`);
}

export function getAllArtists(): Promise<Artist[]> {
  return apiGet<Artist[]>("/artist");
}

export function getArtistPopularSongs(artistId: string): Promise<Music[]> {
  return apiGet<Music[]>(`/artist/${artistId}/popularMusics`);
}

export function getArtistAlbums(artistId: string): Promise<Album[]> {
  return apiGet<Album[]>(`/artist/${artistId}/albums`);
}
