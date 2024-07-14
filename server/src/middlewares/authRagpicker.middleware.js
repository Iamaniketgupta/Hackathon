import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { RagPicker } from "../models/ragPicker.model.js";

export const verifyRagPickerJwt = asyncHandler(async (req, res, next) => {
    try {
        console.log("req.headers " ,req.header("Authorization") )
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || req.body?.token || req.body.headers?.Authorization?.replace("Bearer ", "");
        console.log("req.body.token : " , req.body?.token);
        console.log("token : " ,token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("recodedtoken : " ,decodedToken)

        const ragPicker = await RagPicker.findById(decodedToken._id).select("-password");
        console.log("ragpicker : " ,ragPicker)

        if (!ragPicker) {
            throw new ApiError(401, "Invalid token");
        }

        req.ragPicker = ragPicker;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
