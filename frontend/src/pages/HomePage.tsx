import { HomeHeroBanner } from "../components/home/HomeHeroBanner";
import { HomePlaylistsShelf } from "../components/home/HomePlaylistsShelf";
import { HomeRecentAlbumsShelf } from "../components/home/HomeRecentAlbumsShelf";
import { HomeRecentArtistsShelf } from "../components/home/HomeRecentArtistsShelf";

export default function HomePage() {
  return (
    <section className="flex flex-col gap-8 p-6">
      <HomeHeroBanner />
      <HomePlaylistsShelf />
      <HomeRecentAlbumsShelf />
      <HomeRecentArtistsShelf />
    </section>
  );
}
