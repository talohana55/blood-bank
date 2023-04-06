import React, { useEffect, useState } from "react";
import { getAllHospitals } from "../middleware/InternalApi";
import {
  getBloodTypesToReceive,
  getBloodTypesToDonate,
  validBloodTypes,
  roomOptions,
} from "../middleware/functions";

const RoutineDispense = () => {
  //form properties
  const [bloodType, setBloodType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [room, setRoom] = useState("");
  var selectedHospital = {};

  //usable parameters

  const [hospitals, setHospital] = useState([]); //include hospitals list from API

  const handleBloodTypeChange = (event) => {
    setBloodType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const handleHospitalChange = (event) => {
    selectedHospital = event.target.value;
  };
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validBloodTypes.includes(bloodType)) {
      alert("Invalid blood type selected");
      return;
    }
    // reset form values
    setBloodType("");
    setQuantity(0);
    setRoom("");
    selectedHospital = {};
  };
  const getHospitals = async () => {
    try {
      const response = await getAllHospitals();
      if (response) {
        setHospital(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHospitals();
  }, []);
  return (
    <div className="form-div">
      <h3>Dispense Blood</h3>
      <form className="form" onSubmit={handleSubmit}>
        <select value={bloodType} onChange={handleBloodTypeChange}>
          <option value="">Select Blood Type</option>
          {validBloodTypes.map((blood) => (
            <option key={blood.id} value={blood.type}>
              {blood.type}
            </option>
          ))}
        </select>

        <div className="form-input">
          <select
            value={selectedHospital.hospitalName}
            onChange={handleHospitalChange}
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital.hospitalCode} value={hospital.hospitalName}>
                {hospital.hospitalName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-input">
          <select value={roomOptions.room} onChange={handleRoomChange}>
            <option value="">Select Room</option>
            {roomOptions.map((roomObj) => (
              <option key={roomObj.id} value={roomObj.room}>
                {roomObj.room}
              </option>
            ))}
          </select>
        </div>
        <div className="form-input">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <span>Quantity</span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RoutineDispense;
