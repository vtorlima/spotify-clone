import { FiHeart } from "react-icons/fi";

interface LikedPlaylistCoverProps {
  className?: string;
}

const LIKED_GRADIENT = "linear-gradient(135deg, #4300b0 0%, #8ba5d8 100%)";

export function LikedPlaylistCover({ className = "" }: LikedPlaylistCoverProps) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-md ${className}`}
      style={{ backgroundImage: LIKED_GRADIENT }}
      aria-label="Capa da playlist Músicas Curtidas"
    >
      <FiHeart className="h-1/2 w-1/2 text-text-base" fill="currentColor" />
    </div>
  );
}
