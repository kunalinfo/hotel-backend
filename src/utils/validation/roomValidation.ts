import Joi from 'joi';

export const createRoomValidation = Joi.object({
  hotelId: Joi.string().required(),
  roomType: Joi.string().required(),
  price: Joi.number().min(0).required(),
  availability: Joi.boolean(),
});

export const updateRoomValidation = Joi.object({
  roomType: Joi.string(),
  price: Joi.number().min(0),
  availability: Joi.boolean(),
});
