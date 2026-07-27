import type { Music } from "../../types/music";
import { MusicRow } from "../music/MusicRow";
import { EmptyState } from "../ui/EmptyState";

interface ArtistPopularSongsProps {
  songs: Music[];
}

export function ArtistPopularSongs({ songs }: ArtistPopularSongsProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-20px font-bold text-text-base">Populares</h2>

      {songs.length === 0 ? (
        <EmptyState title="Este artista ainda não tem músicas populares." />
      ) : (
        <div className="flex flex-col">
          {songs.map((music, index) => (
            <MusicRow key={music.id} music={music} position={index + 1} queue={songs} />
          ))}
        </div>
      )}
    </section>
  );
}
