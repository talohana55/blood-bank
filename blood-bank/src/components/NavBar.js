import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import "../Style/NavBar.css";
import { getLogs } from "../middleware/InternalApi";

const NavBar = () => {
  const logExport = () => {
    getLogs();
    alert("Create Log File!");
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
            <Nav.Link as={Link} to="/bloodReception" className="nav-link">
              Blood Reception
            </Nav.Link>
            <Nav.Link as={Link} to="/bloodtypeDonors" className="nav-link">
              Blood Type Donors
            </Nav.Link>
            <Nav.Link as={Link} to="/routineDispense" className="nav-link">
              Routine Dispense
            </Nav.Link>
            <Nav.Link as={Link} to="/emergencyDispense" className="nav-link">
              Emergency
            </Nav.Link>
            <Nav.Link as={Button} onClick={logExport} className="nav-btn nav-link">
              Export Log File
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
