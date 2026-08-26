import axios from "axios";

import type {
  ApiResponse,
  CreateEventPayload,
  EngagementEvent,
  PaginatedResult,
  VideoAnalytics,
} from "../types";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchVideoAnalytics = async (
  page: number,
  pageSize: number,
): Promise<PaginatedResult<VideoAnalytics>> => {
  const response = await apiClient.get<
    ApiResponse<PaginatedResult<VideoAnalytics>>
  >("/analytics/videos", {
    params: {
      page,
      pageSize,
    },
  });

  const payload = response.data;

  if (!payload.success) {
    throw new Error(payload.error);
  }

  return payload.data;
};

export const createEngagementEvent = async (
  payload: CreateEventPayload,
): Promise<EngagementEvent> => {
  const response = await apiClient.post<ApiResponse<EngagementEvent>>(
    "/events",
    payload,
  );

  const result = response.data;

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.data;
};
