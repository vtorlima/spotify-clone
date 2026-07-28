import { apiGet } from "./api";
import type { Music } from "../types/music";

export function getAllMusics(): Promise<Music[]> {
  return apiGet<Music[]>("/music");
}
