import React, { useEffect } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import BloodReception from './Routes/BloodReception';
import RoutineDispense from './Routes/routineDispense';
import EmergencyDispense from './Routes/EmergencyDispense';
import NavBar from './Components/NavBar';


function App() {

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Router>
      <div className="app">
        <NavBar />
        <main className="container-app">
          <Routes>
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
