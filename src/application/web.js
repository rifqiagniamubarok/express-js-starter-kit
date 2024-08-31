import express from 'express';
import { publicRouter } from '../router/public-router.js';
import { errorMiddleware } from '../middleware/error-middleware.js';
import morgan from '../middleware/morgan-middleware.js';
import { setupSwagger } from './swagger.js';
import setupRouter from '../router/index.js';

const web = express();

// swagger
setupSwagger(web);

// Middleware
web.use(express.json());
web.use(morgan);

setupRouter(web);
// Error middlewar
web.use(errorMiddleware);

export { web };
