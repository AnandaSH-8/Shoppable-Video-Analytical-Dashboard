export type EngagementEventType = 'view' | 'click' | 'add_to_cart';

export interface CreateEventPayload {
  videoId: number;
  eventType: EngagementEventType;
  timestamp?: string;
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

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}