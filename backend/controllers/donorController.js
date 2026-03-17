import User from "../models/User.js";

export const toggleAvailability = async (req, res) => {

  try {

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (user.activeMode !== "Donor") {

      return res.status(403).json({
        message: "Only verified donors can enable availability"
      });

    }

    user.isAvailable = !user.isAvailable;

    await user.save();

    res.json({
      message: "Availability updated",
      isAvailable: user.isAvailable
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


/* ===============================
   FIND ALL DONORS
================================ */

export const findAllDonors = async (req, res) => {

  try {

    const donors = await User.find({
      activeMode: "Donor",
    }).select("fullName phone bloodGroup location rating");

    res.json(donors);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


/* ===============================
   FIND DONORS BY BLOOD GROUP
================================ */

export const findDonorsByBloodGroup = async (req, res) => {

  try {

    const { bloodGroup } = req.query;

    if (!bloodGroup) {
      return res.status(400).json({
        message: "Blood group is required"
      });
    }

    const donors = await User.find({
      bloodGroup,
      activeMode: "Donor",
      verificationStatus: "FullVerified",
      isAvailable: true
    }).select("fullName phone bloodGroup location rating");

    res.json(donors);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const getLeaderboard = async (req,res)=>{

try{

const users = await User.find({activeMode:"Donor"})
.sort({totalDonations:-1})
.limit(50)
.select("fullName totalDonations rating rewardPoints");

res.json({
success:true,
users
});

}catch(err){
res.status(500).json({message:err.message});
}

};