import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

import img from "../assets/user_default.jpg"

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();

  const handleClick = () => {
    dispatch({type: "LOGOUT"})
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Manager</h1>
        </Link>
        <nav>
          {user ? (
            <div className="nav-info">
              <img src={img} alt="img" />
              <span className="username">{user.username}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
