import React, { useState } from "react";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

const LocationPicker = ({ location, setLocation, setAddress }) => {

  const MapClick = () => {

    useMapEvents({
      async click(e) {

        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        setLocation({
          latitude: lat,
          longitude: lng
        });

        try {

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );

          const data = await res.json();

          setAddress(data.display_name);

        } catch (err) {
          console.log(err);
        }

      }
    });

    return null;
  };

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      className="h-60 rounded-lg"
    >
      <TileLayer
        attribution="OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClick />

      {location.latitude && location.longitude && (
        <Marker position={[location.latitude, location.longitude]} />
      )}

    </MapContainer>
  );
};

const Register = () => {

  const [loading,setLoading] = useState(false);
  const [isDonor,setIsDonor] = useState(false);
  const [file,setFile] = useState(null);
  const [address,setAddress] = useState("");

  const [location,setLocation] = useState({
    latitude:"",
    longitude:""
  });

  const [form,setForm] = useState({
    fullName:"",
    email:"",
    phone:"",
    password:"",
    bloodGroup:""
  });

  const handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const getCurrentLocation = ()=>{

    navigator.geolocation.getCurrentPosition(async(pos)=>{

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setLocation({
        latitude:lat,
        longitude:lng
      });

      try{

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );

        const data = await res.json();

        setAddress(data.display_name);

      }catch(err){
        console.log(err);
      }

      toast.success("Current location detected");

    });

  };

  const handleSubmit = async(e)=>{

    e.preventDefault();
    setLoading(true);

    try{

      await api.post("/auth/register",{
        ...form,
        latitude:location.latitude,
        longitude:location.longitude
      });

      if(isDonor && file){

        const formData = new FormData();
        formData.append("document",file);

        await api.post("/document/upload",formData,{
          headers:{
            "Content-Type":"multipart/form-data"
          }
        });

        toast.success("Registered. Donor verification pending");

      }else{

        toast.success("Registration successful");

      }

    }catch(err){

      toast.error(err.response?.data?.message || "Registration failed");

    }

    setLoading(false);

  };

  return(

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <ToastContainer/>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-[450px] space-y-4"
      >

        <h2 className="text-2xl font-bold text-center">
          Create Account
        </h2>

        <input
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <select
          name="bloodGroup"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        >
          <option>Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Current Location */}

        <button
          type="button"
          onClick={getCurrentLocation}
          className="w-full bg-gray-200 py-2 rounded-lg"
        >
          Use Current Location
        </button>

        {/* Map */}

        <LocationPicker
          location={location}
          setLocation={setLocation}
          setAddress={setAddress}
        />

        {/* Address */}

        <input
          value={address}
          readOnly
          placeholder="Selected address will appear here"
          className="w-full border p-3 rounded-lg bg-gray-100"
        />

        {/* Become donor */}

        <div className="flex items-center gap-2">

          <input
            type="checkbox"
            onChange={()=>setIsDonor(!isDonor)}
          />

          <label>Become Blood Donor</label>

        </div>

        {isDonor && (

          <input
            type="file"
            onChange={(e)=>setFile(e.target.files[0])}
            className="w-full border p-2 rounded-lg"
          />

        )}

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-lg"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-center text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-red-500 font-semibold"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

};

export default Register;