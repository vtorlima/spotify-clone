import type { Album } from "../../types/album";
import { AlbumCard } from "../album/AlbumCard";
import { EmptyState } from "../ui/EmptyState";

interface ArtistAlbumsProps {
  albums: Album[];
}

export function ArtistAlbums({ albums }: ArtistAlbumsProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-20px font-bold text-text-base">Discografia</h2>

      {albums.length === 0 ? (
        <EmptyState title="Este artista ainda não tem álbuns." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </section>
  );
}
