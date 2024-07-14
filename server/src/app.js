import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public folder
app.use(express.static(path.join(process.cwd(), 'public')));

// Routes
import userRouter from "./routes/user.router.js";
import ragpickerRouter from './routes/ragpicker.router.js';
import bookingRouter from './routes/booking.router.js'
import ratingRouter from './routes/rating.router.js'
import fetchRouters from './routes/fetchrouters.js'
import paymentRouter from './routes/payment.router.js';

app.use("/user", userRouter);
app.use("/rp", ragpickerRouter);
app.use("/booking" , bookingRouter)
app.use("/rating" , ratingRouter)
app.use('/users',fetchRouters);

app.use("/payment" , paymentRouter);
app.use("/booking" , bookingRouter);

export default app;
