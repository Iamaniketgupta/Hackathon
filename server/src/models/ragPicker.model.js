import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  review: {
    type: String,
    required: true
  }
}, { timestamps: true });

const ragPickerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  pfp: {
    type: String // URL to the profile picture
  },
  address: {
    type: String,
  },
  lat: {
    type: Number,
    
  },
  long: {
    type: Number,
  },
  gender: {
    type: String,
    
  },
  pricePerHour: {
    type: Number,
    
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAvailable:{
    type:Boolean,
    default:true
  },
  pincode:{
    type:String,
    required:true
  }
}, { timestamps: true });

// Middleware to hash password before saving
ragPickerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if password is correct
ragPickerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate access token
ragPickerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const RagPicker = mongoose.model("RagPicker", ragPickerSchema);
