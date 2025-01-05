import { Schema, model } from 'mongoose';

const hotelSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
});

const Hotel = model('Hotel', hotelSchema);
export default Hotel;
