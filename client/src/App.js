import React from 'react';
import Login from './component/signIn.js';
import SignUp from './component/signup.js';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Table from './component/table.js';
import Navbar from './component/navbar.js';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("accesstoken");

  // If no access token is found, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/signIn" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <div className='flex flex-col mt-10'>
              <Navbar/>
              <Table />

              </div>
              
            </ProtectedRoute>
          } />
          <Route path="/signIn" element={<Login />} /> {/* Default route to login */}
          <Route path="/signup" element={<SignUp />} /> {/* Route to signup */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
