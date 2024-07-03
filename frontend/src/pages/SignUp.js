import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signup from "../assets/signup.jpg";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/userSlice";
import ErrorModal from "../components/ErrorModal";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.user);

  console.log(error);

  const usernameInputRef = useRef("");
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  function handleClick(e) {
    e.preventDefault();
    const newFormData = {
      username: usernameInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    dispatch(signupUser(newFormData))
      .unwrap()
      .then((token) => {
        setLoading(true);
        setTimeout(() => {
          navigate("/home");
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        setIsErrorModalOpen(true);
        console.error(error);
      });

    setFormData(newFormData);
  }

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
    dispatch({ type: "user/resetError" });
  };

  return (
    <>
      {isErrorModalOpen && (
        <ErrorModal error={error} onClose={handleCloseErrorModal} />
      )}
      {loading && <p>Loading...</p>}
      <div
        className="flex justify-center items-center min-h-screen"
        style={{ backgroundImage: `url(${signup})` }}
      >
        <form
          onSubmit={handleClick}
          className="flex flex-col text-white gap-2 w-full sm:w-full md:w-2/3 lg:w-1/3 mx-5"
        >
          <h1 className="text-2xl md:text-3xl lg:text-5xl text-center">
            Create an Account
          </h1>
          <p className="text-center">
            Already registered?{" "}
            <Link to="/" className="text-blue-500">
              Login
            </Link>
          </p>
          <label className="font-semibold mt-5">Username</label>
          <input
            ref={usernameInputRef}
            type="text"
            className="p-2 focus: outline-none border-gray-400 border rounded text-black"
          />
          <label className="font-semibold">Email</label>
          <input
            ref={emailInputRef}
            type="text"
            className="p-2 focus: outline-none border-gray-400 border rounded text-black"
          />
          <label className="font-semibold">Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            className="p-2 focus: outline-none border-gray-400 border rounded text-black"
          />
          <button className="p-2 text-white bg-blue-500 rounded mt-5 font-medium">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
