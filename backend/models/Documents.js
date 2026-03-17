import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  fileUrl: {
    type: String,
    required: true
  },

  detectedBloodGroup: String,

  aiConfidence: Number,

  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending"
  }

},{timestamps:true});

export default mongoose.model("Document", DocumentSchema);