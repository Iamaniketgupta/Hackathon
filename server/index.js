import 'dotenv/config';
import app from './src/app.js';
import dbConnect from './config/db.js';


dbConnect().then(()=>
    app.listen(process.env.PORT||8000,()=>{
        console.log("Listening")
    })
);

