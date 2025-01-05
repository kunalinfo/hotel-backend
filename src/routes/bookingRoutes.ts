import { Router } from 'express';
import { createBooking } from '../controllers/bookingController';
const router = Router();

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags:
 *       - Bookings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelId:
 *                 type: string
 *                 description: The ID of the hotel.
 *                 example: "60d21ba67dbb2c001f7e0fd5"
 *               roomId:
 *                 type: string
 *                 description: The ID of the room to book.
 *                 example: "60d21bb67dbb2c001f7e0fd7"
 *               checkInDate:
 *                 type: string
 *                 format: date
 *                 description: The check-in date.
 *                 example: "2024-01-10"
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *                 description: The check-out date.
 *                 example: "2024-01-15"
 *     responses:
 *       201:
 *         description: Booking created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Booking created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21ba67dbb2c001f7e0fd9"
 *                     userId:
 *                       type: string
 *                       example: "5q6ffe6a0ba62570agcedd68"
 *                     hotelId:
 *                       type: string
 *                       example: "60d21ba67dbb2c001f7e0fd5"
 *                     roomId:
 *                       type: string
 *                       example: "60d21bb67dbb2c001f7e0fd7"
 *                     checkInDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-01-10"
 *                     checkOutDate:
 *                       type: string
 *                       format: date
 *                       example: "2024-01-15"
 *                     status:
 *                       type: string
 *                       example: "PENDING"
 *       400:
 *         description: Validation failed or room is already booked for the selected dates.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 error:
 *                   type: string
 *                   example: "Invalid hotel ID format"
 *       404:
 *         description: Room or hotel not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Room not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                   example: "Database connection error"
 */
router.post('/', createBooking);

export default router;
