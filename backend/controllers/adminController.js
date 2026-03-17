import User from "../models/User.js";

export const verifyDonor = async (req, res) => {

  try {

    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.verificationStatus !== "HalfVerified") {
      return res.status(400).json({
        message: "User has not uploaded blood report"
      });
    }

    user.verificationStatus = "FullVerified";
    user.activeMode = "Donor";

    await user.save();

    res.json({
      message: "User verified as donor"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

