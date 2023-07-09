import React, { useState } from "react";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-div">
      <h3>Login</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={loginData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
