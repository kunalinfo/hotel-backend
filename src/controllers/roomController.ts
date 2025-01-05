import { NextFunction, Request, Response } from 'express';
import Room from '../models/room.model';
import Hotel from '../models/hotel.model';
import { createRoomValidation, updateRoomValidation } from '../utils/validation/roomValidation';
import ResponseHandler from '../utils/responseHandler'; 
import {StatusCodes} from 'http-status-codes'
import RoomTypes from '../enum/roomType.enum';

export const createRoom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { error } = createRoomValidation.validate(req.body);
        if (error) {
            const response = ResponseHandler.error("Validation failed", error);
            res.status(StatusCodes.BAD_REQUEST).json(response);
        }

        const hotel = await Hotel.findById({ _id: req.body.hotelId });
        if (!hotel) {
            res.status(StatusCodes.NOT_FOUND).json(ResponseHandler.error("Hotel not found"));
        }

        const room = new Room(req.body);
        await room.save();
        res.status(StatusCodes.CREATED).json(ResponseHandler.success('Room created successfully', room));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseHandler.error("Internal server error", error));
    }
};

export const getAllRooms = async (req: Request, res: Response,next:NextFunction) :Promise<void> =>{
    try {
        const rooms = await Room.find();
        res.status(StatusCodes.OK).json(ResponseHandler.success('Rooms retrieved successfully', rooms));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseHandler.error("Internal server error", error));
    }
}

export const getRoom = async (req: Request, res: Response,next:NextFunction) :Promise<void> => {
    const {roomId} = req.params;
    try {
        const room = await Room.findById(roomId);
        if (!room) {
            const response = ResponseHandler.error("Room not found");
            res.status(StatusCodes.NOT_FOUND).json(response);
        }
        const response = ResponseHandler.success('Room retrieved successfully', room)
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        
        const response = ResponseHandler.error("Internal server error", error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
}


export const updateRoom = async (req: Request, res: Response,next:NextFunction) :Promise<void> => {
    const {roomId} = req.params;
    try {
        const { error } = updateRoomValidation.validate(req.body);
        if (error)  {res.status(StatusCodes.BAD_REQUEST).json(ResponseHandler.error("Validation failed"));}

        const room = await Room.findByIdAndUpdate(roomId, req.body, {new: true});
        if (!room)  {res.status(StatusCodes.NOT_FOUND).json(ResponseHandler.error("Room not found"));}
        res.status(StatusCodes.OK).json(ResponseHandler.success('Room updated successfully', room));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseHandler.error("Internal server error", error));
    }
}


export const deleteRoom = async (req: Request, res: Response,next:NextFunction) :Promise<void>=> {
    const {roomId} = req.params;
    try {
        const room = await Room.findByIdAndDelete(roomId);
        if (!room)  {res.status(StatusCodes.NOT_FOUND).json(ResponseHandler.error("Room not found"));}
        if(room?.availability === false)  {res.status(StatusCodes.BAD_REQUEST).json(ResponseHandler.error("Room is not available for deletion"));}
        res.status(StatusCodes.OK).json(ResponseHandler.success('Room deleted successfully'));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseHandler.error("Internal server error", error));
    }
}

export const getRoomsByHotel = async (req: Request, res: Response,next:NextFunction) :Promise<void>=> {
    const {hotelId} = req.params;
    try {
        const rooms = await Room.find({hotelId});
        if (!rooms)  {res.status(StatusCodes.NOT_FOUND).json(ResponseHandler.error("Rooms not found"));}
        res.status(StatusCodes.OK).json(ResponseHandler.success('Rooms retrieved successfully', rooms));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseHandler.error("Internal server error", error));
    }
}

export const getAvailableRooms = async (req: Request, res: Response,next:NextFunction) :Promise<void> => {
    try {
        const rooms = await Room.find({availability: true});
        if (!rooms)  {res.status(StatusCodes.NOT_FOUND).json(ResponseHandler.error("Rooms not found"));}
        res.status(StatusCodes.OK).json(ResponseHandler.success('Rooms retrieved successfully', rooms));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseHandler.error("Internal server error", error));
    }
}

export const getRoomByType = async (req: Request, res: Response,next:NextFunction) :Promise<void> => {
    const {roomType} = req.params;
    if (!Object.values(RoomTypes).includes(roomType)) {
         res.status(StatusCodes.BAD_REQUEST).json(
          ResponseHandler.error("Invalid room type provided", `Valid room types are: ${Object.values(RoomTypes).join(', ')}`)
        );
      }
    try {
        const rooms = await Room.find({roomType});
        if (!rooms)  {res.status(StatusCodes.NOT_FOUND).json(ResponseHandler.error("Rooms not found"));}
        res.status(StatusCodes.OK).json(ResponseHandler.success('Rooms retrieved successfully', rooms));
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ResponseHandler.error("Internal server error", error));
    }
}