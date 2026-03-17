import User from "../models/User.js";

export const uploadBloodReport = async (req, res) => {

  try {

    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        message: "Blood report required"
      });
    }

    const user = await User.findById(userId);

    user.verificationStatus = "HalfVerified";

    await user.save();

    res.json({
      message: "Document uploaded. Waiting for admin verification"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


