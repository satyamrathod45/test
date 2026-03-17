import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Register";
import FindDonor from "./pages/FindDonor";
import RequestDetails from "./pages/RequestDetails";
import RequestDashboard from "./pages/RequestDashboard";
import TrackingPage from "./pages/TrackingPage";
import Navbar from "./components/Navbar";
import CreateRequest from "./pages/CreateRequest";
import API from "./services/api";
import Footer from "./components/Footer";
import UserDashboard from "./pages/UserDashboard";
function App() {

const handleLogout = async () => {

  try {

    // call backend logout (removes cookie token)
    await API.post("/auth/logout");

  } catch (error) {
    console.log(error);
  }

  // clear frontend storage
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("activeMode");

  // redirect
  window.location.href = "/login";
};
  
  return (
    <BrowserRouter>

<Navbar handleLogout={handleLogout}></Navbar>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path="/find-donors" element={<FindDonor />} />
        <Route
          path="/request"
          element={<RequestDashboard />}
        />

        <Route
          path="/request/:id"
          element={<RequestDetails />}
        />

        <Route
          path="/tracking/:id"
          element={<TrackingPage />}
        />

        <Route
        path="/create-request" 
        element={<CreateRequest />} />

                <Route
        path="/dashboard" 
        element={<UserDashboard />} />
      </Routes>

      <Footer />

    </BrowserRouter>

  );

}

export default App;