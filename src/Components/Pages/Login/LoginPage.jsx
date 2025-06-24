import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Layout/Input";
import BlueButton from "../../Layout/BlueButton";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://nicolas-airbnb-capstone-project.onrender.com/api/user/login?email=${encodeURIComponent(
          form.email
        )}&password=${encodeURIComponent(form.password)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // If validation errors were returned
        if (data.errors) {
          const messages = data.errors.map((err) => err.msg).join("\n");
          alert("Login failed:\n" + messages);
        } else {
          alert("Login failed: " + (data.message || res.statusText));
        }
        return;
      }

      // Success
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      alert("Welcome back, " + data.user.username + " to Airbnb!");
      navigate("/");
    } catch (err) {
      console.error("Network or server error:", err);
      alert("An error occurred. Please try again later.");
    }
  };
  return (
    <div className="px-5">
      <div>
        <img
          src="//upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/512px-Airbnb_Logo_B%C3%A9lo.svg.png"
          alt="Logo"
          className="w-auto h-10 my-8 rounded-0"
        />
      </div>
      <div style={{ scale: "0.90" }}>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex flex-col items-center justify-center h-[65vh] xl:h-[75vh]"
        >
          <h2 className="fs-1">Login</h2>
          <div className="mt-10 xl:mt-12 text-indigo-500">
            <Input
              slot={"Email"}
              required
              id={"email"}
              onChange={(e) => handleChange(e)}
            />
            <div className="mt-4">
              <Input
                slot={"Password"}
                type={"password"}
                required
                id={"password"}
                onChange={(e) => handleChange(e)}
              />
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
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
