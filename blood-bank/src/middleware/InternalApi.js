import axios from "axios";
import BloodUnit from "../models/bloodUnit-model";
import Donor from "../models/donor-model";
import BloodTransaction from "../models/bloodTransaction-model";
const ObjectId = require("mongoose").Types.ObjectId;

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
export const createBloodTransaction = async (
  donorId,
  bloodTransactionResponse
) => {
  try {
    const donorResponse = await axios.get(
      `http://localhost:8080/api/donors/get/${donorId}`
    );
    const donorObj = new Donor({
      ID: donorResponse.ID,
      firstName: donorResponse.firstName,
      lastName: donorResponse.lastName,
    });
    const bloodTransactionObj = new BloodTransaction({
      bloodType: bloodTransactionResponse.BloodUnit,
      date: bloodTransactionResponse.date,
      donor: donorObj,
    });
    return bloodTransactionObj;

    // const response = await axios.post(
    //   "http://localhost:8080/api/bloodTransaction/create",
    //   bloodTransactionObj
    // );
    // return response.data;
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
