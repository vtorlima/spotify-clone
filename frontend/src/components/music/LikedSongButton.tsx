import { useEffect, useState } from "react";
import { FiCheck, FiPlus } from "react-icons/fi";
import type { Music } from "../../types/music";
import { useLikedSongActions } from "../../hooks/useLikedSongActions";
import { useToast } from "../../hooks/useToast";

interface LikedSongButtonProps {
  music: Music;
  variant?: "player" | "row";
  className?: string;
}

export function LikedSongButton({
  music,
  variant = "player",
  className = "",
}: LikedSongButtonProps) {
  const { ensureLikedPlaylistId, isLiked, likeSong, unlikeSong } = useLikedSongActions();
  const { showToast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    void ensureLikedPlaylistId();
  }, [ensureLikedPlaylistId]);

  const liked = isLiked(music);

  async function handleToggle() {
    setIsProcessing(true);

    try {
      if (liked) {
        await unlikeSong(music.id);
      } else {
        await likeSong(music.id);
      }
    } catch {
      showToast("Não foi possível atualizar suas curtidas.", "error");
    } finally {
      setIsProcessing(false);
    }
  }

  const visibilityClass =
    variant === "row" && !liked
      ? "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
      : "";

  const spacingClass = variant === "player" ? "ml-2" : "";

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isProcessing}
      aria-pressed={liked}
      aria-label={liked ? "Remover de Músicas Curtidas" : "Adicionar a Músicas Curtidas"}
      className={`${spacingClass} flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition disabled:opacity-50 ${
        liked ? "bg-accent text-black" : "text-text-subdued hover:text-text-base"
      } ${visibilityClass} ${className}`}
    >
      {liked ? (
        <FiCheck className="text-[14px]" />
      ) : (
        <FiPlus className="text-[18px]" />
      )}
    </button>
  );
}
