import React from "react";
import api from "../services/api";
import {useNavigate} from "react-router-dom";

const RequestCard = ({request,refresh}) => {

const navigate = useNavigate();

const acceptRequest = async()=>{

await api.put(`/request/${request._id}/accept`);

refresh();

navigate(`/tracking/${request._id}`);

};

return(

<div className="bg-white rounded-2xl shadow-lg p-6 relative">

{/* status badge */}

<span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm ${
request.status==="Accepted" ? "bg-green-100 text-green-600":"bg-yellow-100 text-yellow-600"
}`}>
{request.status==="Accepted"?"accepted":"pending"}
</span>

{/* blood icon */}

<div className="flex justify-center mb-4">

<div className="bg-red-100 p-4 rounded-full">
🩸
</div>

</div>

<h2 className="text-xl font-bold text-center">
{request.patientName}
</h2>

<p className="text-center text-red-500 font-semibold">
{request.requiredBloodGroup}
</p>

<div className="mt-4 space-y-2 text-gray-600">

<p>🏥 {request.hospitalName}</p>
<p>📍 {request.city}</p>
<p>🧑 Units Needed: {request.units}</p>

</div>

{request.status==="Searching" && (

<button
onClick={acceptRequest}
className="mt-6 w-full bg-green-500 text-white py-3 rounded-full"
>

✔ Accept Request

</button>

)}

{request.status==="Accepted" && (

<p className="mt-6 text-green-600 text-center">

Accepted by Donor

</p>

)}

</div>

);

};

export default RequestCard;