import React, { useEffect, useState } from "react";
import api from "../src/services/api";
import { Link } from "react-router-dom";

const RequestDashboard = () => {

  const [requests,setRequests] = useState([]);

  const fetchRequests = async () => {

    try {

      const res = await api.get("/request");

      setRequests(res.data.requests || []);

    } catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{
    fetchRequests();
  },[]);

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        Blood Requests
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {requests.map(req => (

          <div
            key={req._id}
            className="bg-white p-6 rounded-xl shadow"
          >

            <h2 className="text-xl font-bold text-red-600">
              {req.requiredBloodGroup} Needed
            </h2>

            <p className="text-gray-600">
              Units: {req.units}
            </p>

            <p className="text-gray-600">
              Urgency: {req.urgencyLevel}
            </p>

            <Link
              to={`/request/${req._id}`}
              className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded"
            >
              View Request
            </Link>

          </div>

        ))}

      </div>

    </div>

  );

};

export default RequestDashboard;