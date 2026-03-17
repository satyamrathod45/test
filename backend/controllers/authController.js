import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Hospital from "../models/Hospital.js";
import BloodBank from "../models/BloodBank.js";


/* ===============================
   GENERATE JWT COOKIE
================================ */

const generateToken = (res, userId) => {

  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

};


/* ===============================
   REGISTER USER
================================ */

export const registerUser = async (req, res) => {

  try {

    const {
      fullName,
      email,
      phone,
      password,
      bloodGroup,
      latitude,
      longitude
    } = req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !bloodGroup ||
      !latitude ||
      !longitude
    ) {
      return res.status(400).json({
        message: "All fields including location are required"
      });
    }

    const userExists = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({

      fullName,
      email,
      phone,
      password,
      bloodGroup,

      location: {
        type: "Point",
        coordinates: [
          Number(longitude),
          Number(latitude)
        ]
      }

    });

    generateToken(res, user._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        activeMode: user.activeMode,
        verificationStatus: user.verificationStatus
      }
    });

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error during registration"
    });

  }

};


/* ===============================
   LOGIN USER
================================ */

export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    generateToken(res, user._id);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        bloodGroup: user.bloodGroup,
        activeMode: user.activeMode,
        verificationStatus: user.verificationStatus,
        isAvailable: user.isAvailable
      }
    });

  } catch (error) {

    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error during login"
    });

  }

};


/* ===============================
   LOGOUT USER
================================ */

export const logoutUser = (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({
    message: "Logged out successfully"
  });

};


/* ===============================
   CREATE HOSPITAL
================================ */

export const createHospital = async (req, res) => {

  try {

    const {
      name,
      phone,
      email,
      address,
      latitude,
      longitude
    } = req.body;

    if (!name || !phone || !email || !latitude || !longitude) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const hospital = await Hospital.create({

      name,
      phone,
      email,
      address,

      location: {
        type: "Point",
        coordinates: [
          Number(longitude),
          Number(latitude)
        ]
      }

    });

    res.status(201).json({
      message: "Hospital created successfully",
      hospital
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


/* ===============================
   CREATE BLOOD BANK
================================ */

export const createBloodBank = async (req, res) => {

  try {

    const {
      name,
      phone,
      email,
      address,
      latitude,
      longitude
    } = req.body;

    if (!name || !phone || !email || !latitude || !longitude) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const bloodBank = await BloodBank.create({

      name,
      phone,
      email,
      address,

      location: {
        type: "Point",
        coordinates: [
          Number(longitude),
          Number(latitude)
        ]
      }

    });

    res.status(201).json({
      message: "Blood bank created successfully",
      bloodBank
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const getMe = async (req, res) => {

  try {

    const user = await User.findById(req.user._id).select("-password");

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};