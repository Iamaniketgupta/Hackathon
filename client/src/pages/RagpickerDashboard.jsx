import React from "react";

import Footer from '../components/Footer';
import Background from '../components/Background';
import Sidebar from "../components/ragpickerDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Dashboard from "../components/ragpickerDashboard/Dashboard";
// import ProfilePage from "../components/ragpickerDashboard/ProfilePage";
import AllJobs from "../components/ragpickerDashboard/AllJobs";
import RagPickerProfile from "../components/ragPickerProfilePage/RagPickerProfile";
import Navbar from "../components/Navbar";
const ragpickerDashboard = () => {
  return (
    <div>
      <Background>
        <Navbar/>
        <div className="flex min-h-[100vh] mt-3">
          <Sidebar/>
          <Outlet/>
        </div>
      </Background>
      <Footer/>
    </div>
  );
};

export default ragpickerDashboard;
