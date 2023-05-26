import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BloodReception from "./Routes/BloodReception";
import RoutineDispense from "./Routes/routineDispense";
import EmergencyDispense from "./Routes/EmergencyDispense";
import NavBar from "./components/NavBar";
import HomePage from "./Routes/HomePage";

function App() {
   return (
    <Router>
      <div className="app">
        <NavBar className=".navbar" />
        <main className="container-app">
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<BloodReception />} path="/bloodReception" />
            <Route element={<RoutineDispense />} path="/routineDispense" />
            <Route element={<EmergencyDispense />} path="/emergencyDispense" />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
