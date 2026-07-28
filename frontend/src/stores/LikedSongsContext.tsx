import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Music } from "../types/music";
import { resolveLikedPlaylistId } from "../services/likedPlaylistService";
import { getCachedLikedPlaylistId, isMusicLiked } from "../utils/likedPlaylist";

interface LikedSongsContextValue {
  likedPlaylistId: string | null;
  ensureLikedPlaylistId: () => Promise<string>;
  isLiked: (music: Music) => boolean;
  markLiked: (musicId: string) => void;
  markUnliked: (musicId: string) => void;
}

const LikedSongsContext = createContext<LikedSongsContextValue | null>(null);

export function LikedSongsProvider({ children }: { children: ReactNode }) {
  const [likedPlaylistId, setLikedPlaylistId] = useState<string | null>(
    getCachedLikedPlaylistId()
  );
  const [likedOverrides, setLikedOverrides] = useState<Set<string>>(() => new Set());
  const [unlikedOverrides, setUnlikedOverrides] = useState<Set<string>>(() => new Set());

  const ensureLikedPlaylistId = useCallback(async () => {
    const id = await resolveLikedPlaylistId();
    setLikedPlaylistId(id);
    return id;
  }, []);

  const markLiked = useCallback((musicId: string) => {
    setLikedOverrides((current) => new Set(current).add(musicId));
    setUnlikedOverrides((current) => {
      if (!current.has(musicId)) {
        return current;
      }
      const next = new Set(current);
      next.delete(musicId);
      return next;
    });
  }, []);

  const markUnliked = useCallback((musicId: string) => {
    setUnlikedOverrides((current) => new Set(current).add(musicId));
    setLikedOverrides((current) => {
      if (!current.has(musicId)) {
        return current;
      }
      const next = new Set(current);
      next.delete(musicId);
      return next;
    });
  }, []);

  const isLiked = useCallback(
    (music: Music) => {
      if (likedOverrides.has(music.id)) {
        return true;
      }
      if (unlikedOverrides.has(music.id)) {
        return false;
      }
      return isMusicLiked(music, likedPlaylistId);
    },
    [likedPlaylistId, likedOverrides, unlikedOverrides]
  );

  const value = useMemo(
    () => ({ likedPlaylistId, ensureLikedPlaylistId, isLiked, markLiked, markUnliked }),
    [likedPlaylistId, ensureLikedPlaylistId, isLiked, markLiked, markUnliked]
  );

  return (
    <LikedSongsContext.Provider value={value}>{children}</LikedSongsContext.Provider>
  );
}

export function useLikedSongs(): LikedSongsContextValue {
  const context = useContext(LikedSongsContext);

  if (!context) {
    throw new Error("useLikedSongs precisa estar dentro de LikedSongsProvider.");
  }

  return context;
}
