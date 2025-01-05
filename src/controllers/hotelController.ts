import { NextFunction, Request, Response } from 'express';
import Hotel from '../models/hotel.model';
import ResponseHandler from '../utils/responseHandler';
import { StatusCodes } from 'http-status-codes';
import { createHotelValidation, updateHotelValidation } from '../utils/validation/hotelValidtions';

export const createHotel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { error } = createHotelValidation.validate(req.body);
        if (error) {
            const response = ResponseHandler.error("Validation failed", error.details[0].message);
            res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        const hotel = new Hotel(req.body);
        await hotel.save();

        const response = ResponseHandler.success('Hotel created successfully', { hotel });
        res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
        const response = ResponseHandler.error("Internal server error", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

export const getHotels = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const hotels = await Hotel.find().populate('rooms');

        const response = ResponseHandler.success('Hotels retrieved successfully', { hotels });
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        const response = ResponseHandler.error("Internal server error", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

export const getHotel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { hotelId } = req.params;
    try {
        const hotel = await Hotel.findById(hotelId).populate('rooms');
        if (!hotel) {
            const response = ResponseHandler.error("Hotel not found");
            res.status(StatusCodes.NOT_FOUND).json(response);
        }

        const response = ResponseHandler.success('Hotel retrieved successfully', { hotel });
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        const response = ResponseHandler.error("Internal server error", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

export const updateHotel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { hotelId } = req.params;
    try {
        const { error } = updateHotelValidation.validate(req.body);
        if (error) {
            const response = ResponseHandler.error("Validation failed", error.details[0].message);
            res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        const hotel = await Hotel.findByIdAndUpdate(hotelId, req.body, { new: true });
        if (!hotel) {
            const response = ResponseHandler.error("Hotel not found");
            res.status(StatusCodes.NOT_FOUND).json(response);
        }

        const response = ResponseHandler.success('Hotel updated successfully', { hotel });
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        const response = ResponseHandler.error("Internal server error", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};

export const deleteHotel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { hotelId } = req.params;
    try {
        const hotel = await Hotel.findByIdAndDelete(hotelId);
        if (!hotel) {
            const response = ResponseHandler.error("Hotel not found");
            res.status(StatusCodes.NOT_FOUND).json(response);
        }

        const response = ResponseHandler.success('Hotel deleted successfully', {});
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        const response = ResponseHandler.error("Internal server error", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
};
