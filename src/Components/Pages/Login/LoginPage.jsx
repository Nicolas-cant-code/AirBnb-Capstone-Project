import React from "react";
import Input from "../../Layout/Input";

const LoginPage = () => {
  return (
    <div className="px-5">
      <div>
        <img
          src="//upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png"
          alt="Logo"
          className="w-auto h-10 my-8 rounded-0"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-[75vh]">
        <h2 className="fs-1">Login</h2>
        <div className="mt-10 sm:mt-20 text-indigo-500">
          <Input slot={"Username"} />
          <div className="mt-5">
            <Input slot={"Password"} />
          </div>
          <p className="mt-4 text-center hover:underline cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <button className="hover:bg-indigo-600 py-3 w-[25vw] max-w-[400px] min-w-[200px] bg-indigo-500 mt-5 rounded-3 text-white">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
