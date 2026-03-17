import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: [Number]
  },

  verified: {
    type: Boolean,
    default: false
  }

}, {timestamps:true});

HospitalSchema.index({ location: "2dsphere" });

export default mongoose.model("Hospital", HospitalSchema);