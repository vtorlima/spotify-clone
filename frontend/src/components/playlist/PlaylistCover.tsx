interface PlaylistCoverProps {
  coverImageUrls: string[];
  className?: string;
}

export function PlaylistCover({ coverImageUrls, className = "" }: PlaylistCoverProps) {
  if (coverImageUrls.length === 0) {
    return (
      <div
        className={`overflow-hidden rounded-md bg-background-elements ${className}`}
        aria-label="Playlist sem capa"
      />
    );
  }

  if (coverImageUrls.length === 1) {
    return (
      <img
        src={coverImageUrls[0]}
        alt="Capa da playlist"
        className={`overflow-hidden rounded-md object-cover ${className}`}
      />
    );
  }

  return (
    <div className={`grid grid-cols-2 overflow-hidden rounded-md bg-background-elements ${className}`}>
      {coverImageUrls.slice(0, 4).map((coverUrl, index) => (
        <img
          key={`${coverUrl}-${index}`}
          src={coverUrl}
          alt={`Capa ${index + 1} da playlist`}
          className="h-full w-full object-cover"
        />
      ))}
    </div>
  );
}