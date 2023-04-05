import React, { useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BloodReception from "./Routes/BloodReception";
import RoutineDispense from "./Routes/routineDispense";
import EmergencyDispense from "./Routes/EmergencyDispense";
import NavBar from "./Components/NavBar";
import HomePage from "./Routes/HomePage";

function App() {
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/")
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error));
  // }, []);

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
