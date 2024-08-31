import Joi from 'joi';

export const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
});

export const loginUserValidation = Joi.object({
  username: Joi.string().min(3).max(100).required(),
  password: Joi.string().min(3).max(100).required(),
});
