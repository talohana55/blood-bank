import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./App.css";
import RouterConfig from "./router/Router.js";

const App = () => {
  return (
    <div className="container-app">
      <Router>
        <NavBar />
        <RouterConfig />
      </Router>
    </div>
  );
};

export default App;
