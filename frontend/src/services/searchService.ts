import { getAllMusics } from "./musicService";
import { getAllArtists } from "./artistService";
import { getAllAlbums } from "./albumService";
import type { Music } from "../types/music";
import type { Artist } from "../types/artist";
import type { AlbumSummary } from "../types/album";
import type { SearchItem } from "../types/search";

function mapMusic(music: Music): SearchItem {
  return {
    id: music.id,
    type: "music",
    title: music.title,
    subtitle: music.artistName,
    imageUrl: music.albumCoverUrl,
    data: music,
  };
}

function mapArtist(artist: Artist): SearchItem {
  return {
    id: artist.id,
    type: "artist",
    title: artist.name,
    subtitle: "Artista",
    imageUrl: artist.photoUrl,
    data: artist,
  };
}

function mapAlbum(album: AlbumSummary): SearchItem {
  return {
    id: album.id,
    type: "album",
    title: album.title,
    subtitle: album.artistName,
    imageUrl: album.coverUrl,
    data: album,
  };
}

export async function buildSearchIndex(): Promise<SearchItem[]> {
  const [musics, artists, albums] = await Promise.all([
    getAllMusics(),
    getAllArtists(),
    getAllAlbums(),
  ]);

  return [
    ...musics.map(mapMusic),
    ...artists.map(mapArtist),
    ...albums.map(mapAlbum),
  ];
}
