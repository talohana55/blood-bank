import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import "../Style/NavBar.css";
import axios from "axios";

const NavBar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/logger");
      if (response.data.success) {
        alert("Log file created!");
        setError("Log file created!");
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      setError(`Error creating log file: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Navbar expand="lg" className="navbar-container">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Brand as={Link} to="/" className="homepage-link">
          Blood Bank
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/blood-reception" className="nav-link">
              Blood Reception
            </Nav.Link>
            <Nav.Link as={Link} to="/routine-dispense" className="nav-link">
              Routine Dispense
            </Nav.Link>
            <Nav.Link as={Link} to="/emergency-dispense" className="nav-link">
              Emergency
            </Nav.Link>
            <Button
              onClick={handleClick}
              disabled={loading}
              className="nav-btn nav-link"
            >
              {loading ? "Creating..." : "Export Log File"}
            </Button>
            {error && <div className="error-message">{error}</div>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
