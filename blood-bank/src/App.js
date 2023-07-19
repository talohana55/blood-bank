import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  useNavigate,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import RouterConfig from "./router/Router.js";
import "./App.css";

const CheckToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token && !["/login", "/register"].includes(location.pathname)) {
      navigate("/login");
    }
  }, [token, navigate, location.pathname]);

  return null;
};

const App = () => {
  return (
    <div className="container-app">
      <Router>
        <NavBar />
        <CheckToken />
        <RouterConfig />
      </Router>
    </div>
  );
};

export default App;
