import React, { useState } from "react";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform registration logic here
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
    </div>
  );
};

export default RegisterPage;
