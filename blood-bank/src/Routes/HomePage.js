import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "../Style/HomePage.css";

const HomePage = () => {
  const [bloodUnits, setBloodUnits] = useState([]);

  const getAllBloodUnits = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/bloodUnits/get"
      );
      if (response.data) {
        console.log(response.data);
        setBloodUnits(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllBloodUnits();
  }, []);

  return (
    <div className="homePage-container">
      <div className="table-container">
        <h2> Compatible Blood Type Donors</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Collection Date</th>
              <th>Expiry Date</th>
              <th>Is Frozen</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {bloodUnits.map((item) => {
              <tr key={item.cid}>
                <td>{item.bloodType}</td>
                <td>{item.collectionDate}</td>
                <td>{item.expiryDate}</td>
                <td>{item.isFrozen}</td>
                <td>{item.units}</td>
              </tr>;
            })}
          </tbody>
        </Table>
      </div>
      <div className="table-container">
        <h2>Population Blood Type</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Country</th>
              <th>Population</th>
              <th>O+</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default HomePage;
