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
  },
  payment: {
    type: Number,
    required: true
  },
  isAccepted:{
    type:Boolean,
    default:false
  },
  isPaid:{
    type:Boolean,
    default:false
  },
  status:{
    type:String,
    default:"pending"
  }
}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);
