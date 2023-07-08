import { useState, useEffect } from "react";
import { getAllBloodTransaction } from "../middleware/InternalApi";

const BloodTypesDonors = () => {
  const validBloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];
  const [bloodType, setBloodType] = useState(validBloodTypes[0]);
  const [transactions, setTranscations] = useState([]);

  const getTransactions = async () => {
    try {
      let response = await getAllBloodTransaction();
      if (response) {
        response = response.filter(
          (transaction) => transaction["bloodType"] === bloodType
        );
      }
      setTranscations(response);
      console.log(response);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <h3>Blood Type Donors</h3>
      <div className="bloodTypesTable">
        <table></table>
      </div>
    </div>
  );
};

export default BloodTypesDonors;
