import { useMemo } from "react";
import type { VideoAnalytics } from "../../types";
import styles from "./styles.module.css";

interface VideoAnalyticsTableProps {
  rows: VideoAnalytics[];
}

interface VideoAnalyticsRowView extends VideoAnalytics {
  conversionRate: number;
}

const formatPercent = (value: number): string => `${(value * 100).toFixed(2)}%`;

export const VideoAnalyticsTable = ({ rows }: VideoAnalyticsTableProps) => {
  const viewRows = useMemo<VideoAnalyticsRowView[]>(
    () =>
      rows.map((row) => ({
        ...row,
        conversionRate: row.views > 0 ? row.addToCarts / row.views : 0,
      })),
    [rows],
  );

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.dataTable}>
        <thead>
          <tr>
            <th scope="col">Video</th>
            <th scope="col" className={styles.tableHeader}>
              Views
            </th>
            <th scope="col" className={styles.tableHeader}>
              Clicks
            </th>
            <th scope="col" className={styles.tableHeader}>
              Conversions
            </th>
            <th scope="col" className={styles.tableHeader}>
              Conversion Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {viewRows.map((row) => (
            <tr key={row.videoId}>
              <td>
                <span className={styles.videoTitle}>{row.title}</span>
                <img
                  className={styles.videoUrl}
                  src={row.videoUrl}
                  alt={row.title}
                />
              </td>
              <td className={styles["numeric"]}>{row.views}</td>
              <td className={styles["numeric"]}>{row.clicks}</td>
              <td className={styles["numeric"]}>{row.addToCarts}</td>
              <td className={styles["numeric"]}>
                {formatPercent(row.conversionRate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
