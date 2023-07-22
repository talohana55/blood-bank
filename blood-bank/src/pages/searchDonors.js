import { useState } from "react";
import { getDonorsByBloodType } from "../middleware/InternalApi";

const SearchDonors = () => {
  const [bloodType, setBloodType] = useState({
    type: "",
    donors: [],
  });

  const validBloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];

  const getDonors = async (bloodType) => {
    const response = await getDonorsByBloodType(bloodType);
    return response;
  };

  const handleBloodTypeChange = async (event) => {
    const { value } = event.target;
    setBloodType(() => ({
      bloodType: value,
      donors: getDonors(value),
    }));
  };

  return (
    <div className="form-div">
      <h3>Find Donors By Blood Type</h3>
      <select
        name="bloodType"
        value={bloodType.bloodType}
        onChange={handleBloodTypeChange}
      >
        <option value="">Select a blood type</option>
        {validBloodTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <table>

      </table>
    </div>
  );
};

export default SearchDonors;
