import { useCallback, useEffect, useState } from "react";
import { fetchVideoAnalytics } from "../services/api";
import type { PaginatedResult, VideoAnalytics } from "../types";

interface UseVideoAnalyticsResult {
  data: PaginatedResult<VideoAnalytics> | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useVideoAnalytics = (
  page: number,
  pageSize: number,
): UseVideoAnalyticsResult => {
  const [data, setData] = useState<PaginatedResult<VideoAnalytics> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchVideoAnalytics(page, pageSize);
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load video analytics",
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await load();
    };
    void fetchData();
  }, [load]);

  return { data, isLoading, error, refresh: load };
};
