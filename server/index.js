import 'dotenv/config';
import cors from 'cors';
import app from './src/app.js';
import dbConnect from './config/db.js';

app.use(cors({
    origin : process.env.CLIENT_URL || '*',
}));

app.use(express.json());

dbConnect().then(()=>
    app.listen(process.env.PORT||8000,()=>{
        console.log("Listening")
    })
);

