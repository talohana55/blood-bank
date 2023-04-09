import { useEffect, useState } from "react";
import {
  getAllHospitals,
  createHospitalBlood,
} from "../middleware/InternalApi";
import "../Style/bloodAlternatives.css";
import { validBloodTypes, roomOptions } from "../middleware/functions";
import BloodAlternatives from "../Components/bloodAlternatives";

const RoutineDispense = () => {
  const [
    displayBloodAlternativesComponent,
    setDisplayBloodAlternativesComponent,
  ] = useState(false);
  // Form data
  const [formData, setFormData] = useState({
    bloodType: "",
    quantity: "",
    room: 0,
    selectedHospital: "",
  });

  // Usable parameters
  const [hospitals, setHospitals] = useState([]); // include hospitals list from API
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidBloodType = validBloodTypes.some(
      (bloodType) => bloodType.type === formData.bloodType
    );
    if (!isValidBloodType) {
      alert("Invalid blood type selected");
      return;
    }
    console.log(formData.bloodType);
    try {
      const response = await createHospitalBlood(formData);
      console.log(response);
    } catch (error) {
      alert(error);
    }
    // reset form values
    setFormData({
      bloodType: "",
      quantity: 0,
      room: "",
      selectedHospital: "",
    });
  };

  const getHospitals = async () => {
    try {
      const response = await getAllHospitals();
      if (response) {
        setHospitals(response);
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
      <div className="alternative-blood-component">
        <div className="alternative-blood-btn">
          <button
            className="form-input"
            onClick={() => {
              setDisplayBloodAlternativesComponent(
                !displayBloodAlternativesComponent
              );
            }}
          >
            O Negative
          </button>
        </div>
        {displayBloodAlternativesComponent && <BloodAlternatives />}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <select
          name="bloodType"
          value={formData.bloodType}
          onChange={handleChange}
        >
          <option value="">Select Blood Type</option>
          {validBloodTypes.map((blood) => (
            <option key={blood.id} value={blood.type}>
              {blood.type}
            </option>
          ))}
        </select>

        <div className="form-input">
          <select
            name="selectedHospital"
            value={formData.selectedHospital}
            onChange={handleChange}
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital.hospitalCode} value={hospital.hospitalCode}>
                {hospital.hospitalName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-input">
          <select name="room" value={formData.room} onChange={handleChange}>
            <option value="">Select Room</option>
            {roomOptions.map((roomObj) => (
              <option key={roomObj.id} value={roomObj.number}>
                Room {roomObj.number}
              </option>
            ))}
          </select>
        </div>

        <div className="form-input">
          <input
            type="number"
            min="1"
            name="quantity"
            value={formData.quantity !== "" ? parseInt(formData.quantity) : ""}
            onChange={handleChange}
          />
          <span>Quantity</span>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RoutineDispense;
