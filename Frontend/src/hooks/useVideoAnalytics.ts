import { useCallback, useEffect, useState } from "react";
import { fetchVideoAnalytics } from "../services/api";
import type { PaginatedResult, VideoAnalytics } from "../types";

const MAX_RETRIES = 3;

interface UseVideoAnalyticsResult {
  data: PaginatedResult<VideoAnalytics> | null;
  isLoading: boolean;
  error: string | null;
  retryCount: number;
  maxRetries: number;
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
  const [retryCount, setRetryCount] = useState<number>(0);

  const load = useCallback(async (isRetry = false): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchVideoAnalytics(page, pageSize);
      setData(result);
      setRetryCount(0);
    } catch (err) {
      if (isRetry) setRetryCount((c) => c + 1);
      setError(
        err instanceof Error ? err.message : "Unable to load video analytics",
      );
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize]);

  const retry = useCallback((): Promise<void> => load(true), [load]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      await load();
    };
    void fetchData();
  }, [load]);

  return { data, isLoading, error, retryCount, maxRetries: MAX_RETRIES, refresh: retry };
};
