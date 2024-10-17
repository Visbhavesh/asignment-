import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Photo from "./icon.jpg";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Both fields are required.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setLoginStatus(validationError);
      return;
    }

   localStorage.setItem("email", formData.email);
    localStorage.setItem("password", formData.password);

    const payload = {
      email: formData.email,
      password: formData.password,
    };

     try {
      const response = await fetch("http://localhost:8000/signIn", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accesstoken", data.accessToken); // Save access token
        setLoginStatus("Login successful");
        navigate("/"); 
      } else {
        const errorData = await response.json();
        setLoginStatus("Login failed: " + errorData.message);
      }
    } catch (error) {
      setLoginStatus("An error occurred: " + error.message);
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-row justify-center max-h-[75vh] items-center min-w-[440px]">
      <form className="signup-form max-fit" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center mt-14 bg-[#46445c] rounded-md p-4">
          <img src={Photo} alt="icon" className="w-20 h-20 rounded-full" />
        </div>

        <div className="flex flex-col gap-4 p-3">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="flex flex-row justify-between text-[#08ecf4] font-light text-s mt-2">
              <button type="button" className="">
                Remember Me
              </button>
              <button type="button" className="">
                Forget Password
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <div className="bg-[#08ecf4] flex justify-center items-center rounded-md p-4 w-[200px]">
              <button
                type="submit"
                className="text-2xl text-blue-500 rounded-md h-full font-semibold px-8"
              >
                LOGIN
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <p className="text-blue-100">
              Don't have an account?{" "}
              <Link to="/signup" className="link-button text-blue-600">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Show login status */}
          <div className="flex justify-center items-center text-red-500 mt-2">
            {loginStatus}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
