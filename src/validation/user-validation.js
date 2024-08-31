import Joi from 'joi';

export const registerUserValidation = Joi.object({
  username: Joi.string().min(3).max(100),
  password: Joi.string().min(3).max(100),
});
