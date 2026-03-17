import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({

  donorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  requestId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Request"
  },

  hospitalId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hospital"
  },

  rating:{
    type:Number,
    min:1,
    max:5
  },

  feedback:String

},{timestamps:true});

export default mongoose.model("Donation",DonationSchema);