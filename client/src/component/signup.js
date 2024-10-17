import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Photo from "./icon.jpg";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.dob
    ) {
      return "All fields are required.";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setSuccessMessage(""); // Clear success message
      return;
    }

    // Prepare the data for the POST request
    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      dateOfBirth: formData.dob,
    };

    // Make the POST request
    fetch("http://localhost:8000/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessage("Sign up successful!");
          setErrorMessage(""); 
          setTimeout(() => {
            navigate("/signIn");
          }, 2000); 
        } else {
          setErrorMessage("Sign up failed: " + data.message);
          setSuccessMessage(""); 
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred: " + error.message);
        setSuccessMessage(""); 
      });
  };

  return (
    <div className="flex flex-row justify-center max-h-[60vh] items-center min-w-[440px]">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <div className="bg-[#08ecf4] rounded-md p-4 w-[200px] absolute top-[-3]">
            <h2 className="text-2xl flex justify-center items-center text-blue-500 h-full font-semibold">
              SIGN UP
            </h2>
          </div>
        </div>

        <div className="flex justify-center items-center mt-14 bg-[#46445c] rounded-md p-4">
          <img src={Photo} alt="icon" className="w-20 h-20 rounded-full" />
        </div>

        <div className="flex flex-col gap-4 p-4">
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              title="Date of Birth"
              required
            />
          </div>

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
          </div>

          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center items-center">
            <div className="bg-[#08ecf4] flex justify-center items-center rounded-md p-4 w-[200px]">
              <button
                type="submit"
                className="text-2xl text-blue-500 rounded-md h-full font-semibold"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <p className="text-blue-100">
              Already have an account?{" "}
              <Link to="/signIn" className="link-button text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
