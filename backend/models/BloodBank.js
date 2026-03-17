import mongoose from "mongoose";

const BloodBankSchema = new mongoose.Schema({

  name: String,

  phone: String,

  email: String,

  address: String,

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: [Number]
  },

  bloodInventory: {

    "A+": {type:Number, default:0},
    "A-": {type:Number, default:0},
    "B+": {type:Number, default:0},
    "B-": {type:Number, default:0},
    "AB+": {type:Number, default:0},
    "AB-": {type:Number, default:0},
    "O+": {type:Number, default:0},
    "O-": {type:Number, default:0}

  },

  verified: {
    type: Boolean,
    default: true
  }

},{timestamps:true});

BloodBankSchema.index({ location: "2dsphere" });

export default mongoose.model("BloodBank", BloodBankSchema);