import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import Login from "./components/Login";

export default function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/">
            Super Admin Portal
          </Link>
          <div>
            <Link to="/register" className="btn btn-outline-light me-2">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline-light">
              Login
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={
              <h4 className="text-center mt-5">
                Welcome to Super Admin Access Portal
              </h4>
            }
          />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
