import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({

  patientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  location:{
    type:{
      type:String,
      enum:["Point"],
      default:"Point"
    },
    coordinates:{
      type:[Number], // [longitude, latitude]
      required:true
    }
  },

  requiredBloodGroup:{
    type:String,
    required:true
  },

  units:{
    type:Number,
    default:1
  },

  message:String,

  urgencyLevel:{
    type:String,
    enum:["Low","Medium","High","Critical"],
    default:"Medium"
  },

  requestType:{
    type:String,
    enum:["Public","Personal"],
    required:true
  },

  depositAmount:{
    type:Number,
    default:50
  },

  depositStatus:{
    type:String,
    enum:["Pending","Paid","Refunded"],
    default:"Pending"
  },

  acceptedBy:{
    type:mongoose.Schema.Types.ObjectId
  },

  acceptedType:{
    type:String,
    enum:["Donor","BloodBank"]
  },

  status:{
    type:String,
    enum:[
      "Searching",
      "Accepted",
      "OnTheWay",
      "Completed",
      "Cancelled"
    ],
    default:"Searching"
  }

},{timestamps:true});

RequestSchema.index({ location: "2dsphere" });

export default mongoose.model("Request",RequestSchema);