
import Joi from 'joi';
import { Types } from 'mongoose';


export const createBookingValidation = Joi.object({
  hotelId: Joi.string().required().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
      return helpers.error('Invalid hotel ID format');
    }
    return value;
  }),
  roomId: Joi.string().required().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
      return helpers.error('Invalid room ID format');
    }
    return value;
  }),
  checkInDate: Joi.date().iso().required().greater('now').messages({
    'date.greater': 'Check-in date must be in the future',
  }),
  checkOutDate: Joi.date().iso().required().greater(Joi.ref('checkInDate')).messages({
    'date.greater': 'Check-out date must be after check-in date',
  }),
});
