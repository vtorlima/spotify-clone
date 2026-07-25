/**
 * Converte segundos para o formato de duração usado nas playlists.
 *
 * Exemplos:
 * 57    -> "57 s"
 * 1800  -> "30min"
 * 21600 -> "6h"
 * 23580 -> "6h 33min"
 */
export function formatPlaylistDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));

  if (seconds < 60) {
    return `${seconds} s`;
  }

  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}min`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}min`;
}