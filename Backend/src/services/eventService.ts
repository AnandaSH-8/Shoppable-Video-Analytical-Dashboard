import { db } from "../db";
import { HttpError } from "../utils/httpError";
import type { CreateEventPayload, EngagementEvent } from "../types";

const findVideoStmt = db.prepare("SELECT id FROM videos WHERE id = ?");

const insertEventStmt = db.prepare(
  `INSERT INTO engagement_events (video_id, event_type, timestamp)
   VALUES (?, ?, COALESCE(?, datetime('now')))`,
);

const findEventStmt = db.prepare(
  `SELECT id,
          video_id   AS videoId,
          event_type AS eventType,
          timestamp  AS timestamp
   FROM engagement_events
   WHERE id = ?`,
);

export const createEngagementEvent = (
  payload: CreateEventPayload,
): EngagementEvent => {
  const video = findVideoStmt.get(payload.videoId) as
    | { id: number }
    | undefined;
  if (!video) {
    throw new HttpError(404, `Video with id ${payload.videoId} was not found`);
  }

  const result = insertEventStmt.run(
    payload.videoId,
    payload.eventType,
    payload.timestamp ?? null,
  );

  return findEventStmt.get(Number(result.lastInsertRowid)) as EngagementEvent;
};
