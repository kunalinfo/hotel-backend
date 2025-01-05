import { Router } from 'express';
import {
  createRoom,
  getAllRooms,
  getRoom,
  updateRoom,
  deleteRoom,
  getRoomsByHotel,
  getAvailableRooms,
  getRoomByType,
} from '../controllers/roomController'

const router = Router();

/**
 * @swagger
 * /api/v1/rooms:
 *   post:
 *     summary: Create a new room
 *     tags:
 *       - Rooms
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
 *               roomType:
 *                 type: string
 *                 description: The type of the room.
 *                 example: "Deluxe"
 *               availability:
 *                 type: boolean
 *                 description: Whether the room is available for booking.
 *                 example: true
 *               price:
 *                 type: number
 *                 description: The price per night.
 *                 example: 120
 *     responses:
 *       201:
 *         description: Room created successfully.
 *       400:
 *         description: Validation failed or hotel not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/', createRoom);

/**
 * @swagger
 * /api/v1/rooms:
 *   get:
 *     summary: Retrieve all rooms
 *     tags:
 *       - Rooms
 *     responses:
 *       200:
 *         description: Rooms retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get('/', getAllRooms);

/**
 * @swagger
 * /api/v1/rooms/available:
 *   get:
 *     summary: Retrieve all available rooms
 *     tags:
 *       - Rooms
 *     responses:
 *       200:
 *         description: Rooms retrieved successfully.
 *       404:
 *         description: Rooms not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/available', getAvailableRooms);


/**
 * @swagger
 * /api/v1/rooms/{roomId}:
 *   get:
 *     summary: Retrieve a specific room
 *     tags:
 *       - Rooms
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to retrieve.
 *     responses:
 *       200:
 *         description: Room retrieved successfully.
 *       404:
 *         description: Room not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:roomId', getRoom);

/**
 * @swagger
 * /api/v1/rooms/{roomId}:
 *   put:
 *     summary: Update a specific room
 *     tags:
 *       - Rooms
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the room.
 *                 example: "Updated Room Name"
 *               availability:
 *                 type: boolean
 *                 description: Updated availability status.
 *                 example: false
 *     responses:
 *       200:
 *         description: Room updated successfully.
 *       400:
 *         description: Validation failed.
 *       404:
 *         description: Room not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:roomId', updateRoom);

/**
 * @swagger
 * /api/v1/rooms/{roomId}:
 *   delete:
 *     summary: Delete a specific room
 *     tags:
 *       - Rooms
 *     parameters:
 *       - name: roomId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room to delete.
 *     responses:
 *       200:
 *         description: Room deleted successfully.
 *       404:
 *         description: Room not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:roomId', deleteRoom);

/**
 * @swagger
 * /api/v1/rooms/hotel/{hotelId}:
 *   get:
 *     summary: Retrieve rooms by hotel ID
 *     tags:
 *       - Rooms
 *     parameters:
 *       - name: hotelId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the hotel.
 *     responses:
 *       200:
 *         description: Rooms retrieved successfully.
 *       404:
 *         description: Rooms not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/hotel/:hotelId', getRoomsByHotel);

/**
 * @swagger
 * /api/v1/rooms/type/{roomType}:
 *   get:
 *     summary: Retrieve rooms by type
 *     tags:
 *       - Rooms
 *     parameters:
 *       - name: roomType
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of room to retrieve.
 *     responses:
 *       200:
 *         description: Rooms retrieved successfully.
 *       400:
 *         description: Invalid room type.
 *       404:
 *         description: Rooms not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/type/:roomType', getRoomByType);

export default router;
