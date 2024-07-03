import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import { useDispatch } from "react-redux";
import LoadingComponent from "./LoadingComponent";
import { useState } from "react";

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  function handleLogout() {
    dispatch(logout());
    setLoading(true);
    setTimeout(() => {
      navigate("/");
      setLoading(false);
    }, 2000);
  }

  return (
    <>
      {loading && <LoadingComponent />}
      <div className="flex justify-between items-center h-12 px-5 bg-gradient-to-r from-start to-end text-white">
        <h1>Navbar</h1>
        <div className="flex gap-5">
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/">Signin</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
