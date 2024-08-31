import express from 'express';
import { publicRouter } from '../router/public-router.js';
import { errorMiddleware } from '../middleware/error-middleware.js';

const web = express();
web.use(express.json());

web.use(publicRouter);

// Error middlewar
web.use(errorMiddleware);

export { web };
