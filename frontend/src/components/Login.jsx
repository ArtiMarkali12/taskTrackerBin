import React, { useRef } from "react";
import axios from "axios";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("Login Data:", data);

    // Optional: Uncomment if backend ready
    /*
    try {
      const res = await axios.post("http://localhost:3000/login", data);
      console.log(res.data);
      if (res.data.access === "super_admin") {
        alert("Welcome Super Admin!");
      } else {
        alert(`Welcome ${res.data.role}!`);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed!");
    }
    */

    alert("Login successful (frontend only)");
    e.target.reset();
  };

  return (
    <div className="card p-4 shadow mx-auto" style={{ maxWidth: 420 }}>
      <h4 className="text-center mb-4">User Login</h4>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" ref={emailRef} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" ref={passwordRef} required />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
}
