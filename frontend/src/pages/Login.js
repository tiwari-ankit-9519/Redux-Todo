import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";
import { loginUser } from "../features/userSlice";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user);

  const emialInputRef = useRef("");
  const passwordInputRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    const newFormData = {
      email: emialInputRef.current.value,
      password: passwordInputRef.current.value,
    };
    dispatch(loginUser(newFormData)).then((result) => {
      if (result.payload) {
        navigate("/home");
      }
    });

    setFormData(newFormData);
  }

  console.log(formData);

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url(${login})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col text-white gap-2 w-full sm:w-full md:w-2/3 lg:w-1/3 mx-5">
          <h1 className="text-2xl md:text-3xl lg:text-5xl text-white font-bold text-center">
            Welcome Back
          </h1>
          <p className="text-md text-center">
            Not registered yet?{" "}
            <Link to="/signup" className="text-blue-500">
              SingUp
            </Link>
          </p>
          <label className="font-semibold mt-5">Email</label>
          <input
            ref={emialInputRef}
            type="text"
            className="py-2 px-4 focus: outline-none border-gray-400 border rounded text-black"
            placeholder="Enter your email"
          />
          <label className="font-semibold">Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            className="py-2 px-4 focus: outline-none border-gray-400 border rounded text-black"
            placeholder="Enter your password"
          />
          <button
            className="p-2 text-white bg-blue-500 rounded mt-5 font-medium"
            onClick={handleClick}
          >
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}
