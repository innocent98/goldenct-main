import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
// import {Toaster} from "react-hot-toast";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import "./login.scss";

const Login = () => {
  const [visibility, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className="login">
      {/* <ToastContainer position="top-center" reverseOrder={false} /> */}
      <div className="container log" style={{ display: "block" }}>
        <h4>Sign in</h4>

        <form className="row g-3">
          <div className="col-md-4">
            <label htmlFor="email" className="label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-lg shadow-none"
              placeholder="Enter your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type={visibility ? "text" : "password"}
              className="form-control form-control-lg shadow-none"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
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
          </div>
          <div className="col-md-4">
            <button
              className="submit-button"
              onClick={handleLogin}
              disabled={isFetching}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      {/* forgot password */}
      <div className="container forgot" style={{ display: "none" }}>
        <h4>Reset Password</h4>

        <form className="row g-3">
          <div className="col-md-4">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-lg shadow-none"
              placeholder="Enter your Email Address"
            />
          </div>
          <div className="col-md-4">
            <button className="submit-button">CONTINUE</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
