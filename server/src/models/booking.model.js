import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ragPicker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RagPicker',
    required: true
  },
  timeSlot: {
    type: String,
    required: true
  },
  payment: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
