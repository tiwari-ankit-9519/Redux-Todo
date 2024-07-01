import React from "react";
import { Link } from "react-router-dom";
import login from "../assets/login.jpg";

export default function Login() {
  return (
    <div
      className="flex mx-0 md:mx-0 bg-slate-300 gap-5 min-h-screen justify-center"
      style={{
        backgroundImage: `url(${login})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col gap-2 bg-white p-10 w-full md:1/4 lg:w-1/3 rounded-xl mx-5 md:mx-0 bg-transparent text-white justify-center">
        <h1 className="text-2xl md:text-3xl lg:text-5xl text-white font-bold text-center">
          Welcome Back
        </h1>
        <p className="text-md">
          Not registered yet?{" "}
          <Link to="/singup" className="text-blue-500">
            SingUp
          </Link>
        </p>
        <label className="font-semibold mt-5">Email</label>
        <input
          type="text"
          className="p-2 focus: outline-none border-gray-400 border rounded"
        />
        <label className="font-semibold">Password</label>
        <input
          type="password"
          className="p-2 focus: outline-none border-gray-400 border rounded"
        />
        <button className="p-2 text-white bg-blue-500 rounded mt-5 font-medium">
          Sign In
        </button>
      </div>
    </div>
  );
}
