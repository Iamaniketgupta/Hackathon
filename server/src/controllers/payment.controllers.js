import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { RagPicker } from "../models/ragPicker.model.js";
import { User } from "../models/user.model.js";
import Payment from "../models/payment.model.js";
import asyncHandler from 'express-async-handler';
import Razorpay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js"; 

const createOrder = asyncHandler(async (req, res) => {
    const { username, hours } = req.body;
    const user_id = req.user._id;
    if (!username || !hours) {
        throw new ApiError(400, "All fields are required");
    }
    const ragPicker = await RagPicker.findOne({ username });
    if (!ragPicker) {
        throw new ApiError(404, "Rag Picker not found");
    }
    const user = await User.findOne(user_id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    const key_secret = process.env.RAZORPAY_API_SECRET;
    const key_id = process.env.RAZORPAY_API_KEY;
    const instance = new Razorpay({
        key_id,
        key_secret
    }
    )


    const per_hour=ragPicker.pricePerHour;
    const amount=per_hour*hours;
    const options={
        amount:Number.parseInt(amount)*100,
        currency:"INR",
    }

    const paymentInit = await instance.orders.create(options);
    const payment = await Payment.create({
        order_id: paymentInit.id,
        amount,
        user_id,
        ragpicker_id:ragPicker._id
    });

    res.status(201).json(new ApiResponse(201, "Order created successfully", paymentInit));
})

const verifyOrder = asyncHandler(async (req, res) => {
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    if (!razorpay_order_id) {
        throw new ApiError(400, "Order ID is required");
    }
    
    const payment = await Payment.findOne({ order_id: razorpay_order_id });
    
    if (!payment) {
        throw new ApiError(404, "Order not found");
    }

    const ragpicker = await RagPicker.findById(payment.ragpicker_id);
    const secret = process.env.RAZORPAY_API_SECRET;
    const isValid = validatePaymentVerification(
        {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id
        },
        razorpay_signature,
        secret
    );
    
    if (isValid) {
        payment.paymentStatus = true;
        await payment.save();
        res.redirect(`${process.env.CLIENT_URL}/${ragpicker.username}?paymentdone=true`);
    } else {
        throw new ApiError(400, "Payment verification failed");
    }

});

export {
    createOrder,
    verifyOrder
};
