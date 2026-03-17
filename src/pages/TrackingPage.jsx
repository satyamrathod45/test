import React,{useEffect,useState} from "react";
import {MapContainer,TileLayer,Marker,Polyline} from "react-leaflet";
import {useParams} from "react-router-dom";
import io from "socket.io-client";
import api from "../services/api";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const socket = io("http://localhost:5000",{withCredentials:true});

const donorIcon = new L.Icon({
iconUrl:"https://cdn-icons-png.flaticon.com/512/684/684908.png",
iconSize:[35,35]
});

const patientIcon = new L.Icon({
iconUrl:"https://cdn-icons-png.flaticon.com/512/149/149059.png",
iconSize:[35,35]
});

const TrackingPage = ()=>{

const {id} = useParams();

const [patient,setPatient] = useState(null);
const [donor,setDonor] = useState(null);

const [route,setRoute] = useState([]);
const [distance,setDistance] = useState(null);
const [eta,setEta] = useState(null);

const userId = localStorage.getItem("userId");


/* FETCH REQUEST */

useEffect(()=>{

const fetchRequest = async()=>{

const res = await api.get(`/request/${id}`);
const req = res.data.request;

if(req.location){

setPatient({
lat:req.location.coordinates[1],
lng:req.location.coordinates[0]
});

}

};

if(id) fetchRequest();

},[id]);



/* SOCKET */

useEffect(()=>{

socket.emit("joinRequestRoom",id);

socket.on("donorLocationUpdate",(data)=>{

console.log("Donor location:",data);

setDonor({
lat:data.latitude,
lng:data.longitude
});

});

return ()=>socket.off("donorLocationUpdate");

},[id]);



/* DONOR GPS */

useEffect(()=>{

if(!id) return;

const watchId = navigator.geolocation.watchPosition(

async(pos)=>{

const lat = pos.coords.latitude;
const lng = pos.coords.longitude;

setDonor({lat,lng});

await api.put(`/request/${id}/location`,{
latitude:lat,
longitude:lng
});

},

(err)=>console.log(err),

{enableHighAccuracy:true}

);

return ()=>navigator.geolocation.clearWatch(watchId);

},[id]);



/* ROUTE */

useEffect(()=>{

if(!donor || !patient) return;

const calculateRoute = async()=>{

const res = await fetch(
`https://router.project-osrm.org/route/v1/driving/${donor.lng},${donor.lat};${patient.lng},${patient.lat}?overview=full&geometries=geojson`
);

const data = await res.json();

const coords = data.routes[0].geometry.coordinates.map(c=>[c[1],c[0]]);

setRoute(coords);
setDistance((data.routes[0].distance/1000).toFixed(2));
setEta(Math.round(data.routes[0].duration/60));

};

calculateRoute();

},[donor,patient]);



return(

<div className="min-h-screen flex flex-col items-center pt-10 bg-gray-100">

<div className="w-[700px] h-[400px]">

<MapContainer
center={patient?[patient.lat,patient.lng]:[20.59,78.96]}
zoom={13}
className="h-full"
>

<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

{patient && <Marker position={[patient.lat,patient.lng]} icon={patientIcon}/>}

{donor && <Marker position={[donor.lat,donor.lng]} icon={donorIcon}/>}

{route.length>0 && <Polyline positions={route} color="red"/>}

</MapContainer>

</div>

<div className="bg-white w-[700px] mt-6 p-6 rounded-xl shadow">

<h2 className="text-red-600 font-bold text-xl">
🚑 Blood Donation Tracking
</h2>

<div className="flex justify-between mt-4">

<span>Distance: {distance || "..."}</span>
<span>ETA: {eta || "..."} min</span>

</div>

</div>

</div>

);

};

export default TrackingPage;