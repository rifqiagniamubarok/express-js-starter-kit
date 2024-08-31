import bcrypt from 'bcryptjs';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { registerUserValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validation.js';

const register = async (request) => {
  const userRequest = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: userRequest.username,
    },
  });

  if (countUser !== 0) {
    throw new ResponseError(400, 'username already exists');
  }

  userRequest.password = await bcrypt.hash(userRequest.password, 10);

  const user = await prismaClient.user.create({
    data: userRequest,
    select: {
      id: true,
      username: true,
    },
  });

  return user;
};

export default { register };
