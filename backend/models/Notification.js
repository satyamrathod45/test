import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({

  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  type: {
    type: String,
    enum: [
      "DONOR_REQUEST",
      "EMERGENCY_ALERT",
      "BLOOD_AVAILABLE",
      "REQUEST_ACCEPTED"
    ],
    required: true
  },

  title: {
    type: String,
    required: true
  },

  message: {
    type: String,
    required: true
  },

  data: {
    type: Object
  },

  isRead: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);