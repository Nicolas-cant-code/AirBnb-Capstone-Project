import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Layout/Input";
import BlueButton from "../../Layout/BlueButton";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    type: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const host = location.state?.host || false;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // If validation errors were returned
        if (data.errors) {
          const messages = data.errors.map((err) => err.msg).join("\n");
          alert("Signup failed:\n" + messages);
        } else {
          alert("Signup failed: " + (data.message || res.statusText));
        }
        return;
      }

      // Success
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      alert("Welcome to Airbnb, " + form.username + "!");
      navigate("/");
    } catch (err) {
      console.error("Network or server error:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="px-4">
      <div>
        <img
          src="//upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png"
          alt="Logo"
          className="w-auto h-6 md:h-10 my-4 rounded-0"
        />
      </div>
      <div style={{ scale: "0.8" }}>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center justify-center"
        >
          <h2 className="fs-1">Sign Up</h2>
          <div className="mt-2 text-indigo-500">
            <Input
              slot={"Username"}
              required
              id={"username"}
              onChange={(e) => handleChange(e)}
            />
            <Input
              slot={"Email"}
              required
              id={"email"}
              onChange={(e) => handleChange(e)}
            />
            <Input
              slot={"Password"}
              required
              type={"password"}
              id={"password"}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor="type" className="mb-2 fs-7 fw-semibold">
              Account Type
            </label>
            <select
              required
              name="type"
              onChange={(e) => handleChange(e)}
              className="text-black outline-red-600 bg-white border-2 border-gray-700 rounded-md px-3 py-2 fw-semibold w-full"
            >
              <option value="" selected disabled>
                Please Select
              </option>
              <option value="guest">Guest</option>
              <option value="host" selected={host ? true : false}>
                Host
              </option>
            </select>
            <div className="flex flex-col items-center mt-3 justify-center gap-2">
              <a className="no-underline cursor-pointer" href="/login">
                Have an account?
              </a>
            </div>
          </div>
          <BlueButton
            type="submit"
            slot={"Sign Up"}
            styles={"w-[25vw] max-w-[400px] min-w-[200px] mt-4"}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
