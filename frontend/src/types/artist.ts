export interface Artist {
  id: string;
  name: string;
  listeners: number;
  about: string;
  photoUrl: string;
  headerUrl: string;
  createdAt: string;
  updatedAt: string | null;
}
