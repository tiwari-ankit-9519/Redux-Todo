import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.jpg";
import { loginUser, resetError } from "../features/userSlice";
import LoadingComponent from "../components/LoadingComponent";
import ErrorModal from "../components/ErrorModal";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { error } = useSelector((state) => state.user);

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    const newFormData = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    dispatch(loginUser(newFormData))
      .unwrap()
      .then((token) => {
        setIsLoading(true);
        setTimeout(() => {
          navigate("/home");
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsErrorModalOpen(true);
        console.error(error);
      });

    setFormData(newFormData);
  }

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    dispatch(resetError());
  };

  return (
    <>
      {isErrorModalOpen && (
        <ErrorModal error={error} onClose={handleCloseErrorModal} />
      )}
      {isLoading && <LoadingComponent />}
      <div
        className="flex justify-center items-center min-h-screen"
        style={{
          backgroundImage: `url(${login})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <form
          onSubmit={handleClick}
          className="flex flex-col text-white gap-2 w-full sm:w-full md:w-2/3 lg:w-1/3 mx-5"
        >
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
            ref={emailInputRef}
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
          <button className="p-2 text-white bg-blue-500 rounded mt-5 font-medium">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
