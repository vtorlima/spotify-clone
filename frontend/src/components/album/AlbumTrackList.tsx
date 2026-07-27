import type { Music } from "../../types/music";
import { MusicRow } from "../music/MusicRow";
import { EmptyState } from "../ui/EmptyState";

interface AlbumTrackListProps {
  tracks: Music[];
}

export function AlbumTrackList({ tracks }: AlbumTrackListProps) {
  if (tracks.length === 0) {
    return <EmptyState title="Este álbum ainda não tem faixas." />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 border-b border-divider px-4 pb-2 text-12px uppercase text-text-subdued">
        <span className="w-6 shrink-0 text-right">#</span>
        <span className="w-10 shrink-0" />
        <span className="min-w-0 flex-1">Título</span>
        <span className="w-12 shrink-0 text-right">Duração</span>
      </div>

      <div className="flex flex-col pt-2">
        {tracks.map((music, index) => (
          <MusicRow key={music.id} music={music} position={index + 1} queue={tracks} />
        ))}
      </div>
    </div>
  );
}
