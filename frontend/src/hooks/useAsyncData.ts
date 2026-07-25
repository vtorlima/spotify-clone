import { useCallback, useEffect, useState } from "react";
import { ApiError } from "../services/api";

interface AsyncDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
  reload: () => void;
}

export function useAsyncData<T>(fetcher: () => Promise<T>): AsyncDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [reloadIndex, setReloadIndex] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetcher();
        if (!ignore) {
          setData(result);
        }
      } catch (caught) {
        if (!ignore) {
          setError(
            caught instanceof ApiError
              ? caught
              : new ApiError(0, "Ocorreu um erro inesperado. Tente novamente.")
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [fetcher, reloadIndex]);

  const reload = useCallback(() => {
    setReloadIndex((current) => current + 1);
  }, []);

  return { data, isLoading, error, reload };

}