import type { Music } from "../types/music";

export const LIKED_PLAYLIST_STORAGE_KEY = "likedPlaylistId";

// Nome canônico já normalizado. A playlist do seeder é "Músicas Curtidas".
export const LIKED_PLAYLIST_CANONICAL_NAME = "musicas curtidas";

/**
 * Normaliza um nome para comparação estável:
 * remove acentos, baixa a caixa e colapsa espaços (pontas e meio).
 */
export function normalizeName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "") // remove os acentos (marcas de combinação)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function isLikedPlaylistName(name: string): boolean {
  return normalizeName(name) === LIKED_PLAYLIST_CANONICAL_NAME;
}

/** Uma música está curtida se pertence à playlist curtida. */
export function isMusicLiked(music: Music, likedPlaylistId: string | null): boolean {
  return !!likedPlaylistId && music.playlistsId.includes(likedPlaylistId);
}

// --- cache do ID em localStorage ---
export function getCachedLikedPlaylistId(): string | null {
  return localStorage.getItem(LIKED_PLAYLIST_STORAGE_KEY);
}

export function saveLikedPlaylistId(id: string): void {
  localStorage.setItem(LIKED_PLAYLIST_STORAGE_KEY, id);
}

export function forgetLikedPlaylistId(): void {
  localStorage.removeItem(LIKED_PLAYLIST_STORAGE_KEY);
}
