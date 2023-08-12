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
    const donors = await getDonors(value);
    setBloodType(() => ({
      bloodType: value,
      donors: donors[0] || [],
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
        <option value="" disabled selected>
          Select a blood type
        </option>
        {validBloodTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {bloodType.donors.map((donor) => (
            <tr key={[donor]._id}>
              <td>{donor.donorID}</td>
              <td>{donor.fullName}</td>
              <td>
                <a
                  style={{
                    color: "#333",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "lightblue")}
                  onMouseLeave={(e) => (e.target.style.color = "#333")}
                  href={`mailto:${donor.email}`}
                >
                  {donor.email}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Send Email</button>
    </div>
  );
};

export default SearchDonors;
