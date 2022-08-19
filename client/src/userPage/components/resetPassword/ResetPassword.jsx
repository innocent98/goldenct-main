import { useState } from "react";
import { userRequest } from "../../../requestMethod";
// import { Toaster, toast } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./resetPassword.scss";

const ResetPassword = ({ setResetPassword }) => {
  const [success, setSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleCancel = () => {
    setResetPassword(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await userRequest.put("/user/reset-password", {
        currentPassword,
        password,
      });
      setSuccess(true);
      success && window.location.reload();
      return alert("Password updated successfully! please keep safe");
    } catch (error) {
      return toast.error(error.response.data);
    }
  };

  return (
    <div className="resetPassword">
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className="title">
        <h2>Create New Password</h2>
        <span className="material-icons" onClick={handleCancel}>
          highlight_off
        </span>
      </div>
      <form className="row g-3" onSubmit={handleReset}>
        <div className="col-md-3">
          <input
            type="password"
            className="form-control form-control-sm shadow-none"
            placeholder="Current Password"
            required
            name="currentPassword"
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="password"
            className="form-control form-control-sm shadow-none"
            placeholder="New Password"
            required
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* <div className="col-md-3">
          <input
            type="text"
            className="form-control form-control-sm shadow-none"
            placeholder="Confirm Password"
            required
          />
        </div> */}
        <div className="col-md-3">
          <button className="submit-button" type="submit">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
