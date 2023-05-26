import { useEffect, useState } from "react";
import {
  getAllHospitals,
  createHospitalBlood,
  getAllBloodUnits,
} from "../middleware/InternalApi";
import "../Style/bloodAlternatives.css";
import { validBloodTypes, roomOptions } from "../middleware/functions";
import BloodAlternatives from "../components/bloodAlternatives";

const RoutineDispense = () => {
  const [bloodInventory, setBloodInventory] = useState([]);
  const [hospitals, setHospitals] = useState([]); // include hospitals list from API
  const [
    displayBloodAlternativesComponent,
    setDisplayBloodAlternativesComponent,
  ] = useState(false);
  // Form data
  const [formData, setFormData] = useState({
    bloodType: "",
    quantity: 0,
    room: 0,
    selectedHospital: "",
  });
  const getHospitals = async () => {
    try {
      const response = await getAllHospitals();
      if (response) {
        setHospitals(response);
      }
    } catch (error) {
      alert(error);
    }
  };
  const getBloodInventory = async () => {
    try {
      const response = await getAllBloodUnits();
      if (response) {
        setBloodInventory(response);
      }
    } catch (err) {
      alert(`Error Get blood transactions : ${err}`);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userBloodType = bloodInventory.find(
      (bloodUnit) => bloodUnit.bloodType === formData.bloodType
    );

    if (!userBloodType) {
      alert("The selected blood type is not available.");
      return;
    }

    if (userBloodType.units < formData.quantity) {
      const availableBloodTypes = bloodInventory.filter(
        (obj) =>
          obj.units >= formData.quantity &&
          obj.bloodType !== userBloodType.bloodType
      );
      if (availableBloodTypes.length === 0) {
        alert("The requested blood type is not available.");
        return;
      }
      const suggestion =
        availableBloodTypes.length > 1
          ? availableBloodTypes.map((type) => type.bloodType).join(", ")
          : availableBloodTypes[0].bloodType;
      const confirm = window.confirm(
        `The requested quantity is not available for ${userBloodType.bloodType}. Would you like to request ${formData.quantity} units of ${suggestion} instead?`
      );
      if (confirm) {
        setFormData((prevState) => ({
          ...prevState,
          bloodType: availableBloodTypes[0].bloodType,
        }));
        return;
      } else {
        return;
      }
    }

    try {
      const response = await createHospitalBlood(formData);
      alert("The request has been successfully submitted.");
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

  useEffect(() => {
    getHospitals();
    getBloodInventory();
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
