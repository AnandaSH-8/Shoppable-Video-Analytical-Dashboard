import { db } from "../db";
import type {
  PaginatedResult,
  PaginationParams,
  VideoAnalytics,
} from "../types";

const countVideosStmt = db.prepare("SELECT COUNT(*) AS total FROM videos");

const videoAnalyticsStmt = db.prepare(
  `SELECT v.id        AS videoId,
          v.title     AS title,
          v.video_url AS videoUrl,
          COALESCE(SUM(CASE WHEN e.event_type = 'view'        THEN 1 ELSE 0 END), 0) AS views,
          COALESCE(SUM(CASE WHEN e.event_type = 'click'       THEN 1 ELSE 0 END), 0) AS clicks,
          COALESCE(SUM(CASE WHEN e.event_type = 'add_to_cart' THEN 1 ELSE 0 END), 0) AS addToCarts
   FROM videos v
   LEFT JOIN engagement_events e ON e.video_id = v.id
   GROUP BY v.id
   ORDER BY views DESC, v.id ASC
   LIMIT ? OFFSET ?`,
);

export const getVideoAnalytics = ({
  page,
  pageSize,
}: PaginationParams): PaginatedResult<VideoAnalytics> => {
  const { total } = countVideosStmt.get() as { total: number };
  const offset = (page - 1) * pageSize;
  const items = videoAnalyticsStmt.all(pageSize, offset) as VideoAnalytics[];

  return {
    items,
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
};
