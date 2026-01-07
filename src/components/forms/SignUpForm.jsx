import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
const SignUpForm = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({
        ...formData,
        photo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      console.log(formData)
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    store.registration(formData.email, formData.password);
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

export default SignUpForm;
