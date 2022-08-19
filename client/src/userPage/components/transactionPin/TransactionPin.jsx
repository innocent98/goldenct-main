import { useState } from "react";
import { userRequest } from "../../../requestMethod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./transactionPin.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TransactionPin = ({ setResetTransactionPin }) => {
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const [progress, setProgress] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleTransactionPin = () => {
    setResetTransactionPin(false);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleResetPin = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      await userRequest.put("/user/update-pin", {
        ...inputs,
      });
      navigate("/");
      setProgress(false);
      return alert("Pin updated successfully! please keep safe");
    } catch (error) {
      setProgress(false);
      return toast.error(error.response.data);
    }
  };

  return (
    <div className="transactionPin">
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className="title">
        <h2>Change Transaction PIN</h2>
        <span className="material-icons" onClick={handleTransactionPin}>
          highlight_off
        </span>
      </div>
      <form className="row g-3" onSubmit={handleResetPin}>
        {user.isPinSet ? (
          <>
            <div className="col-md-3">
              <label htmlFor="currentTransactionPin" className="form-label">
                Enter Old PIN
              </label>
              <div className="input">
                <input
                  type="password"
                  className="form-control form-control-sm shadow-none"
                  name="currentTransactionPin"
                  maxLength={4}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="transactionPin" className="form-label">
                Enter New PIN
              </label>
              <div className="input">
                <input
                  type="password"
                  className="form-control form-control-sm shadow-none"
                  name="transactionPin"
                  maxLength={4}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-md-3">
              <label htmlFor="transactionPin" className="form-label">
                Enter New PIN
              </label>
              <div className="input">
                <input
                  type="password"
                  className="form-control form-control-sm shadow-none"
                  name="transactionPin"
                  maxLength={4}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}
        <div className="col-md-3">
          <button className="submit-button" type="submit" disabled={progress}>
            {progress ? "Please wait..." : "Change Pin"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionPin;
