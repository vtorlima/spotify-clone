export interface PlaylistSummary {
  id: string;
  name: string;
  description: string | null;
  musicQtd: number;
  duration: number;
  createdAt: string;
  updatedAt: string | null;
}
