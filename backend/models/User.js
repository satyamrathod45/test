import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
{
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },

  phone: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6
  },

  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },

  activeMode: {
    type: String,
    enum: ["Patient", "Donor"],
    default: "Patient"
  },

  verificationStatus: {
    type: String,
    enum: ["NotVerified", "HalfVerified", "FullVerified"],
    default: "NotVerified"
  },

  isAvailable: {
    type: Boolean,
    default: false
  },

  rating: {
    type: Number,
    default: 5
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  totalDonations:{
type:Number,
default:0
},

rating:{
type:Number,
default:5
},

totalRatings:{
type:Number,
default:0
},

rewardPoints:{
type:Number,
default:0
}

},
{ timestamps: true }
);

UserSchema.index({ location: "2dsphere" });

UserSchema.pre("save", async function(next){

  if(!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

});

export default mongoose.model("User", UserSchema);