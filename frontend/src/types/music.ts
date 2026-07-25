export interface Music {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId: string;
  albumTitle: string;
  albumCoverUrl: string;
  playlistsId: string[];
  duration: number;
  releaseDate: string;
  timesListen: number;
  explicit: boolean;
  createdAt: string;
  updatedAt: string | null;
}
