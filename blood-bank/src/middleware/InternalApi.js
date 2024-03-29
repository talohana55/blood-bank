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
export const getBloodUnitByType = async (type) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/bloodUnits/get/${type}`
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
export const addBloodUnitByType = async (type, quantity) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/bloodUnits/add/${type}`,
      { type, quantity }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
// PUT (update) an existing blood unit by ID
export const subtractBloodUnitByType = async (type, newQuantity) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/bloodUnits/subtract/${type}`,
      newQuantity
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
export const getONegativeBloodUnit = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/bloodUnits/get/O_negative"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const displayONegativeBloodUnit = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/bloodUnits/O_negative"
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
    const response = await axios.get("http://localhost:8080/api/donor/donors");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// GET all donors by blood type
export const getDonorsByBloodType = async (bloodType) => {
  try {
    console.log("Blood Type is: " + bloodType);
    const response = await axios.get(
      `http://localhost:8080/api/bloodTransaction/${bloodType}`
    );
    return response.data;
    // const bloodTransactions = (await getAllBloodTransaction()).filter(
    //   (transaction) => transaction.bloodType === bloodType
    // );
    // bloodTransactions.forEach((transaction) => {
    //   if (!donorsId.includes(transaction.donorID)) {
    //     donorsId.push(transaction.donorID);
    //   }
    // });
    // donorsId = [124814521, 357789456, 123456789];
    // const donors = donorsId.map((id) => getDonor(id));
    // console.log(donors);
  } catch (error) {
    throw new Error(error.message);
  }
};

// GET a single blood transaction by ID
export const getDonor = async (id) => {
  try {
    console.log("Getting donor by ID: " + id);
    const response = await axios.get(
      `http://localhost:8080/api/donor/get/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// POST a new blood transaction
export const createDonor = async (donor) => {
  console.log(donor);
  try {
    const response = await axios.post(
      "http://localhost:8080/api/donor/create",
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
      `http://localhost:8080/api/donor/update/${id}`,
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
      `http://localhost:8080/api/donor/delete/${id}`
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
//-------------------Emergency Blood API methods ----------------------------------------------------------------

export const getAllHospitalBlood = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/hospitalBlood/get"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const createHospitalBlood = async (hospitalBlood) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/hospitalBlood/create",
      hospitalBlood
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//------------------- Logger methods ----------------------------------------------------------------

export const getLogs = async () => {
  try {
    const response = await axios.get("http://localhost:8080/logger");

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      user
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const register = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      user
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
