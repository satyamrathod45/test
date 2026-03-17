import React,{useState,useEffect} from "react";
import api from "../services/api";
import {useNavigate} from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRequest = ()=>{

const navigate = useNavigate();

const [loading,setLoading] = useState(false);
const [donors,setDonors] = useState([]);

const [form,setForm] = useState({

requiredBloodGroup:"",
units:"",
message:"",
urgencyLevel:"Normal",
requestType:"Public",
donorId:"",
latitude:null,
longitude:null

});

const handleChange=(e)=>{

setForm({...form,[e.target.name]:e.target.value});

};

/*
GET USER LOCATION
*/

const getLocation = ()=>{

if(!navigator.geolocation){

toast.error("Geolocation not supported");

return;

}

navigator.geolocation.getCurrentPosition(

(position)=>{

setForm(prev=>({

...prev,
latitude:position.coords.latitude,
longitude:position.coords.longitude

}));

toast.success("Location captured");

},

(error)=>{

toast.error("Unable to fetch location");

}

);

};

/*
FETCH DONORS
*/

useEffect(()=>{

const fetchDonors = async()=>{

try{

const res = await api.get("/donor/all");

setDonors(res.data);

}catch(err){

console.log(err);

}

};

fetchDonors();

},[]);

/*
SUBMIT REQUEST
*/

const handleSubmit = async(e)=>{

e.preventDefault();

if(!form.latitude || !form.longitude){

toast.error("Please capture your location");

return;

}

setLoading(true);

try{

await api.post("/request",form);

toast.success("Blood request created");

setTimeout(()=>{
navigate("/requests");
},1500);

}catch(err){

toast.error(err.response?.data?.message || "Failed to create request");

}

setLoading(false);

};

return(

<div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

<ToastContainer/>

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow w-[450px] space-y-4"
>

<h2 className="text-2xl font-bold text-center">
Create Blood Request
</h2>

{/* Blood Group */}

<select
name="requiredBloodGroup"
onChange={handleChange}
className="w-full border p-3 rounded-lg"
required
>

<option value="">Select Blood Group</option>
<option>A+</option>
<option>A-</option>
<option>B+</option>
<option>B-</option>
<option>AB+</option>
<option>AB-</option>
<option>O+</option>
<option>O-</option>

</select>

{/* Units */}

<input
type="number"
name="units"
placeholder="Units Needed"
onChange={handleChange}
className="w-full border p-3 rounded-lg"
required
/>

{/* Location */}

<button
type="button"
onClick={getLocation}
className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
>
Capture My Location
</button>

{form.latitude && (
<p className="text-sm text-green-600">
Location captured ✔
</p>
)}

{/* Urgency */}

<select
name="urgencyLevel"
onChange={handleChange}
className="w-full border p-3 rounded-lg"
>

<option value="Normal">Normal</option>
<option value="High">High</option>
<option value="Critical">Critical</option>

</select>

{/* Request Type */}

<select
name="requestType"
onChange={handleChange}
className="w-full border p-3 rounded-lg"
>

<option value="Public">Public Request</option>
<option value="Personal">Personal Request</option>

</select>

{/* Donor selection if personal */}

{form.requestType==="Personal" && (

<select
name="donorId"
onChange={handleChange}
className="w-full border p-3 rounded-lg"
required
>

<option value="">Select Donor</option>

{donors.map(donor=>(
<option key={donor._id} value={donor._id}>
{donor.fullName} ({donor.bloodGroup})
</option>
))}

</select>

)}

{/* Message */}

<textarea
name="message"
placeholder="Additional message"
onChange={handleChange}
className="w-full border p-3 rounded-lg"
/>

{/* Submit */}

<button
type="submit"
className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
>

{loading ? "Creating Request..." : "Create Request"}

</button>

</form>

</div>

);

};

export default CreateRequest;