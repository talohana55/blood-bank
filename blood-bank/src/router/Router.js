import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login.js";
import Register from "../pages/Register.js";
import BloodReception from "../pages/BloodReception.js";
import EmergencyDispense from "../pages/EmergencyDispense.js";
import HomePage from "../pages/HomePage.js";
import DonationForm from "../pages/DonationForm.js";
import RoutineDispense from "../pages/routineDispense.js";

const RouterConfig = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/blood-reception" element={<BloodReception />} />
      <Route path="/emergency-dispense" element={<EmergencyDispense />} />
      <Route path="/donation-form" element={<DonationForm />} />
      <Route path="/routine-dispense" element={<RoutineDispense />} />
    </Routes>
  );
};

export default RouterConfig;
