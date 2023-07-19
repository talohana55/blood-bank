import React, { useState } from "react";
import { register } from "../middleware/InternalApi.js";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [registerData, setRegisterData] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(registerData);
      if (response.success) {
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(error.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-div">
      <h3>Register</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={registerData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
