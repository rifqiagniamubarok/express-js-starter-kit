import bcrypt from 'bcryptjs';
import { prismaClient } from '../application/database.js';
import { ResponseError } from '../error/response-error.js';
import { loginUserValidation, registerUserValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validation.js';
import { jwtSign } from '../utils/encryption.js';

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

const login = async (request) => {
  const userRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findFirst({
    where: {
      username: userRequest.username,
    },
  });

  if (!user) {
    throw new ResponseError(400, 'Username or password wrong', ['username', 'password']);
  }

  const isPasswordValid = await bcrypt.compare(userRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(400, 'Username or password wrong', ['username', 'password']);
  }

  const tokenPayload = { id: user.id, username: user.username };

  const token = jwtSign(tokenPayload);

  const response = { ...tokenPayload, token };
  return response;
};

export default { register, login };
