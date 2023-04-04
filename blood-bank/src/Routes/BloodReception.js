import { useState } from "react";
import "../Style/BloodReception.css";
import { createBloodTransaction } from "../middleware/InternalApi";

const BloodReception = () => {
  const [bloodDonation, setBloodDonation] = useState({
    donorId: "",
    firstName: "",
    lastName: "",
    donationDate: "",
    bloodType: "",
    quantity: "",
  });

  const validBloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBloodDonation((prevDonation) => ({
      ...prevDonation,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { donorId, firstName, lastName, donationDate, bloodType, quantity } =
      bloodDonation;
    if (!/^\d{9}$/.test(donorId)) {
      alert("Donor ID must include exactly 9 digits");
      return;
    }
    if (!firstName) {
      alert("First Name is empty!");
      return;
    }
    if (!lastName) {
      alert("Last Name is empty!");
      return;
    }
    if (!validBloodTypes.includes(bloodType)) {
      alert("Invalid blood type");
      return;
    }
    if (quantity <= 0) {
      alert("Quantity must be a positive number");
      return;
    }
    const newDonation = {
      donorId: donorId,
      firstName: firstName,
      lastName: lastName,
      donationDate: donationDate,
      bloodType: bloodType,
      quantity: quantity,
    };
    try {
      const response = await createBloodTransaction(donorId, newDonation);
      console.log(response);
      alert("Blood transaction created successfully");
    } catch (error) {
      console.log(error);
      alert("Error creating blood transaction");
    }
  };

  return (
    <div className="form-div">
      <h3>Blood Reception</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            type="text"
            name="donorId"
            placeholder="Donor ID"
            value={bloodDonation.donorId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={bloodDonation.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-input">
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={bloodDonation.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-input">
          <input
            type="date"
            name="donationDate"
            placeholder="Date"
            value={bloodDonation.donationDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-input">
          <select
            name="bloodType"
            value={bloodDonation.bloodType}
            onChange={handleInputChange}
          >
            <option value="">Select a blood type</option>
            {validBloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-input">
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={bloodDonation.quantity}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Receive Blood</button>
      </form>
    </div>
  );
};

export default BloodReception;
