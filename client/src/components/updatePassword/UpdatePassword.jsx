import { useState } from "react";
// import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { forgotRequest } from "../../requestMethod";
import "./updatePassword.scss";

const UpdatePassword = () => {
  //     const user = useSelector((state) => state.user.currentUser);
  // console.log(user)

  const [visibility, setVisibility] = useState(false);

  const [inputs, setInputs] = useState("");

  const location = useLocation();
  const path = location.pathname.split("/")[4];

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await forgotRequest.put(`/user/forgot-password/${path}`, { ...inputs });
      // console.log(res.data)
      window.location.reload();
      return alert("Password updated successfully! please keep safe");
    } catch (error) {
      return alert(error.response.data);
    }
  };

  return (
    <div className="updatePassword">
      <div className="container">
        <h4>New Passwod</h4>

        <form className="row g-3" onSubmit={handleUpdate}>
          <div className="col-md-4">
            <label htmlFor="password" className="form-label">
              Enter Your New Password
            </label>
            <input
              type={visibility ? "text" : "password"}
              className="form-control form-control-lg shadow-none"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
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
            <button className="submit-button">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
