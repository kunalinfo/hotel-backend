import { NextFunction, Request, Response } from 'express';
import Hotel from '../models/hotel.model';
import Room from '../models/room.model';
import Booking from '../models/booking.model';
import BookingStatus from '../enum/bookingStatus.enum';
import { createBookingValidation } from '../utils/validation/bookingValidations';
import {StatusCodes} from 'http-status-codes';
import ResponseHandler from '../utils/responseHandler'; 
import mongoose from 'mongoose';


const loggedInUser = { _id: '5q6ffe6a0ba62570agcedd68', name: 'Nabil Salman', email:'nabil@example.com' };

export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { error } = createBookingValidation.validate(req.body);
    if (error) {
      const response = ResponseHandler.error("Validation failed", error.details[0].message);
       res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { hotelId, roomId, checkInDate, checkOutDate } = req.body;

    const room = await Room.findOne({roomId}).session(session);
    if (room == null) {
      const response = ResponseHandler.error("Room not found");
       res.status(StatusCodes.NOT_FOUND).json(response);
    }

    const hotel = await Hotel.findOne({hotelId}).session(session);
    if (hotel == null) {
      const response = ResponseHandler.error("Hotel not found");
       res.status(StatusCodes.NOT_FOUND).json(response);
    }

    const existingBooking = await Booking.findOne({
      roomId: roomId,
      $or: [
        {
          checkInDate: { $lt: new Date(checkOutDate) },
          checkOutDate: { $gt: new Date(checkInDate) },
        },
      ],
    }).session(session);

    if (existingBooking) {
       res.status(StatusCodes.BAD_REQUEST).json(ResponseHandler.error("Room already booked for the selected dates"));
    }

    // Calculate total price
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const duration = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = room?.price != undefined ? room.price * duration: 0;

    await Room.findByIdAndUpdate(
      roomId,
      { availability: false },
      { session, new: true }
    );

    const booking = new Booking({
      userId: loggedInUser._id,
      hotelId: hotelId,
      roomId: roomId,
      checkInDate,
      checkOutDate,
      totalPrice, 
      isPaid: false, 
      status: BookingStatus.PENDING,
    });

    await booking.save({ session });
    await session.commitTransaction();

    const resp = ResponseHandler.success('Booking created successfully', booking)
    res.status(StatusCodes.CREATED).json(resp);
  } catch (error) {
    await session.abortTransaction();
    const resp = ResponseHandler.error("Internal server error", error)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(resp);
  } finally {
    session.endSession();
  }
};
