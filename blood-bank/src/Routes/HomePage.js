import React, { useState, useEffect } from "react";
import moment from "moment";
import Table from "react-bootstrap/Table";
import "../Style/HomePage.css";
import { getAllBloodTransaction } from "../middleware/InternalApi";

const HomePage = () => {
  const [bloodData, setBloodData] = useState([]);

  const getAllBloodData = async () => {
    try {
      const response = await getAllBloodTransaction();
      if (response) {
        // format date using moment
        const formattedData = response.map((item) => ({
          ...item,
          date: moment(item.date).format("DD/MM/YYYY"),
        }));
        setBloodData(formattedData);
      }
    } catch (err) {
      console.error(err);
      alert("Error Get blood transactions");
    }
  };

  useEffect(() => {
    getAllBloodData();
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

              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {bloodData.map((item) => (
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
        <h2>Population Blood Type</h2>
        {/* <Table striped bordered hover>
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
        </Table> */}
      </div>
    </div>
  );
};

export default HomePage;
