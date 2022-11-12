import { useState } from "react";
import Error from "../../components/error/Error";
import { userRequest } from "../../requestMethod";
// import {Toaster, toast} from "react-hot-toast";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./register.scss";
import { Link, useLocation } from "react-router-dom";

const Register = ({ setLogin, setRegister }) => {
  const [username, setUsername] = useState("");
  const [valueUsername, setValueUsername] = useState(true);
  const [valuePassword, setValuePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [progress, setProgress] = useState(false);

  const handleLogin = (e) => {
    setLogin(true);
    setRegister(false);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    setValueUsername(false);
    setValuePassword(true);
  };

  const newUser = {
    email,
    username,
    password,
  };

  const location = useLocation()
  const path = location.search

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      await userRequest.post(`/auth/register/${path}`, newUser);
      setProgress(false);
      window.location.replace(`/confirm-email/${username}`);
    } catch (error) {
      setProgress(false);
      return toast.error(error.response.data);
    }
  };

  const handleBack = () => {
    setValuePassword(false);
    setValueUsername(true);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div className="register">
      <ToastContainer position="top-center" reverseOrder={false} />
      <form className="row g-3" onSubmit={handleSubmit}>
        <div
          className="container"
          style={valueUsername ? { display: "block" } : { display: "none" }}
        >
          <h4>Register</h4>
          <p>
            Already have a GoldTech account?{" "}
            <Link to="/login" className="link" onClick={handleLogin}>Login instead</Link>
          </p>
          <h6>Email Address</h6>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control form-control-md  shadow-none"
              required
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="col-md-4">
            <h6>Username</h6>
            <input
              type="username"
              className="form-control form-control-md  shadow-none"
              required
              value={username}
              onChange={handleChangeUsername}
            />
            <label htmlFor="privacy" className="form-label">
              By clicking continue to create an account, you agree to our{" "}
              <span>Terms of Conditions</span> and <span>Privacy Policy</span>
            </label>
          </div>
          <div className="col-md-4">
            <button
              className="submit-button"
              disabled={!email || !username}
              onClick={handleEmail}
            >
              CONTINUE
            </button>
          </div>
        </div>

        {/* choose password */}
        <div
          className="container choose"
          style={valuePassword ? { display: "block" } : { display: "none" }}
        >
          <h4>
            <span className="material-icons arrow_back" onClick={handleBack}>
              arrow_back
            </span>
            Choose a Password
          </h4>

          <p className="password">Password</p>
          {/* <form className="row g-3" onSubmit={handlePassword}> */}
          <div className="col-md-4">
            <input
              type={visibility ? "text" : "password"}
              className="form-control form-control-md shadow-none passIn"
              value={password}
              onChange={handleChangePassword}
              required
            />
            {visibility ? (
              <span
                className="material-icons visibility"
                onClick={handleVisibility}
              >
                visibility_off
              </span>
            ) : (
              <span
                className="material-icons visibility"
                onClick={handleVisibility}
              >
                visibility
              </span>
            )}
            {/* <label htmlFor="characters" className="form-label pass">
              At least 8 characters
            </label>
            <br />
            <label htmlFor="letter" className="form-label pass">
              At least 1 uppercase letter
            </label>
            <label htmlFor="special" className="form-label pass">
              At least one number or special character (!@#$%^&*)
            </label> */}
          </div>
          <div className="col-md-4">
            <button
              className="submit-button"
              disabled={!password || progress}
              type="submit"
            >
              CONTINUE
            </button>
          </div>
          {/* </form> */}
        </div>
      </form>

      <div className="container cancel" style={{ display: "none" }}>
        <Error />
      </div>
    </div>
  );
};

export default Register;
