import React, { useRef } from "react";
import axios from "axios";

export default function RegisterUser() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();
  const accessRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: roleRef.current.value,
      access: accessRef.current.value,
    };

    console.log("Registration Data:", data);

    // Optional: Uncomment this part if your backend is ready
    /*
    try {
      const res = await axios.post("http://localhost:3000/register", data);
      console.log(res.data);
      alert("User registered successfully!");
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
    */

    alert("Registration successful (frontend only)");
    e.target.reset();
  };

  return (
    <div className="card p-4 shadow mx-auto" style={{ maxWidth: 480 }}>
      <h4 className="text-center mb-4">Register New User</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-control" ref={nameRef} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" ref={emailRef} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" ref={passwordRef} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Register as</label>
          <select className="form-select" ref={roleRef} required defaultValue="">
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Access Level (Super Admin)</label>
          <select className="form-select" ref={accessRef} required defaultValue="">
            <option value="">Select Access</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}
