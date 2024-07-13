import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
}));

app.use(express.json());

// Serve static files from the public folder
app.use(express.static(path.join(process.cwd(), 'public')));

// Routes
import userRouter from "./routes/user.router.js";
import ragpickerRouter from './routes/ragpicker.router.js';
import bookingRouter from './routes/booking.router.js'

app.use("/user", userRouter);
app.use("/rp", ragpickerRouter);
app.use("/booking" , bookingRouter)

export default app;
