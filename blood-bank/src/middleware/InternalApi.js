import axios from "axios";

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
