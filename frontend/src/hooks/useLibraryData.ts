import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/api";
import { getUserPlaylists } from "../services/playlistService";
import { getUserRecentArtists } from "../services/artistService";
import { getUserRecentAlbums } from "../services/albumService";
import type { PlaylistSummary } from "../types/playlist";
import type { Artist } from "../types/artist";
import type { AlbumSummary } from "../types/album";

interface LibraryData {
  playlists: PlaylistSummary[];
  artists: Artist[];
  albums: AlbumSummary[];
  isLoading: boolean;
  error: ApiError | null;
  reload: () => void;
}

export function useLibraryData(): LibraryData {
  const [playlists, setPlaylists] = useState<PlaylistSummary[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<AlbumSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const [playlistsResult, artistsResult, albumsResult] = await Promise.all(
          [getUserPlaylists(), getUserRecentArtists(), getUserRecentAlbums()]
        );

        if (!ignore) {
          setPlaylists(playlistsResult);
          setArtists(artistsResult);
          setAlbums(albumsResult);
        }
      } catch (caught) {
        if (!ignore) {
          setError(
            caught instanceof ApiError
              ? caught
              : new ApiError(0, "Ocorreu um erro inesperado. Tente novamente.")
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [reloadIndex]);

  useEffect(() => {
    function handleLibraryRefresh() {
      setReloadIndex((current) => current + 1);
    }

    window.addEventListener("library:refresh", handleLibraryRefresh);

    return () => {
      window.removeEventListener("library:refresh", handleLibraryRefresh);
    };
  }, []);

  const reload = useCallback(() => {
    setReloadIndex((current) => current + 1);
  }, []);

  return { playlists, artists, albums, isLoading, error, reload };
}
