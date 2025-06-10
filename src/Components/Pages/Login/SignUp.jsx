import React from "react";
import Input from "../../Layout/Input";
import BlueButton from "../../Layout/BlueButton";
import { useLocation } from "react-router-dom";

const SignUp = () => {
  const location = useLocation();
  const host = location.state?.host || false;
  console.log("Host:", host);
  return (
    <div className="px-4">
      <div>
        <img
          src="//upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png"
          alt="Logo"
          className="w-auto h-6 md:h-10 my-4 rounded-0"
        />
      </div>
      <div
        className="flex flex-col items-center justify-center"
        style={{ scale: "0.8", marginTop: "-5rem" }}
      >
        <h2 className="fs-1">Sign Up</h2>
        <div className="mt-2 text-indigo-500">
          <Input slot={"Username"} required />
          <Input slot={"Email"} required />
          <Input slot={"Password"} required />
          <label htmlFor="type" className="mb-2 fs-7 fw-semibold">
            Account Type
          </label>
          <select
            name="type"
            id="type"
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
          slot={"Sign Up"}
          styles={"w-[25vw] max-w-[400px] min-w-[200px] mt-4"}
        />
      </div>
    </div>
  );
};

export default SignUp;
