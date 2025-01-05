import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import { expect } from '@jest/globals';
import dotenv from 'dotenv';

dotenv.config();

let hotelId = '';
let roomId = '';

beforeAll(async () => {
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI);

    // Create a hotel to use for room creation tests
    const hotelData = { name: 'Test Hotel', location: 'Test Location' };
    const hotelResponse = await request(app).post('/api/v1/hotels').send(hotelData);
    hotelId = hotelResponse.body.data.hotel._id;
  }
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Hotel Routes', () => {
  describe('POST /api/v1/hotels', () => {
    it('should create a new hotel', async () => {
      jest.setTimeout(10000);
      const hotelData = {
        name: 'Test Hotel',
        location: 'Test Location',
      };

      const response = await request(app).post('/api/v1/hotels').send(hotelData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.hotel.name).toBe(hotelData.name);
    });
  });

  describe('GET /api/v1/hotels', () => {
    it('should retrieve all hotels', async () => {
      const response = await request(app).get('/api/v1/hotels');
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(Array.isArray(response.body.data.hotels)).toBe(true);
      expect(response.body.data.hotels.length).toBeGreaterThan(0);
    });
  });
});

describe('Room Routes', () => {
  describe('POST /api/v1/rooms', () => {
    it('should create a new room', async () => {
      jest.setTimeout(10000);
      const roomData = {
        hotelId: hotelId,
        roomType: "Single",
        availability: true,
        price: 100,
      };

      const response = await request(app).post('/api/v1/rooms').send(roomData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBeTruthy();
      expect(response.body.data.roomType).toBe(roomData.roomType);
      expect(response.body.data.price).toBe(roomData.price);
      roomId =response.body.data._id;
    });
  });

  describe('GET /api/v1/rooms', () => {
    it('should retrieve all rooms', async () => {
      const response = await request(app).get('/api/v1/rooms');
  
      expect(response.status).toBe(200);
      expect(response.body.success).toBeTruthy();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('DELETE /api/v1/rooms/:id', () => {
    it('should delete a room', async () => {

      const response = await request(app).delete(`/api/v1/rooms/${roomId}`);
  
      expect(response.status).toBe(200); // OK
      expect(response.body.success).toBeTruthy();
    });
  });

  describe('DELETE /api/v1/hotels/:id', () => {
  it('should delete a hotel', async () => {
    const hotelData = { name: 'Hotel to Delete', location: 'Test Location' };
    const createResponse = await request(app).post('/api/v1/hotels').send(hotelData);
    const hotelId = createResponse.body.data.hotel._id;

    const response = await request(app).delete(`/api/v1/hotels/${hotelId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body.message).toBe('Hotel deleted successfully');
  });
});
});
