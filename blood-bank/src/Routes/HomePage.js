import React from "react";
import Table from "react-bootstrap/Table";

const HomePage = () => {
  return (
    <div className="homePage-container">
      <div className="table-container">
        <h2> Compatible Blood Type Donors</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Blood Type</th>
              <th>Donate Blood To</th>
              <th>Receive Blood From</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A+</td>
              <td>B O AB</td>
              <td>B O AB</td>
            </tr>
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
