import axios from "axios";

//------------------- Blood Transaction API methods----------------------------------------------------------------
// GET all blood units
export const getAllBloodTransaction = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/bloodTransaction/get"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// GET a single blood transaction by ID
export const getBloodTransactionById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/bloodTransaction/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// POST a new blood transaction
export const createBloodTransaction = async (newDonation) => {
  try {
    // Create a BloodTransaction object with the donor ID
    const bloodTransactionObj = {
      bloodType: newDonation.bloodType,
      date: newDonation.date,
      donorID: newDonation.donorID,
      quantity: newDonation.quantity,
    };
    // Save the BloodTransaction object in the backend API
    console.log(bloodTransactionObj);
    const response = await axios.post(
      "http://localhost:8080/api/bloodTransaction/create",
      bloodTransactionObj
    );

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// PUT (update) an existing blood transaction by ID
export const updateBloodTransactionById = async (
  id,
  updatedBloodTransaction
) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/bloodTransaction/${id}`,
      updatedBloodTransaction
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// DELETE a blood transaction by ID
export const deleteBloodTransactionById = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/bloodTransaction/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//-------------------Blood Unit API methods ----------------------------------------------------------------
export const getAllBloodUnits = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/bloodUnits/get"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getBloodUnitById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/bloodUnits/get/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createBloodUnit = async (bloodUnit) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/bloodUnits/create",
      bloodUnit
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
// PUT (update) an existing blood unit by ID
export const updateBloodUnitById = async (id, updatedBloodUnit) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/bloodUnits/${id}`,
      updatedBloodUnit
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// DELETE a blood unit by ID
export const deleteBloodUnitById = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/bloodUnits/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
//-------------------Donor API methods ----------------------------------------------------------------
// GET all blood units
export const getAllDonors = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/donors/get");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// GET a single blood transaction by ID
export const getDonor = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/donors/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// POST a new blood transaction
export const createDonor = async (donor) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/donors/create",
      donor
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// PUT (update) an existing blood transaction by ID
export const updateDonor = async (id, updatedDonor) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/donors/${id}`,
      updatedDonor
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// DELETE a blood transaction by ID
export const deleteDonor = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/donors/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
//-------------------Hospital API methods ----------------------------------------------------------------
// GET all hospitals
export const getAllHospitals = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/hospital/get");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// GET a single hospital by code
export const getHospitalByCode = async (hospitalCode) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/hospital/${hospitalCode}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// POST a new blood transaction
export const createHospital = async (hospital) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/hospital/create",
      hospital
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
