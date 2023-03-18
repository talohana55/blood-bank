import { useState } from "react";
import "../Style/BloodReception.css";

const BloodReception = () => {
  const [donorId, setDonorId] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const validBloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];

  const handleDonorIdChange = (event) => {
    setDonorId(event.target.value);
  };

  const handleBloodTypeChange = (event) => {
    setBloodType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // validate donor ID
    if (!/^\d{9}$/.test(donorId)) {
      alert("Donor ID must include exactly 9 digits");
      return;
    } // send request to server to receive blood dose
    // validate blood type
    if (!validBloodTypes.includes(bloodType)) {
      alert("Invalid blood type");
      return;
    } // send request to server to receive blood dose
    // validate quantity
    if (quantity <= 0) {
      alert("Quantity must be a positive number");
      return;
    } // send request to server to receive blood dose
  };

  return (
    <div className="reception">
        <h3>Blood Reception</h3>
      <form className="reception-form" onSubmit={handleSubmit}>
        <div className="reception-form-input">
          {/* <label htmlFor="donorId">Donor ID:</label> */}
          <input
            type="text"
            id="donorId"
            name="donorId"
            value={donorId}
            onChange={handleDonorIdChange}
          />
          <span>Donor ID</span>
        </div>
        <div className="reception-form-input">
          {/* <label htmlFor="bloodType">Blood Type:</label> */}
          <select
            id="bloodType"
            name="bloodType"
            value={bloodType}
            onChange={handleBloodTypeChange}
          >
            <option value="">Select a blood type</option>
            {validBloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          
        </div>
        <div className="reception-form-input">
          {/* <label htmlFor="quantity">Quantity:</label> */}
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <span>Quantity</span>
        </div>
        <button type="submit">Receive Blood</button>
      </form>
    </div>
  );
};

export default BloodReception;
