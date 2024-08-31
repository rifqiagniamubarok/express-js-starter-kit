import { web } from './application/web.js';
import { logger } from './application/logging.js';

const PORT = process.env.PORT | 3000;

web.listen(3000, () => {
  logger.info(`server run on port ${PORT} for localhost run in http:://locahost:${PORT}`);
});
