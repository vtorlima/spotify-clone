import type { Music } from "../types/music";

const MAX_RECOMMENDATIONS = 10;

function mostPlayed(allMusics: Music[], limit: number): Music[] {
  return [...allMusics]
    .sort((a, b) => b.timesListen - a.timesListen)
    .slice(0, limit);
}

export function recommendPlaylistMusics(
  playlistMusics: Music[],
  allMusics: Music[]
): Music[] {
  if (playlistMusics.length === 0) {
    return mostPlayed(allMusics, MAX_RECOMMENDATIONS);
  }

  const playlistIds = new Set(playlistMusics.map((music) => music.id));
  const selectedIds = new Set<string>();
  const result: Music[] = [];

  const seeds =
    playlistMusics.length > MAX_RECOMMENDATIONS
      ? playlistMusics.slice(-MAX_RECOMMENDATIONS)
      : playlistMusics;

  function candidatesFor(seed: Music): Music[] {
    const sameAlbum = allMusics.filter(
      (music) => music.albumId === seed.albumId && !playlistIds.has(music.id)
    );
    const sameArtist = allMusics.filter(
      (music) => music.artistId === seed.artistId && !playlistIds.has(music.id)
    );
    return [...sameAlbum, ...sameArtist];
  }

  function take(seed: Music, limit: number) {
    let added = 0;
    for (const candidate of candidatesFor(seed)) {
      if (result.length >= MAX_RECOMMENDATIONS || added >= limit) {
        break;
      }
      if (selectedIds.has(candidate.id)) {
        continue;
      }
      result.push(candidate);
      selectedIds.add(candidate.id);
      added += 1;
    }
  }

  const perSeed = Math.max(1, Math.floor(MAX_RECOMMENDATIONS / seeds.length));

  for (const seed of seeds) {
    take(seed, perSeed);
  }

  for (const seed of seeds) {
    if (result.length >= MAX_RECOMMENDATIONS) {
      break;
    }
    take(seed, MAX_RECOMMENDATIONS);
  }

  return result;
}
