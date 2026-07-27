import { useEffect, useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import type { Music } from "../../types/music";
import { useLikedSongActions } from "../../hooks/useLikedSongActions";
import { useToast } from "../../hooks/useToast";

interface LikedSongButtonProps {
  music: Music;
}

export function LikedSongButton({ music }: LikedSongButtonProps) {
  const { ensureLikedPlaylistId, likeSong, unlikeSong } = useLikedSongActions();
  const { showToast } = useToast();

  const [isLiked, setIsLiked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let ignore = false;

    ensureLikedPlaylistId()
      .then((likedId) => {
        if (!ignore) {
          setIsLiked(music.playlistsId.includes(likedId));
        }
      })
      .catch(() => {
        if (!ignore) {
          setIsLiked(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [music.id, music.playlistsId, ensureLikedPlaylistId]);

  async function handleToggle() {
    setIsProcessing(true);

    try {
      if (isLiked) {
        await unlikeSong(music.id);
        setIsLiked(false); 
      } else {
        await likeSong(music.id);
        setIsLiked(true);
      }
    } catch {
      showToast("Não foi possível atualizar suas curtidas.", "error");
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isProcessing}
      aria-pressed={isLiked}
      aria-label={isLiked ? "Remover de Músicas Curtidas" : "Adicionar a Músicas Curtidas"}
      className={`ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition disabled:opacity-50 ${
        isLiked ? "bg-accent text-black" : "text-text-subdued hover:text-text-base"
      }`}
    >
      {isLiked ? (
        <FiCheck className="text-[14px]" />
      ) : (
        <FiPlus className="text-[18px]" />
      )}
    </button>
  );
}
