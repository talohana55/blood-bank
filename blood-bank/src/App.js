import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BloodReception from "./Routes/BloodReception";
import RoutineDispense from "./Routes/routineDispense";
import EmergencyDispense from "./Routes/EmergencyDispense";
import DonationForm from "./Routes/DonationForm";
import HomePage from "./Routes/HomePage";
import NavBar from "./components/NavBar";

function App() {
  // Assume we have a variable `userType` that determines the user type (e.g., "donor" or "user")
  const userType = "donor"; // Example value, replace with your logic to determine the user type

  return (
    <Router>
      <div className="app">
        <NavBar className=".navbar" />
        <main className="container-app">
          <Routes>
            <Route element={<HomePage />} path="/" />

            {userType === "donor" && (
              <Route element={<DonationForm />} path="/donation" />
            )}

            {userType === "donor" && (
              <>
                <Route element={<BloodReception />} path="/bloodReception" />
                <Route element={<RoutineDispense />} path="/routineDispense" />
                <Route element={<DonationForm />} path="/donation" />
                <Route
                  element={<EmergencyDispense />}
                  path="/emergencyDispense"
                />
              </>
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
