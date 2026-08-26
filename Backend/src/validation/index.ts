import { HttpError } from "../utils/httpError";
import type {
  CreateEventPayload,
  EngagementEventType,
  PaginationParams,
} from "../types";

const EVENT_TYPES: readonly EngagementEventType[] = [
  "view",
  "click",
  "add_to_cart",
];

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

const isEngagementEventType = (value: unknown): value is EngagementEventType =>
  typeof value === "string" &&
  (EVENT_TYPES as readonly string[]).includes(value);

export const validateCreateEventPayload = (
  body: unknown,
): CreateEventPayload => {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    throw new HttpError(400, "Request body must be a JSON object");
  }

  const { videoId, eventType } = body as Record<string, unknown>;

  if (
    typeof videoId !== "number" ||
    !Number.isInteger(videoId) ||
    videoId <= 0
  ) {
    throw new HttpError(
      400,
      "videoId is required and must be a positive integer",
    );
  }

  if (!isEngagementEventType(eventType)) {
    throw new HttpError(
      400,
      `eventType must be one of: ${EVENT_TYPES.join(", ")}`,
    );
  }

  return { videoId, eventType };
};

const parsePositiveInt = (
  value: unknown,
  name: string,
  fallback: number,
): number => {
  if (value === undefined) {
    return fallback;
  }
  if (typeof value !== "string") {
    throw new HttpError(400, `${name} must be a single numeric value`);
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new HttpError(400, `${name} must be a positive integer`);
  }
  return parsed;
};

export const validatePaginationQuery = (
  query: Record<string, unknown>,
): PaginationParams => {
  const page = parsePositiveInt(query.page, "page", DEFAULT_PAGE);
  const pageSize = parsePositiveInt(
    query.pageSize,
    "pageSize",
    DEFAULT_PAGE_SIZE,
  );

  if (pageSize > MAX_PAGE_SIZE) {
    throw new HttpError(400, `pageSize must not exceed ${MAX_PAGE_SIZE}`);
  }

  return { page, pageSize };
};
