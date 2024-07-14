import { RagPicker } from "../models/ragPicker.model.js";
import asyncHandler from"express-async-handler";

export const getAllRagPicker = asyncHandler(async(req,res)=>{

 const users = await RagPicker.find({});
 if(!users)
    res.status(500).json({message:'Something went wront please check your internet'})
 res.status(200).json({ragpickers:users});

});
