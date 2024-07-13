import express from 'express';
const app = express();
import cors from 'cors';

app.use(cors({
    origin : process.env.CLIENT_URL || '*',
}));

app.use(express.json());


// Routes
import userRouter from "./routes/user.router.js"
app.use("/user" , userRouter);


export default app;