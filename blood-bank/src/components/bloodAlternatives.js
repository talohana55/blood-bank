import React, { useState, useEffect } from "react";
import { validBloodTypes } from "../middleware/functions";
import { getAllBloodUnits } from "../middleware/InternalApi";
import "../Style/bloodAlternatives.css";

const BloodAlternatives = () => {
  const [bloodData, setBloodData] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState({
    type: "",
    units: 0,
  });
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
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "amount") {
      setAmount(value);
      return;
    }

    setSelectedTypes((prevSelectedTypes) => {
      if (checked) {
        return [...prevSelectedTypes, value];
      } else {
        return prevSelectedTypes.filter((type) => type !== value);
      }
    });
  };

  const getAllBloodData = async () => {
    try {
      const response = await getAllBloodUnits();
      if (response) {
        setBloodData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const bloodTypeMatches = [];
    selectedTypes.forEach((selectedType) => {
      canReceiveFrom.forEach((canReceive) => {
        if (canReceive.type === selectedType) {
          bloodTypeMatches.push({
            type: canReceive.type,
            list: canReceive.list,
          });
        }
      });
    });

    //Extract all the arrays of  blood types from the  bloodTypeMatches
    const allBloodTypes = bloodTypeMatches
      .filter((obj) => Array.isArray(obj.list))
      .map((obj) => obj.list);

    //Find the intersection of all the arrays in allBloodTypes
    const intersectRes = allBloodTypes.reduce((prev, curr) =>
      prev.filter((elem) => curr.includes(elem))
    );

    if (intersectRes.includes("O-") && intersectRes.length === 1) {
      const oNegBloodUnits = bloodData.filter(
        (bloodUnit) => bloodUnit.bloodType === "O-"
      );
      const oNegUnitsSum = oNegBloodUnits.reduce(
        (total, bloodUnit) => total + bloodUnit.units,
        0
      );
      setResult({ type: "O-", units: oNegUnitsSum });
    } else if (intersectRes.includes("O-") && intersectRes.length > 1) {
      // Find the blood type in intersectRes with the highest units
      let maxUnits = -1;
      let maxBloodType = "";
      for (let i = 0; i < intersectRes.length; i++) {
        const bloodType = intersectRes[i];
        if (bloodType !== "O-") {
          // exclude O- from suggestions
          const bloodTypeUnits = bloodData
            .filter((bloodUnit) => bloodUnit.bloodType === bloodType)
            .reduce((total, bloodUnit) => total + bloodUnit.units, 0);
          if (bloodTypeUnits > maxUnits) {
            maxUnits = bloodTypeUnits;
            maxBloodType = bloodType;
          }
        }
      }
      // Offer the user the blood type with the highest units
      if (maxBloodType) {
        setResult({ type: maxBloodType, units: maxUnits });
        // only make an offer if a max blood type was found
      } else {
        alert("No available blood type found for offer");
      }
    }
  };
  useEffect(() => {
    getAllBloodData();
  }, []);
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
        <div className="radio-inputs-div">
          {validBloodTypes.map((type) => {
            return (
              <div key={type.id}>
                <label>
                  <input
                    type="checkbox"
                    name="bloodType"
                    value={type.type}
                    checked={selectedTypes.includes(type.type)}
                    onChange={handleChange}
                  />
                  <span>{type.type}</span>
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={amount}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      <div className="result">
        <h2>Result:</h2>
        <div className="result-item">
          <span>
            <strong>Suggestion Result:</strong> {result.type}
          </span>
        </div>
        <div className="result-item">
          <span>
            <strong>Available Units:</strong> {result.units}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BloodAlternatives;
