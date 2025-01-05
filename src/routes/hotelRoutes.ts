import express from 'express';
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel }  from '../controllers/hotelController';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: Hotel management endpoints
 */

/**
 * @swagger
 * /api/v1/hotels:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               rooms:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Hotel created successfully
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Internal server error
 */
router.post('/', createHotel);

/**
 * @swagger
 * /api/v1/hotels:
 *   get:
 *     summary: Retrieve all hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: Hotels retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', getHotels);

/**
 * @swagger
 * /api/v1/hotels/{hotelId}:
 *   get:
 *     summary: Retrieve a single hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hotel to retrieve
 *     responses:
 *       200:
 *         description: Hotel retrieved successfully
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 */
router.get('/:hotelId', getHotel);

/**
 * @swagger
 * /api/v1/hotels/{hotelId}:
 *   put:
 *     summary: Update a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hotel to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               description:
 *                 type: string
 *               rooms:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *       400:
 *         description: Validation failed
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 */
router.put('/:hotelId', updateHotel);

/**
 * @swagger
 * /api/v1/hotels/{hotelId}:
 *   delete:
 *     summary: Delete a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hotel to delete
 *     responses:
 *       200:
 *         description: Hotel deleted successfully
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:hotelId', deleteHotel);

export default router;
