import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose';

const dbConnect= asyncHandler(async(req,res,next)=>{
   // console.log("process.env.uri : " , process.env.DB_URI)
   await mongoose.connect(process.env.DB_URI)
   .then(()=>console.log('DB Connected'))
   .catch((err)=>console.log(err))
});
 
export default dbConnect;