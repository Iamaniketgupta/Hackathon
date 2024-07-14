import { Booking } from "../models/booking.model.js";
import { RagPicker } from "../models/ragPicker.model.js";
import asyncHandler from "express-async-handler";

export const getAllRagPicker = asyncHandler(async (req, res) => {

   const users = await RagPicker.find({});
   if (!users)
    return res.status(500).json({ message: 'Something went wront please check your internet' })
   res.status(200).json({ ragpickers: users });

});

export const getAllBookings = asyncHandler(async (req, res) => {

   const user = req.user;
   if (!user)
      return res.status(401).json({ message: 'Please Login' })

   const data = await Booking.find({ user: user._id }).populate('user ragPicker');
   if (!data)
      return res.status(500).json({ message: 'Something went wront please check your internet' })

   res.status(200).json({ bookings: data });

});
