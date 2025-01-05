import { Schema, model } from 'mongoose';
import RoomTypes from '../enum/roomType.enum';

const roomSchema = new Schema({
  hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel' },
  roomType: { 
    type: String, 
    required: true, 
    enum: Object.values(RoomTypes),
  },
  price: { type: Number, required: true },
  availability: { type: Boolean, default: true },
});

const Room = model('Room', roomSchema);
export default Room;
