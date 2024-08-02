import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import Footer from "../components/Footer";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(usernameOrEmail, password);
  };

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Username / Email:</label>
        <input
          type="text"
          value={usernameOrEmail}
          placeholder="Username / Email"
          onChange={(e) => {
            setUsernameOrEmail(e.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/*<!-- to add hiding and unhiding later -->*/}

        <button disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div>}
      </form>
      <Footer></Footer>
    </>
  );
};

export default Login;
