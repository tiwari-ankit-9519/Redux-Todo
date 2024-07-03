import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/userSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
  const isAuthenticated = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
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
  );
}
