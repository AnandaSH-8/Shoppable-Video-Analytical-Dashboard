import type { RequestHandler } from 'express';
import { validatePaginationQuery } from '../validation';
import { getVideoAnalytics } from '../services/analyticsService';
import type { ApiSuccess, PaginatedResult, VideoAnalytics } from '../types';

export const getVideoAnalyticsHandler: RequestHandler = (req, res, next) => {
  try {
    const pagination = validatePaginationQuery(req.query);
    const result = getVideoAnalytics(pagination);

    const response: ApiSuccess<PaginatedResult<VideoAnalytics>> = {
      success: true,
      data: result
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};