import { jwtVerify } from '../utils/encryption.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.get('Authorization');

    const token = authorization.split('Bearer ')[1];
    const errMessage = { messsage: 'Unauthorized' };
    if (!token) {
      return res.status(401).json({
        errors: [errMessage],
      });
    }
    const { id, username } = jwtVerify(token);

    req.user = { id, username };

    return next();
  } catch (error) {
    return res.status(401).json({
      errors: [errMessage],
    });
  }
};
