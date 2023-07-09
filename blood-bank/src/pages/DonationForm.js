import React, { useState } from "react";
import "../Style/bloodAlternatives.css";
import { createDonor } from "../middleware/InternalApi";

const DonationForm = () => {
  const [donorInfo, setDonorInfo] = useState({
    donorID: "",
    fullName: "",
    email: "",
    address: "",
    date: "",
    creditCard: {
      cardNumber: "",
      cardHolderName: "",
      expirationDate: "",
      cvv: "",
    },
    healthCondition: {
      hasReceivedGrowthHormoneTreatment: false,
      hasFamilyNeurologicalDisease: false,
      hasStayedInUK: false,
      hasReceivedPaymentForSex: false,
      hasPartnerWithHIV: false,
      isHemophiliaPatient: false,
      hasUsedIllegalDrugs: false,
      hasUsedInjectedOrSnortedDrugs: false,
      isCarrierOfHepatitis: false,
      hasStayedInHighPrevalenceAIDSCountry: false,
      hasEngagedInSexBetweenMen: false,
      hasEngagedInSexWithHighRiskPartners: false,
    },
  });
  const fakeDonorInfo = {
    donorID: "D123456789",
    fullName: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main Street, City",
    date: "2023-05-28",
    creditCard: {
      cardNumber: "************1234",
      cardHolderName: "John Doe",
      expirationDate: "12/25",
      cvv: "***",
    },
    healthCondition: {
      hasReceivedGrowthHormoneTreatment: false,
      hasFamilyNeurologicalDisease: true,
      hasStayedInUK: false,
      hasReceivedPaymentForSex: false,
      hasPartnerWithHIV: true,
      isHemophiliaPatient: false,
      hasUsedIllegalDrugs: true,
      hasUsedInjectedOrSnortedDrugs: true,
      isCarrierOfHepatitis: false,
      hasStayedInHighPrevalenceAIDSCountry: true,
      hasEngagedInSexBetweenMen: false,
      hasEngagedInSexWithHighRiskPartners: true,
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonorInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHealthConditionChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = value === "true"; // Parse the string value to a boolean
    setDonorInfo((prevState) => ({
      ...prevState,
      healthCondition: {
        ...prevState.healthCondition,
        [name]: parsedValue,
      },
    }));
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();

    // // Check if all the medical questionnaire fields are completed
    // const medicalQuestionnaireFields = Object.values(donorInfo.healthCondition);
    // const isMedicalQuestionnaireComplete = medicalQuestionnaireFields.every(
    //   (value) => value
    // );

    // if (!isMedicalQuestionnaireComplete) {
    //   // Display an error message or handle the incomplete medical questionnaire scenario
    //   alert("Please complete the medical questionnaire.");
    //   return;
    // }
    try {
      const response = await createDonor(fakeDonorInfo); // change this to donorInfo
      alert("Donation request completed successfully!");
      console.log(response);
    } catch (error) {
      alert(error);
    }

    // Submit the donorInfo object to the server or perform any necessary actions
    console.log(fakeDonorInfo);
  };

  return (
    <div className="form-div">
      <h3>Donation Form</h3>
      <form className="form" onSubmit={handleSubmit} method="post">
        <div className="form-input">
          <input
            type="text"
            id="donorID"
            name="donorID"
            placeholder="ID"
            value={donorInfo.donorID}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            value={donorInfo.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={donorInfo.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={donorInfo.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-input">
          <input
            type="date"
            id="date"
            name="date"
            placeholder="Birth Date"
            value={donorInfo.date}
            onChange={handleChange}
            required
          />
        </div>

        <h4>Credit Card Details</h4>
        <div className="form-input">
          <input
            type="number"
            id="cardNumber"
            name="creditCard.cardNumber"
            placeholder="Card Number"
            value={donorInfo.creditCard.cardNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <input
            type="text"
            id="cardHolderName"
            name="creditCard.cardHolderName"
            placeholder="Card Holder Name"
            value={donorInfo.creditCard.cardHolderName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <input
            type="date"
            id="expirationDate"
            name="creditCard.expirationDate"
            placeholder="Expiration Date"
            value={donorInfo.creditCard.expirationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-input">
          <input
            type="text"
            id="cvv"
            name="creditCard.cvv"
            placeholder="CVV"
            value={donorInfo.creditCard.cvv}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Medical Questionnaire:</h3>

        <div className="medical-questionnaire">
          <div className="form-input checkbox-question">
            <label htmlFor="hasReceivedGrowthHormoneTreatment">
              Have you received human growth hormone treatment or had a marrow
              or cornea transplant from a human source?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="receivedGrowthHormoneTreatmentYes"
                  name="healthCondition.hasReceivedGrowthHormoneTreatment"
                  value="true"
                  checked={
                    donorInfo.healthCondition
                      .hasReceivedGrowthHormoneTreatment === true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="receivedGrowthHormoneTreatmentNo"
                  name="healthCondition.hasReceivedGrowthHormoneTreatment"
                  value="false"
                  checked={
                    donorInfo.healthCondition
                      .hasReceivedGrowthHormoneTreatment === false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="hasFamilyNeurologicalDisease">
              Do you have a family history of neurological diseases?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="hasFamilyNeurologicalDiseaseYes"
                  name="healthCondition.hasFamilyNeurologicalDisease"
                  value="true"
                  checked={
                    donorInfo.healthCondition.hasFamilyNeurologicalDisease ===
                    true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="hasFamilyNeurologicalDiseaseNo"
                  name="healthCondition.hasFamilyNeurologicalDisease"
                  value="false"
                  checked={
                    donorInfo.healthCondition.hasFamilyNeurologicalDisease ===
                    false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="hasStayedInUK">
              Have you stayed in the United Kingdom (UK) for a cumulative period
              of 3 months or more between 1980 and 1996?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="hasStayedInUKYes"
                  name="healthCondition.hasStayedInUK"
                  value="true"
                  checked={donorInfo.healthCondition.hasStayedInUK === true}
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="hasStayedInUKNo"
                  name="healthCondition.hasStayedInUK"
                  value="false"
                  checked={donorInfo.healthCondition.hasStayedInUK === false}
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="hasReceivedPaymentForSex">
              Have you ever received payment for sex?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="receivedPaymentForSexYes"
                  name="healthCondition.hasReceivedPaymentForSex"
                  value="true"
                  checked={
                    donorInfo.healthCondition.hasReceivedPaymentForSex === true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="receivedPaymentForSexNo"
                  name="healthCondition.hasReceivedPaymentForSex"
                  value="false"
                  checked={
                    donorInfo.healthCondition.hasReceivedPaymentForSex === false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="hasPartnerWithHIV">
              Do you have a sexual partner who is HIV-positive?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="partnerWithHIVYes"
                  name="healthCondition.hasPartnerWithHIV"
                  value="true"
                  checked={donorInfo.healthCondition.hasPartnerWithHIV === true}
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="partnerWithHIVNo"
                  name="healthCondition.hasPartnerWithHIV"
                  value="false"
                  checked={
                    donorInfo.healthCondition.hasPartnerWithHIV === false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="isHemophiliaPatient">
              Are you a patient with hemophilia or a related clotting disorder?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="hemophiliaPatientYes"
                  name="healthCondition.isHemophiliaPatient"
                  value="true"
                  checked={
                    donorInfo.healthCondition.isHemophiliaPatient === true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="hemophiliaPatientNo"
                  name="healthCondition.isHemophiliaPatient"
                  value="false"
                  checked={
                    donorInfo.healthCondition.isHemophiliaPatient === false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="hasUsedIllegalDrugs">
              Have you ever used illegal drugs (non-prescription)?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="usedIllegalDrugsYes"
                  name="healthCondition.hasUsedIllegalDrugs"
                  value="true"
                  checked={
                    donorInfo.healthCondition.hasUsedIllegalDrugs === true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="usedIllegalDrugsNo"
                  name="healthCondition.hasUsedIllegalDrugs"
                  value="false"
                  checked={
                    donorInfo.healthCondition.hasUsedIllegalDrugs === false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="hasUsedInjectedOrSnortedDrugs">
              Have you ever injected or snorted drugs?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="usedInjectedOrSnortedDrugsYes"
                  name="healthCondition.hasUsedInjectedOrSnortedDrugs"
                  value="true"
                  checked={
                    donorInfo.healthCondition.hasUsedInjectedOrSnortedDrugs ===
                    true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="usedInjectedOrSnortedDrugsNo"
                  name="healthCondition.hasUsedInjectedOrSnortedDrugs"
                  value="false"
                  checked={
                    donorInfo.healthCondition.hasUsedInjectedOrSnortedDrugs ===
                    false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="isCarrierOfHepatitis">
              Are you a carrier of hepatitis B or C or have you ever tested
              positive for hepatitis B or C?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="carrierOfHepatitisYes"
                  name="healthCondition.isCarrierOfHepatitis"
                  value="true"
                  checked={
                    donorInfo.healthCondition.isCarrierOfHepatitis === true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="carrierOfHepatitisNo"
                  name="healthCondition.isCarrierOfHepatitis"
                  value="false"
                  checked={
                    donorInfo.healthCondition.isCarrierOfHepatitis === false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="hasStayedInHighPrevalenceAIDSCountry">
              Have you stayed in a country with a high prevalence of AIDS (such
              as sub-Saharan Africa) for a cumulative period of 3 months or more
              since 1980?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="stayedInHighPrevalenceAIDSCountryYes"
                  name="healthCondition.hasStayedInHighPrevalenceAIDSCountry"
                  value="true"
                  checked={
                    donorInfo.healthCondition
                      .hasStayedInHighPrevalenceAIDSCountry === true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="stayedInHighPrevalenceAIDSCountryNo"
                  name="healthCondition.hasStayedInHighPrevalenceAIDSCountry"
                  value="false"
                  checked={
                    donorInfo.healthCondition
                      .hasStayedInHighPrevalenceAIDSCountry === false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="hasEngagedInSexBetweenMen">
              Have you engaged in sex between men since 1977?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="engagedInSexBetweenMenYes"
                  name="healthCondition.hasEngagedInSexBetweenMen"
                  value="true"
                  checked={
                    donorInfo.healthCondition.hasEngagedInSexBetweenMen === true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="engagedInSexBetweenMenNo"
                  name="healthCondition.hasEngagedInSexBetweenMen"
                  value="false"
                  checked={
                    donorInfo.healthCondition.hasEngagedInSexBetweenMen ===
                    false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>

          <div className="form-input checkbox-question">
            <label htmlFor="hasEngagedInSexWithHighRiskPartners">
              Have you engaged in sex with a high-risk partner (e.g., someone
              who is HIV-positive or has engaged in high-risk behavior) since
              1977?
            </label>
            <div>
              <label>
                <input
                  type="radio"
                  id="engagedInSexWithHighRiskPartnersYes"
                  name="healthCondition.hasEngagedInSexWithHighRiskPartners"
                  value="true"
                  checked={
                    donorInfo.healthCondition
                      .hasEngagedInSexWithHighRiskPartners === true
                  }
                  onChange={handleHealthConditionChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  id="engagedInSexWithHighRiskPartnersNo"
                  name="healthCondition.hasEngagedInSexWithHighRiskPartners"
                  value="false"
                  checked={
                    donorInfo.healthCondition
                      .hasEngagedInSexWithHighRiskPartners === false
                  }
                  onChange={handleHealthConditionChange}
                />
                No
              </label>
            </div>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DonationForm;
