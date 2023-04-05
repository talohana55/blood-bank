import React, { useEffect, useState } from "react";
import { getAllHospitals } from "../middleware/InternalApi";

const RoutineDispense = () => {
  const [bloodType, setBloodType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [hospital, setHospital] = useState([]);
  const [room, setRoom] = useState("");
  const [bloodAction, setBloodAction] = useState("");
  const validBloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];
  const roomOptions = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5"];

  const getBloodTypesToReceive = (bloodType) => {
    const canReceiveFrom = {
      "A+": ["A+", "A-", "O+", "O-"],
      "O+": ["O+", "O-"],
      "B+": ["B+", "B-", "O+", "O-"],
      "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "A-": ["A-", "O-"],
      "O-": ["O-"],
      "B-": ["B-", "O-"],
      "AB-": ["AB-", "A-", "B-", "O-"],
    };

    if (!validBloodTypes.includes(bloodType)) {
      return [];
    }

    return canReceiveFrom[bloodType];
  };
  const getBloodTypesToDonate = (bloodType) => {
    const canDonateTo = {
      "A+": ["A+", "AB+"],
      "O+": ["O+", "A+", "B+", "AB+"],
      "B+": ["B+", "AB+"],
      "AB+": ["AB+"],
      "A-": ["A+", "A-", "AB+", "AB-"],
      "O-": ["A+", "B+", "AB+", "A-", "B-", "AB-", "O+", "O-"],
      "B-": ["B+", "B-", "AB+", "AB-"],
      "AB-": ["AB+", "AB-"],
    };

    if (!validBloodTypes.includes(bloodType)) {
      return [];
    }

    return canDonateTo[bloodType];
  };

  const handleBloodTypeChange = (event) => {
    setBloodType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const handleHospitalChange = (event) => {
    const selectedHospital = event.target.value;
  };
  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleActionChange = (event) => {
    console.log(event.target.value);
    setBloodAction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validBloodTypes.includes(bloodType)) {
      alert("Invalid blood type selected");
      return;
    }
    // code to submit data to the backend API
    console.log("Blood type:", bloodType);
    console.log("Blood Action:", bloodAction);
    console.log("Quantity:", quantity);
    console.log("Room:", room);
    // reset form values
    setBloodType("");
    setBloodAction("");
    setQuantity(0);
    setRoom("");
  };
  const getHospitals = async () => {
    try {
      const response = await getAllHospitals();
      if (response) {
        setHospital(response);
        console.log(response);
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
        {/* <label>
          Blood Type:</label> */}
        <select value={bloodType} onChange={handleBloodTypeChange}>
          <option value="">Select Blood Type</option>
          {validBloodTypes.map((type3) => (
            <option key={type3} value={type3}>
              {type3}
            </option>
          ))}
        </select>
        <div className="radio-group">
          <div className="radio-input-container">
            <input
              id="donate"
              name="donate"
              className="radio-button"
              type="radio"
              value="donate"
              checked={bloodAction === "donate"}
              onChange={(e) => handleActionChange(e)}
              disabled={!bloodType}
            />
            <div className="radio-tile">
              <label for="donate" className="radio-tile-label">
                Donate Blood
              </label>
            </div>
          </div>
          <div className="radio-input-container">
            <input
              id="recieve"
              name="recieve"
              className="radio-button"
              type="radio"
              value="receive"
              checked={bloodAction === "receive"}
              onChange={(e) => handleActionChange(e)}
              disabled={!bloodType}
            />
            <div className="radio-tile">
              <label for="recieve" className="radio-tile-label">
                Receive Blood
              </label>
            </div>
          </div>
        </div>

        <label>
          Blood Types to {bloodAction === "receive" ? "Receive" : "Donate"}:
          <div className="form-input">
            <select value={bloodType}>
              {bloodAction === "" ? (
                <option disabled={true} value="">
                  Select Action
                </option>
              ) : bloodAction === "receive" ? (
                getBloodTypesToReceive(bloodType).map((type1) => (
                  <option key={type1} value={type1}>
                    {type1}
                  </option>
                ))
              ) : (
                getBloodTypesToDonate(bloodType).map((type2) => (
                  <option key={type2} value={type2}>
                    {type2}
                  </option>
                ))
              )}
            </select>
          </div>
        </label>
        <div className="form-input">
          <select value={hospital.hospitalName} onChange={handleHospitalChange}>
            <option value="">Select Hospital</option>
            {hospital.map((obj) => (
              <option key={obj} value={obj}>
                {obj.hospitalName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-input">
          <select value={room} onChange={handleRoomChange}>
            <option value="">Select Room</option>
            {roomOptions.map((room) => (
              <option key={room} value={room}>
                {room}
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
