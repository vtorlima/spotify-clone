import type { Artist } from "../../types/artist";

interface ArtistHeaderProps {
  artist: Artist;
}

export function ArtistHeader({ artist }: ArtistHeaderProps) {
  return (
    <header
      className="relative flex flex-col gap-4 rounded-lg bg-background-elements bg-cover bg-center p-6 md:flex-row md:items-end"
      style={{ backgroundImage: `url(${artist.headerUrl})` }}
    >
      <div className="absolute inset-0 rounded-lg bg-black/50" />

      <img
        src={artist.photoUrl}
        alt={`Foto de ${artist.name}`}
        className="relative h-40 w-40 shrink-0 rounded-full object-cover shadow-2xl"
      />

      <div className="relative flex flex-col gap-2">
        <span className="text-12px font-semibold uppercase text-text-base">Artista</span>
        <h1 className="text-64px font-bold leading-none text-text-base">{artist.name}</h1>
        <p className="text-12px text-text-base">
          {artist.listeners.toLocaleString("pt-BR")} ouvintes mensais
        </p>
      </div>
    </header>
  );
}
