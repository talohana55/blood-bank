import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "../Style/HomePage.css";
import {
  getAllBloodTransaction,
  getAllBloodUnits,
} from "../middleware/InternalApi";
import { israel_populationAvg } from "../middleware/functions";
const HomePage = () => {
  const [bloodTransactions, setBloodTransactions] = useState([]);
  const [bloodInventory, setBloodInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  const getBloodTransaction = async () => {
    try {
      const response = await getAllBloodTransaction();
      if (response) {
        // format date using moment
        const formattedData = response.map((item) => ({
          ...item,
          date: moment(item.date).format("DD/MM/YYYY"),
        }));
        setBloodTransactions(formattedData);
        setLoading(false);
      }
    } catch (err) {
      alert(`Error Get blood transactions : ${err}`);
    }
  };
  const getBloodInventory = async () => {
    try {
      const response = await getAllBloodUnits();
      if (response) {
        setBloodInventory(response);
        setLoading(false);
      }
    } catch (err) {
      alert(`Error Get blood transactions : ${err}`);
    }
  };

  useEffect(() => {
    getBloodTransaction();
    getBloodInventory();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="homePage-container">
      <div className="table-container">
        <h2> Blood Donation Transactions</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Collection Date</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {bloodTransactions.map((item) => (
              <tr key={item.cid}>
                <td>{item.bloodType}</td>
                <td>{item.date}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="table-container">
        <h2> Blood Inventory</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {bloodInventory.map((item) => (
              <tr key={item.cid}>
                <td>{item.bloodType}</td>
                <td>{item.units}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="table-container">
        <h2>Population Blood Type</h2>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Country</th>
              <th>Population</th>
              <th>O+</th>
              <th>A+</th>
              <th>B+</th>
              <th>AB+</th>
              <th>O-</th>
              <th>A-</th>
              <th>B-</th>
              <th>AB-</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Israel</td>
              <td>{israel_populationAvg.population}</td>
              <td>{israel_populationAvg.O_positive}</td>
              <td>{israel_populationAvg.A_positive}</td>
              <td>{israel_populationAvg.B_positive}</td>
              <td>{israel_populationAvg.AB_positive}</td>
              <td>{israel_populationAvg.O_negative}</td>
              <td>{israel_populationAvg.A_negative}</td>
              <td>{israel_populationAvg.B_negative}</td>
              <td>{israel_populationAvg.AB_negative}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default HomePage;
