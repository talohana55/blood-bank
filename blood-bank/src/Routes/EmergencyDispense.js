import React, { useState, useEffect } from "react";
import "../Style/BloodReception.css";
import {
  displayONegativeBloodUnit,
  getONegativeBloodUnit,
  sendUrgentEmail
} from "../middleware/InternalApi";
const EmergencyDispense = () => {
  const [emergencyBlood, setEmergencyBlood] = useState(null);
  const [loading, setLoading] = useState(true);

  const getEmergencyBlood = async () => {
    try {
      const response = await displayONegativeBloodUnit();
      setEmergencyBlood(response.quantity);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await getONegativeBloodUnit();
      alert(response.message);
    } catch (error) {
      alert(error);
    }
  };



  useEffect(() => {
    getEmergencyBlood();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-div">
      <button onClick={sendUrgentEmail}>send urgent donations email</button>
      <h2>Emergency Dispense</h2>
      <form className="form" onSubmit={handleSubmit}>
        <span>
          Available O- Blood Units :<strong> {emergencyBlood} Units </strong>
        </span>
        {emergencyBlood === 0 ? (
          <button disabled>No O- Blood Available</button>
        ) : (
          <button onClick={handleSubmit}>Withdraw</button>
        )}
      </form>
    </div>
  );
};
export default EmergencyDispense;
