import React from "react";
import { useState, useContext } from "react";
import { Context } from "../../App";
import { useNavigate } from "react-router-dom";
const SignInForm = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    store.login(formData.email, formData.password);
    navigate("/profile");
  };
  return (
    <form className="px-3 py-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control mt-1"
          id="email"
          placeholder="Enter email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          className="form-control mt-1"
          id="Password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary mt-4">
        Submit
      </button>
    </form>
  );
};

export default SignInForm;
