import { ResponseError } from '../error/response-error.js';

export const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    return next();
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        success: false,
        errors: err.message,
      })
      .end();
  } else {
    res.status(500).json({
      success: false,
      errors: err,
    });
  }
};
