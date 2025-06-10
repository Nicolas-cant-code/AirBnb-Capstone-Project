import React from "react";
import Input from "../../Layout/Input";
import BlueButton from "../../Layout/BlueButton";

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
      <div
        className="flex flex-col items-center justify-center h-[65vh] xl:h-[75vh]"
        style={{ scale: "0.90", marginTop: "-1.5rem" }}
      >
        <h2 className="fs-1">Login</h2>
        <div className="mt-10 xl:mt-15 text-indigo-500">
          <Input slot={"Username"} required />
          <div className="mt-4">
            <Input slot={"Password"} required />
          </div>
          <div className="flex flex-col items-center mt-3 justify-center gap-2">
            <a className="no-underline cursor-pointer" href="/signup">
              No account? Create it.
            </a>
            <p className="no-underline cursor-pointer">Forgot Password?</p>
          </div>
        </div>
        <BlueButton
          slot={"Login"}
          styles={"w-[25vw] max-w-[400px] min-w-[200px] mt-4"}
        />
      </div>
    </div>
  );
};

export default LoginPage;
