import {rateLimit} from 'express-rate-limit';

export const rateLimitConfig = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // start blocking after 100 requests
    message: "Too many requests from this IP, please try again after an hour",
    });