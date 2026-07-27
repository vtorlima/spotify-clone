interface ArtistAboutProps {
  about: string;
}

export function ArtistAbout({ about }: ArtistAboutProps) {
  if (!about) {
    return null;
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-20px font-bold text-text-base">Sobre</h2>
      <p className="max-w-3xl text-14px leading-relaxed text-text-subdued">{about}</p>
    </section>
  );
}
