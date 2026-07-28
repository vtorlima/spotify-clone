import type { Music } from "./music";
import type { Artist } from "./artist";
import type { AlbumSummary } from "./album";

export type SearchItemType = "music" | "artist" | "album";

export type SearchItem =
  | {
      id: string;
      type: "music";
      title: string;
      subtitle: string;
      imageUrl: string;
      data: Music;
    }
  | {
      id: string;
      type: "artist";
      title: string;
      subtitle: string;
      imageUrl: string;
      data: Artist;
    }
  | {
      id: string;
      type: "album";
      title: string;
      subtitle: string;
      imageUrl: string;
      data: AlbumSummary;
    };
