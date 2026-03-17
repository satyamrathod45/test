import React,{useEffect,useState} from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const RequestDashboard = () => {

const [requests,setRequests] = useState([]);
const [tab,setTab] = useState("all");
const [loading,setLoading] = useState(false);
const [userMode,setUserMode] = useState("");
const [userId,setUserId] = useState("");

const navigate = useNavigate();


/* FETCH CURRENT USER */

const fetchUser = async()=>{

try{

const res = await api.get("/auth/me");

setUserMode(res.data.user.activeMode);
setUserId(res.data.user._id);

}catch(err){
console.log(err);
}

};


/* FETCH REQUESTS */

const fetchRequests = async(currentTab = tab)=>{

setLoading(true);

try{

let res;

if(currentTab === "all"){
res = await api.get("/request/all");
}

if(currentTab === "uploaded"){
res = await api.get("/request/my-requests");
}

if(currentTab === "accepted"){
res = await api.get("/request/my-accepted");
}

setRequests(res.data.requests || []);

}catch(err){
console.log(err);
}

setLoading(false);

};


useEffect(()=>{
fetchUser();
fetchRequests(tab);
},[tab]);


/* ACCEPT REQUEST */

const acceptRequest = async(id)=>{

try{

await api.put(`/request/${id}/accept`);

fetchRequests(tab);

navigate(`/tracking/${id}`);

}catch(err){
console.log(err);
}

};


/* TRACKING PERMISSION CHECK */

const canTrack = (req)=>{

const patient = req.patientId?._id || req.patientId;
const donor = req.acceptedBy?._id || req.acceptedBy;

return userId === patient || userId === donor;

};


return(

<div className="min-h-screen bg-[#f7f4f2] p-10">

<h1 className="text-4xl font-bold text-center mb-8">
Blood Requests
</h1>


{/* Tabs */}

<div className="flex justify-center gap-4 mb-10">

<button
onClick={()=>setTab("all")}
className={`px-6 py-2 rounded-full ${tab==="all"?"bg-red-500 text-white":"bg-gray-200"}`}
>
All Requests
</button>

<button
onClick={()=>setTab("uploaded")}
className={`px-6 py-2 rounded-full ${tab==="uploaded"?"bg-red-500 text-white":"bg-gray-200"}`}
>
My Requests
</button>

<button
onClick={()=>setTab("accepted")}
className={`px-6 py-2 rounded-full ${tab==="accepted"?"bg-red-500 text-white":"bg-gray-200"}`}
>
Accepted Requests
</button>

</div>


{/* Loading */}

{loading && (

<div className="flex justify-center py-20">
<div className="animate-spin h-16 w-16 border-t-4 border-red-500 rounded-full"></div>
</div>

)}


/* REQUEST CARDS */

{!loading && requests.length > 0 ? (

<div className="grid md:grid-cols-3 gap-8">

{requests.map(req=>{

const allowedToTrack = canTrack(req);

return(

<div
key={req._id}
onClick={()=>{

if(req.status==="Accepted" && allowedToTrack){
navigate(`/tracking/${req._id}`)
}

}}
className={`bg-white rounded-xl shadow p-6 cursor-pointer transition hover:shadow-lg
${req.status==="Accepted" ? "border-l-4 border-green-500" : ""}
`}
>

<h2 className="text-xl font-bold text-red-600">
{req.requiredBloodGroup} Needed
</h2>

<p className="mt-1 text-gray-600">
Units: {req.units}
</p>

<p className="text-gray-600">
Urgency: {req.urgencyLevel}
</p>

<p className="mt-2 text-sm text-gray-500">
Status: {req.status}
</p>


{/* ACCEPT BUTTON */}

{userMode === "Donor" && req.status === "Searching" && tab!=="uploaded" && (

<button
onClick={(e)=>{
e.stopPropagation();
acceptRequest(req._id);
}}
className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
>
Accept Request
</button>

)}


{/* BECOME DONOR */}

{userMode === "Patient" && req.status==="Searching" && (

<button
onClick={(e)=>{
e.stopPropagation();
navigate("/become-donor");
}}
className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
>
Become a Donor
</button>

)}


{/* TRACKING */}

{req.status==="Accepted" && allowedToTrack && (

<p className="mt-4 text-green-600 font-semibold">
Click to Track Donation
</p>

)}

{req.status==="Accepted" && !allowedToTrack && (

<p className="mt-4 text-gray-400 text-sm">
Tracking available only for patient & donor
</p>

)}

</div>

);

})}

</div>

) : (

<div className="text-center py-20">

<div className="text-7xl mb-6">🩸</div>

<h2 className="text-2xl font-bold text-gray-700">
No Requests Found
</h2>

<p className="text-gray-500 mt-2">

{tab==="uploaded" && "You haven't created any blood requests yet."}
{tab==="accepted" && "You haven't accepted any requests yet."}
{tab==="all" && "There are currently no blood requests."}

</p>

<div className="flex justify-center gap-4 mt-8">

<button
onClick={()=>navigate("/create-request")}
className="bg-red-500 text-white px-6 py-3 rounded-lg"
>
Create Request
</button>

<button
onClick={()=>navigate("/find-donors")}
className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
Find Donors
</button>

</div>

</div>

)}

</div>

);

};

export default RequestDashboard;