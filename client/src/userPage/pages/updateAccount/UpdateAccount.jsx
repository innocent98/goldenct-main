import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { update } from "../../../redux/apiCalls";
import "./updateAccount.scss";

const UpdateAccount = ({ setBankD }) => {
  // const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const [inputs, setInputs] = useState({});

  const handleBD = () => {
    setBankD(false);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    update(dispatch, { ...inputs });
  };

  return (
    <div className="updateAccount">
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className="title">
        <h2>Update Account Details</h2>
        <span className="material-icons" onClick={handleBD}>
          highlight_off
        </span>
      </div>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label htmlFor="bank" className="form-label">
            Bank
          </label>
          <div className="input">
            <input
              type="text"
              className="form-control form-control-sm shadow-none"
              name="bank"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="accountName" className="form-label">
            Account Name
          </label>
          <div className="input">
            <input
              type="text"
              className="form-control form-control-sm shadow-none"
              name="accountName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-3">
          <label htmlFor="accountNumber" className="form-label">
            Account Number
          </label>
          <div className="input">
            <input
              type="number"
              className="form-control form-control-sm shadow-none"
              name="accountNumber"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-3">
          <button className="submit-button" type="submit" disabled={isFetching}>
            {isFetching ? "Please wait..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
