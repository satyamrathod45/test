import Request from "../models/Request.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

/*
CREATE BLOOD REQUEST
*/
export const createRequest = async (req,res)=>{
try{

const {
requiredBloodGroup,
units,
message,
urgencyLevel,
requestType,
donorId,
latitude,
longitude
} = req.body;

if(!latitude || !longitude){
return res.status(400).json({
success:false,
message:"Location coordinates required"
});
}

const patientId = req.user._id;

const request = await Request.create({
patientId,
location:{
type:"Point",
coordinates:[longitude,latitude]
},
requiredBloodGroup,
units,
message,
urgencyLevel,
requestType,
status:"Searching"
});

/* PERSONAL REQUEST */
if(requestType==="Personal" && donorId){

const notification = await Notification.create({
recipient:donorId,
type:"DONOR_REQUEST",
title:"Blood Donation Request",
message:`Patient needs ${requiredBloodGroup} blood`,
data:{requestId:request._id}
});

if(global.io){
global.io.to(donorId.toString()).emit("newNotification",notification);
}

}

/* PUBLIC REQUEST */
if(requestType==="Public"){

const donors = await User.find({
activeMode:"Donor",
verificationStatus:"FullVerified"
}).select("_id");

const notifications = donors.map(d=>({
recipient:d._id,
type:"DONOR_REQUEST",
title:"Blood Request Nearby",
message:`Someone needs ${requiredBloodGroup} blood`,
data:{requestId:request._id}
}));

await Notification.insertMany(notifications);

if(global.io){
donors.forEach(d=>{
global.io.to(d._id.toString()).emit("newNotification",{
requestId:request._id
});
});
}

}

res.status(201).json({
success:true,
request
});

}catch(err){
console.error(err);
res.status(500).json({
success:false,
message:err.message
});
}
};



/*
ACCEPT REQUEST
*/
export const acceptRequest = async (req,res)=>{
try{

const request = await Request.findById(req.params.id);

if(!request){
return res.status(404).json({message:"Request not found"});
}

if(request.status!=="Searching"){
return res.status(400).json({message:"Request already accepted"});
}

/* prevent patient accepting own request */
if(String(request.patientId)===String(req.user._id)){
return res.status(400).json({
message:"You cannot accept your own request"
});
}

/* ensure only donors accept */
const user = await User.findById(req.user._id);
if(user.activeMode!=="Donor"){
return res.status(403).json({
message:"Only donors can accept requests"
});
}

request.status="Accepted";
request.acceptedBy=req.user._id;
request.acceptedType="Donor";

await request.save();

/* notify patient */
if(global.io){
global.io.to(request.patientId.toString()).emit("requestAccepted",{
requestId:request._id,
donorId:req.user._id
});
}

res.json({
success:true,
request
});

}catch(err){
console.error(err);
res.status(500).json({
success:false,
message:err.message
});
}
};



/*
UPDATE DONOR LOCATION (LIVE TRACKING)
*/
export const updateDonorLocation = async (req,res)=>{
try{

const {requestId} = req.params;
const {latitude,longitude} = req.body;

const request = await Request.findById(requestId);

if(!request){
return res.status(404).json({message:"Request not found"});
}

if(request.status!=="Accepted"){
return res.status(400).json({
message:"Tracking available only after acceptance"
});
}

/* emit live location */
if(global.io){
global.io.to(requestId).emit("donorLocationUpdate",{
latitude,
longitude
});
}

res.json({
success:true,
message:"Location updated"
});

}catch(err){
console.error(err);
res.status(500).json({
success:false,
message:err.message
});
}
};



/*
COMPLETE DONATION
*/
export const completeDonation = async (req,res)=>{
try{

const request = await Request.findById(req.params.id);

if(!request){
return res.status(404).json({message:"Request not found"});
}

request.status="Completed";

await request.save();

res.json({
success:true,
message:"Donation completed"
});

}catch(err){
console.error(err);
res.status(500).json({
success:false,
message:err.message
});
}
};



/*
GET ALL REQUESTS
*/
export const getAllRequests = async (req,res)=>{
try{

const requests = await Request.find()
.populate("patientId","fullName phone")
.populate("acceptedBy","fullName phone")
.sort({createdAt:-1});

res.json({
success:true,
requests
});

}catch(err){
console.error(err);
res.status(500).json({
success:false,
message:err.message
});
}
};



/*
MY REQUESTS
*/
export const getMyRequests = async (req,res)=>{
try{

const requests = await Request.find({
patientId:req.user._id
})
.populate("acceptedBy","fullName phone")
.sort({createdAt:-1});

res.json({
success:true,
requests
});

}catch(err){
console.error(err);
res.status(500).json({
success:false,
message:err.message
});
}
};



/*
MY ACCEPTED REQUESTS
*/
export const getMyAcceptedRequests = async (req,res)=>{
try{

const requests = await Request.find({
acceptedBy:req.user._id
})
.populate("patientId","fullName phone")
.sort({createdAt:-1});

res.json({
success:true,
requests
});

}catch(err){
console.error(err);
res.status(500).json({
success:false,
message:err.message
});
}
};



/*
RECOMMENDED DONORS (placeholder)
*/
export const getRecommendedDonors = (req,res)=>{
res.json({
success:true,
donors:[]
});
};



export const getRequestById = async (req,res)=>{
try{

const request = await Request.findById(req.params.id)
.populate("patientId","fullName phone")
.populate("acceptedBy","fullName phone");

if(!request){
return res.status(404).json({
success:false,
message:"Request not found"
});
}

res.json({
success:true,
request
});

}catch(err){

res.status(500).json({
success:false,
message:err.message
});

}
};