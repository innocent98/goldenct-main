import { useState } from "react";
import "./forgotPassword.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginForgot } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {

  // const user = useSelector((state) => state.user.currentUser);
  // console.log(user)

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  // console.log(email)

  const handleForgot = async (e) => {
    e.preventDefault();
    loginForgot(dispatch, { email });
    // setEmail("")
  };
  return (
    <div className="forgotPassword">
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className="container">
        <h4>Forgot Your Passwod?</h4>

        <form className="row g-3" onSubmit={handleForgot}>
          <div className="col-md-4">
            <label htmlFor="email" className="form-label">
              Enter your email address to continue
            </label>
            <input
              type="email"
              className="form-control form-control-lg shadow-none"
              placeholder="Enter your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button className="submit-button" type="submit">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
