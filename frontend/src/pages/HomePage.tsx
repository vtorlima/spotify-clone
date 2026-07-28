import { HomePlaylistsShelf } from "../components/home/HomePlaylistsShelf";
import { HomeRecentAlbumsShelf } from "../components/home/HomeRecentAlbumsShelf";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-8 p-6">
      <HomePlaylistsShelf />
      <HomeRecentAlbumsShelf />
    </section>
  );
}
