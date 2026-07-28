import { HomePlaylistsShelf } from "../components/home/HomePlaylistsShelf";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-8 p-6">
      <HomePlaylistsShelf />
    </section>
  );
}
