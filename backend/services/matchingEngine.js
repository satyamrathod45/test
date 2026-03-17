import User from "../models/User.js";

/*
---------------------------------------
Blood Compatibility Function
---------------------------------------
*/

const bloodCompatibility = {

  "O-": ["O-"],
  "O+": ["O+", "O-"],
  "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]

};



/*
---------------------------------------
AI Donor Matching
---------------------------------------
*/

export const findBestDonors = async (
  latitude,
  longitude,
  requiredBloodGroup
) => {

  const compatibleGroups =
    bloodCompatibility[requiredBloodGroup] || [];

  const donors = await User.aggregate([
    {
      $geoNear: {

        near: {
          type: "Point",
          coordinates: [
            parseFloat(longitude),
            parseFloat(latitude)
          ]
        },

        distanceField: "distance",
        spherical: true

      }
    },

    {
      $match: {

        activeMode: "Donor",
        verificationStatus: "FullVerified",
        bloodGroup: { $in: compatibleGroups }

      }
    },

    {
      $addFields: {

        reliabilityScore: {
          $add: [
            { $multiply: ["$rating", 2] },
            { $cond: [
              { $eq: ["$verificationStatus", "FullVerified"] },
              5,
              0
            ]}
          ]
        }

      }
    }

  ]);



  /*
  ---------------------------------------
  Score Calculation
  ---------------------------------------
  */

  const rankedDonors = donors.map(donor => {

    const distanceScore =
      donor.distance / 1000;

    const reliability =
      donor.reliabilityScore || 0;

    const rating =
      donor.rating || 0;

    const score =
      (distanceScore * 0.4) +
      (reliability * 0.3) +
      (rating * 0.2);

    return {
      ...donor,
      aiScore: score
    };

  });



  /*
  ---------------------------------------
  Sort Best Donors
  ---------------------------------------
  */

  rankedDonors.sort((a, b) =>
    a.aiScore - b.aiScore
  );



  return rankedDonors.slice(0, 10);

};