export type EngagementEventType = "view" | "click" | "add_to_cart";

export interface CreateEventPayload {
  videoId: number;
  eventType: EngagementEventType;
}

export interface EngagementEvent {
  id: number;
  videoId: number;
  eventType: EngagementEventType;
  timestamp: string;
}

export interface VideoAnalytics {
  videoId: number;
  title: string;
  videoUrl: string;
  views: number;
  clicks: number;
  addToCarts: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };
