import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Hospital from "./models/Hospital.js";
import BloodBank from "./models/BloodBank.js";
import Request from "./models/Request.js";

dotenv.config();

// 🔗 CONNECT DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected 🚀");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// 📍 Random location near Amravati
const getRandomLocation = () => {
  const lat = 20.93 + (Math.random() - 0.5) * 0.15;
  const lng = 77.75 + (Math.random() - 0.5) * 0.15;
  return [lng, lat];
};

// 🩸 Blood groups
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 🧠 Real Indian names
const names = [
  "Aarav Sharma","Vivaan Patel","Aditya Verma","Arjun Reddy","Sai Kumar",
  "Rohit Deshmukh","Karan Mehta","Yash Gupta","Rahul Joshi","Siddharth Jain",
  "Ananya Singh","Priya Nair","Sneha Patil","Pooja Kulkarni","Neha Agarwal",
  "Riya Shah","Isha Kapoor","Kavya Iyer","Meera Choudhary","Aditi Mishra",
  "Harsh Vardhan","Manish Yadav","Deepak Tiwari","Nikhil Bansal","Vikas Pawar",
  "Shubham Patil","Akash Thakur","Gaurav Singh","Tanmay Kulkarni","Omkar Deshpande",
  "Tejas Joshi","Aniket More","Rutuja Patil","Sakshi Gupta","Komal Sharma","Bhavna Jain"
];

// 👤 USERS
const seedUsers = async () => {
  const users = [];

  for (let i = 0; i < names.length; i++) {
    const isDonor = Math.random() > 0.4;

    users.push({
      fullName: names[i],
      phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      email: names[i].toLowerCase().replace(" ", "") + "@mail.com",
      password: "123456",
      bloodGroup: randomFromArray(bloodGroups),
      activeMode: isDonor ? "Donor" : "Patient",
      verificationStatus: isDonor ? "FullVerified" : "HalfVerified",
      isAvailable: isDonor ? Math.random() > 0.3 : false,
      location: {
        type: "Point",
        coordinates: getRandomLocation(),
      },
      totalDonations: isDonor ? Math.floor(Math.random() * 15) : 0,
      totalRatings: Math.floor(Math.random() * 50),
      rating: (Math.random() * 2 + 3).toFixed(1),
      rewardPoints: isDonor ? Math.floor(Math.random() * 200) : 0,
    });
  }

  const createdUsers = await User.insertMany(users);
  console.log("Users seeded 👥🔥");
  return createdUsers;
};

// 🏥 HOSPITALS
const seedHospitals = async () => {
  const hospitals = [];

  for (let i = 1; i <= 20; i++) {
    hospitals.push({
      name: `Hospital ${i}`,
      phone: `8${Math.floor(100000000 + Math.random() * 900000000)}`,
      email: `hospital${i}@mail.com`,
      address: `Amravati Area ${i}`,
      location: {
        type: "Point",
        coordinates: getRandomLocation(),
      },
      verified: true,
    });
  }

  await Hospital.insertMany(hospitals);
  console.log("Hospitals seeded 🏥");
};

// 🩸 BLOOD BANKS
const seedBloodBanks = async () => {
  const banks = [];

  for (let i = 1; i <= 20; i++) {
    banks.push({
      name: `Blood Bank ${i}`,
      phone: `7${Math.floor(100000000 + Math.random() * 900000000)}`,
      email: `bloodbank${i}@mail.com`,
      address: `Amravati Zone ${i}`,
      location: {
        type: "Point",
        coordinates: getRandomLocation(),
      },
      bloodInventory: {
        "A+": Math.floor(Math.random() * 20),
        "A-": Math.floor(Math.random() * 10),
        "B+": Math.floor(Math.random() * 20),
        "B-": Math.floor(Math.random() * 10),
        "AB+": Math.floor(Math.random() * 10),
        "AB-": Math.floor(Math.random() * 5),
        "O+": Math.floor(Math.random() * 25),
        "O-": Math.floor(Math.random() * 10),
      },
      verified: true,
    });
  }

  await BloodBank.insertMany(banks);
  console.log("Blood Banks seeded 🩸");
};

// 🚨 REQUESTS
const seedRequests = async (users) => {
  const requests = [];

  for (let i = 0; i < 30; i++) {
    const user = randomFromArray(users);

    requests.push({
      patientId: user._id,
      location: {
        type: "Point",
        coordinates: getRandomLocation(),
      },
      requiredBloodGroup: randomFromArray(bloodGroups),
      units: Math.ceil(Math.random() * 3),
      message: "Urgent blood required",
      urgencyLevel: randomFromArray(["Low","Medium","High","Critical"]),
      requestType: Math.random() > 0.5 ? "Public" : "Personal",
      depositAmount: 50,
      depositStatus: "Paid",
      status: "Searching",
    });
  }

  await Request.insertMany(requests);
  console.log("Requests seeded 🚨");
};

// 🌱 MAIN SEED FUNCTION
const seedAll = async () => {
  try {
    await User.deleteMany();
    await Hospital.deleteMany();
    await BloodBank.deleteMany();
    await Request.deleteMany();

    console.log("Old data cleared 🧹");

    const users = await seedUsers();
    await seedHospitals();
    await seedBloodBanks();
    await seedRequests(users);

    console.log("🔥 ALL DATA SEEDED SUCCESSFULLY");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// 🚀 RUN
connectDB().then(seedAll);