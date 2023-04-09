import React, { useState } from "react";
import { validBloodTypes } from "../middleware/functions";
import Form from "react-bootstrap/Form";
import "../Style/bloodAlternatives.css";

const BloodDonationForm = () => {
  const [donations, setDonations] = useState([]);
  const canReceiveFrom = [
    { type: "A+", list: ["A+", "A-", "O+", "O-"] },
    { type: "O+", list: ["O+", "O-"] },
    { type: "B+", list: ["B+", "B-", "O+", "O-"] },
    { type: "AB+", list: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    { type: "A-", list: ["A-", "O-"] },
    { type: "O-", list: ["A+", "A-", "O+", "O-"] },
    { type: "B-", list: ["B-", "O-"] },
    { type: "AB-", list: ["AB-", "A-", "B-", "O-"] },
  ];
  const handleDonationChange = (e) => {
    const donationType = e.target.name;
    const donationAmount = e.target.value;

    if (donationAmount > 0) {
      // Find the existing donation in the state, or create a new one if it doesn't exist
      const existingDonation = donations.find((d) => d.type === donationType);
      const updatedDonation = existingDonation
        ? { ...existingDonation, amount: donationAmount }
        : { type: donationType, amount: donationAmount };

      // Update the donations state with the updated or new donation
      const updatedDonations = existingDonation
        ? donations.map((d) => (d.type === donationType ? updatedDonation : d))
        : [...donations, updatedDonation];

      setDonations(updatedDonations);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out any donations where the amount is less than or equal to 0
    const filteredDonations = donations.filter(
      (donation) => donation.amount > 0
    );

    // Get an array of the valid blood types that have a donation amount greater than 0
    const validBloodTypes = filteredDonations.map((donation) => donation.type);

    // Find the intersection of the valid blood types with the canReceiveFrom object
  };

  return (
    <div className="alternative-blood-form">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Select Blood Types</h2>
        <p>
          Due to the fact it is critical to deliver type
          <strong> O negative </strong>
          blood in the case of a multi-casualty catastrophe, we will endeavour
          to locate a substitute for the desired blood type. Please provide the
          possible applicants' blood types.
        </p>
        {validBloodTypes.map((type) => {
          if (type.id === 6) {
            // Skip the O- blood type
            return null;
          }
          return (
            <div key={type.id}>
              <label>
                <input
                  type="checkbox"
                  name={type.type}
                  value={type.type}
                  onChange={handleDonationChange}
                />
                <span>{type.type}</span>
              </label>
              <input
                type="number"
                name={`${type.type}`}
                placeholder="Amount"
                onChange={handleDonationChange}
              />
            </div>
          );
        })}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BloodDonationForm;
