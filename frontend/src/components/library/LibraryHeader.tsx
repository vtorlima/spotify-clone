import { FiPlus } from "react-icons/fi";

interface LibraryHeaderProps {
  onCreatePlaylist: () => void;
}

export function LibraryHeader({ onCreatePlaylist }: LibraryHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <h1 className="text-16px font-bold text-text-base">Sua Biblioteca</h1>

      <button
        type="button"
        onClick={onCreatePlaylist}
        aria-label="Criar playlist"
        className="inline-flex items-center gap-2 rounded-full bg-background-elements px-3 py-2 text-12px font-semibold text-text-base transition hover:bg-background-highlight"
      >
        <FiPlus className="text-[16px]" />
        Criar
      </button>
    </div>
  );
}
