import { Router } from "express";
import { postEvent } from "../controllers/eventController";
import { getVideoAnalyticsHandler } from "../controllers/analyticsController";

export const apiRouter = Router();

apiRouter.post("/events", postEvent);
apiRouter.get("/analytics/videos", getVideoAnalyticsHandler);
