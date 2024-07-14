import mongoose from "mongoose";
const {Schema,model}=mongoose;
const paymentSchema=new Schema({
    order_id:{
      type:"String",
      required:true,
      unique:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"users"
    },
    ragpicker_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"ragpickers"
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return v > 0;
            },
            message: 'Amount must be greater than zero.'
        }
    },
    paymentStatus:{type:Boolean,default:false},
    workStatus:{type:Boolean,default:false}
    },{timestamps:true});

const Payment=model("payment",paymentSchema);
export default Payment;