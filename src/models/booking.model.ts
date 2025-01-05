import { Schema, model } from 'mongoose';
import BookingStatus from '../enum/bookingStatus.enum';

const bookingSchema = new Schema({
  userId: { type: String, required: true },
  hotelId: { type: Schema.Types.ObjectId, ref: 'Hotel' },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  status: { type: String, enum: Object.values(BookingStatus), default: BookingStatus.PENDING },
  totalPrice: { type: Number, required: true }, 
  isPaid: { type: Boolean, default: false },
});

const Booking = model('Booking', bookingSchema);
export default Booking;
