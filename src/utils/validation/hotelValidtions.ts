import Joi from 'joi';

export const createHotelValidation = Joi.object({
  name: Joi.string().required().min(3).max(100),
  location: Joi.string().required().min(3).max(100),
  rooms: Joi.array().items(Joi.string()).optional(),
});

export const updateHotelValidation = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  location: Joi.string().min(3).max(100).optional(),
  rooms: Joi.array().items(Joi.string()).optional(),
});
