import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Footer from "../components/Footer";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const { signup, error, isLoading, setError } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Passwords do not match!");
      return;
    }

    await signup(username, email, password1);
    // time to rebotto
  };

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password1}
          placeholder="Password"
          onChange={(e) => setPassword1(e.target.value)}
        />
        <input
          type="password"
          value={password2}
          placeholder="Repeat Password"
          onChange={(e) => setPassword2(e.target.value)}
        />

        <button disabled={isLoading}>Sign Up</button>

        {error && <div className="error">{error}</div>}
        {/*<!-- to add hiding and unhiding later -->*/}
      </form>
      <Footer></Footer>
    </>
  );
};

export default Signup;
