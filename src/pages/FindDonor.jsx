import React, { useState } from "react";
import api from "../services/api";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";

import { ToastContainer, toast } from "react-toastify";

import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/* Fix Leaflet marker issue in React/Vite */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});


/* Map click location picker */

const LocationPicker = ({ setLocation, setAddress }) => {

  const MapClick = () => {

    useMapEvents({
      async click(e) {

        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        setLocation({ latitude: lat, longitude: lng });

        try {

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );

          const data = await res.json();

          setAddress({
            city: data.address.city || "",
            state: data.address.state || "",
            area: data.address.suburb || data.address.village || ""
          });

          toast.success("Location selected from map");

        } catch (err) {
          console.log(err);
        }

      }
    });

    return null;
  };

  return <MapClick />;
};


/* Main Page */

const FindDonor = () => {

  const [bloodGroup, setBloodGroup] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  });

  const [address, setAddress] = useState({
    city: "",
    area: "",
    state: ""
  });


  /* Detect current location */

  const detectLocation = () => {

    navigator.geolocation.getCurrentPosition(async (pos) => {

      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setLocation({ latitude: lat, longitude: lng });

      try {

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );

        const data = await res.json();

        setAddress({
          city: data.address.city || "",
          state: data.address.state || "",
          area: data.address.suburb || data.address.village || ""
        });

        toast.success("Current location detected");

      } catch (err) {
        console.log(err);
      }

    });

  };


  /* Search donors */

  const handleSearch = async () => {

    setLoading(true);
    setSearched(true);

    toast.info("Searching donors...");

    try {

      let res;

      if (bloodGroup) {
        res = await api.get(`/donor/find?bloodGroup=${bloodGroup}`);
      } else {
        res = await api.get("/donor/all");
      }

      setDonors(res.data);

      if (res.data.length === 0) {
        toast.warning("No donors found");
      } else {
        toast.success(`${res.data.length} donors found`);
      }

    } catch (err) {

      toast.error("Failed to fetch donors");

    }

    setLoading(false);

  };


  return (

    <div className="min-h-screen bg-gray-100">

      <ToastContainer />

      {/* HERO */}

      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-16">

        <h1 className="text-5xl font-bold mb-3">
          Find Blood Donors
        </h1>

        <p>
          Connect with verified blood donors in your area
        </p>

      </div>


      {/* FILTER BAR */}

      <div className="bg-white shadow p-6">

        <div className="max-w-7xl mx-auto grid grid-cols-6 gap-4">

          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="border p-3 rounded-lg"
          >

            <option value="">All Groups</option>
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
            value={address.city}
            placeholder="City"
            className="border p-3 rounded-lg"
            readOnly
          />

          <input
            value={address.area}
            placeholder="Area"
            className="border p-3 rounded-lg"
            readOnly
          />

          <input
            value={address.state}
            placeholder="State"
            className="border p-3 rounded-lg"
            readOnly
          />

          <button
            onClick={detectLocation}
            className="bg-gray-200 rounded-lg"
          >
            Detect Location
          </button>

          <button
            onClick={handleSearch}
            className="bg-red-600 text-white rounded-lg"
          >
            Search
          </button>

        </div>

      </div>


      {/* RESULTS */}

      <div className="p-10">

        {loading && (

          <div className="flex justify-center items-center h-60">

            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>

          </div>

        )}


        {!loading && searched && donors.length === 0 && (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold text-gray-700">
              No Blood Donors Found
            </h2>

          </div>

        )}




{/* DONOR CARDS */}

{!loading && donors.length > 0 && (

  <div className="mt-10 grid md:grid-cols-3 gap-6">

    {donors.map((donor, index) => (

      <div
        key={index}
        className="bg-white rounded-xl shadow p-5 border hover:shadow-lg transition"
      >

        <div className="flex justify-between items-center mb-3">

          <h3 className="text-lg font-bold">
            {donor.fullName}
          </h3>

          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            {donor.bloodGroup}
          </span>

        </div>

        <p className="text-gray-600 mb-2">
          📞 {donor.phone}
        </p>

        <p className="text-gray-600 mb-4">
          ⭐ Rating: {donor.rating || 5}
        </p>

        <button
          onClick={() => window.open(`tel:${donor.phone}`)}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Contact Donor
        </button>

      </div>

    ))}

  </div>

)}

        {!loading && (searched || location.latitude) && (

          <MapContainer
            center={
              location.latitude
                ? [location.latitude, location.longitude]
                : donors.length > 0
                ? [
                    Number(donors[0].location.coordinates[1]),
                    Number(donors[0].location.coordinates[0])
                  ]
                : [20.5937, 78.9629]
            }
            zoom={location.latitude ? 12 : 6}
            className="h-[600px] rounded-xl shadow"
          >

            <TileLayer
              attribution="OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationPicker
              setLocation={setLocation}
              setAddress={setAddress}
            />

            {/* USER LOCATION */}

            {location.latitude && (

              <Marker
                position={[
                  Number(location.latitude),
                  Number(location.longitude)
                ]}
              >
                <Popup>Your Location</Popup>
              </Marker>

            )}


            {/* DONOR MARKERS */}

            {donors.map((donor, index) => {

              const lat = Number(donor.location.coordinates[1]);
              const lng = Number(donor.location.coordinates[0]);

              return (

                <Marker key={index} position={[lat, lng]}>

                  <Popup>

                    <div>

                      <h3 className="font-bold">
                        {donor.fullName}
                      </h3>

                      <p>Blood: {donor.bloodGroup}</p>

                      <p>Phone: {donor.phone}</p>

                    </div>

                  </Popup>

                </Marker>

              );

            })}

          </MapContainer>

        )}

      </div>

    </div>

  );

};

export default FindDonor;