import express from 'express';
const app = express();
import cors from 'cors';

app.use(cors({
    origin : process.env.CLIENT_URL || '*',
}));

app.use(express.json());


export default app;