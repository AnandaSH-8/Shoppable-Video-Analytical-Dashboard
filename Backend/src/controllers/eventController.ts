import type { RequestHandler } from "express";
import { validateCreateEventPayload } from "../validation";
import { createEngagementEvent } from "../services/eventService";
import type { ApiSuccess, EngagementEvent } from "../types";

export const postEvent: RequestHandler = (req, res, next) => {
  try {
    const payload = validateCreateEventPayload(req.body);
    const event = createEngagementEvent(payload);

    const response: ApiSuccess<EngagementEvent> = {
      success: true,
      data: event,
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
