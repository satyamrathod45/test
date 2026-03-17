import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../services/api";

const RequestDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [request,setRequest] = useState(null);

  const fetchRequest = async () => {

    const res = await api.get(`/request/${id}`);

    setRequest(res.data.request);

  };

  useEffect(()=>{
    fetchRequest();
  },[]);

  const acceptRequest = async () => {

    await api.put(`/request/${id}/accept`);

    navigate(`/tracking/${id}`);

  };

  if(!request) return <p>Loading...</p>;

  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-[400px]">

        <h2 className="text-2xl font-bold mb-4">
          Emergency Request
        </h2>

        <p>Blood: {request.requiredBloodGroup}</p>

        <p>Units: {request.units}</p>

        <p>Urgency: {request.urgencyLevel}</p>

        <button
          onClick={acceptRequest}
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg"
        >
          Accept Request
        </button>

      </div>

    </div>

  );

};

export default RequestDetails;