import { useMemo, useState } from "react";
import { useVideoAnalytics } from "../../hooks/useVideoAnalytics";
import { SimulateTrafficButton } from "../SimulateTrafficButton";
import { VideoAnalyticsTable } from "../VideoAnalyticsTable";
import styles from "./styles.module.css";
import commonStyles from "../../styles/common.module.css";

const PAGE_SIZE = 4;

export const Dashboard = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, error, retryCount, maxRetries, refresh } = useVideoAnalytics(
    page,
    PAGE_SIZE,
  );

  const retriesExhausted = retryCount >= maxRetries;

  const videoIds = useMemo<number[]>(
    () => (data ? data.items.map((item) => item.videoId) : []),
    [data],
  );

  const totalPages = data ? Math.max(data.totalPages, 1) : 1;

  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Video Engagement Dashboard</h1>
        <SimulateTrafficButton videoIds={videoIds} onSimulated={refresh} />
      </header>

      <section className={styles.panel}>
        {isLoading && <p className={styles.state}>Loading video analytics…</p>}

        {!isLoading && error !== null && (
          <div
            className={styles.state + " " + commonStyles["error"]}
            role="alert"
          >
            <p className={commonStyles.error}>{error}</p>
            {retriesExhausted ? (
              <p className={commonStyles.error}>Max retries reached. Please refresh the page.</p>
            ) : (
              <button
                type="button"
                className={commonStyles.button}
                onClick={() => { void refresh(); }}
              >
                Retry ({maxRetries - retryCount} left)
              </button>
            )}
          </div>
        )}

        {!isLoading &&
          error === null &&
          data !== null &&
          data.items.length === 0 && <p className="state">No videos found.</p>}

        {!isLoading &&
          error === null &&
          data !== null &&
          data.items.length > 0 && (
            <>
              <VideoAnalyticsTable rows={data.items} />
              <footer className={styles.pagination}>
                <button
                  type="button"
                  className={commonStyles.button}
                  onClick={() => setPage((current) => Math.max(current - 1, 1))}
                  disabled={page <= 1}
                >
                  Previous
                </button>
                <span className={styles.paginationInfo}>
                  Page {data.page} of {totalPages} · {data.total} videos
                </span>
                <button
                  type="button"
                  className={commonStyles.button}
                  onClick={() => setPage((current) => current + 1)}
                  disabled={page >= totalPages}
                >
                  Next
                </button>
              </footer>
            </>
          )}
      </section>
    </main>
  );
};
