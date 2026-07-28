import { useCallback } from "react";
import { useAsyncData } from "./useAsyncData";
import { buildSearchIndex } from "../services/searchService";
import type { SearchItem } from "../types/search";

export function useSearchIndex() {
  const fetchSearchIndex = useCallback(() => buildSearchIndex(), []);

  return useAsyncData<SearchItem[]>(fetchSearchIndex);
}
