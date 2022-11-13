import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userRequest } from "../../../requestMethod";
import "./withdrawDims.scss";

const WithdrawDims = () => {
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await userRequest.post("/user/wallet/withdraw", {
        ...inputs,
      });
      setProcessing(false);
      navigate("/");
      return alert(res.data);
    } catch (error) {
      setProcessing(false);
      return toast.error(error.response.data);
    }
  };

  // get logged in user
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/user/user");
      setLoggedUser(res.data);
    };
    fetchUser();
  }, [setLoggedUser]);

  return (
    <div className="withdraw">
      <ToastContainer position="top-center" reverseOrder={false} />
      {user.accountNumber ? (
        <form className="row g-3" onSubmit={handleWithdraw}>
          <p>Total Balance</p>
          <h1>
            #
            {user.agent
              ? user.taskWallet || loggedUser.taskWallet + user.agent.reward
              : user.taskWallet || loggedUser.taskWallet}
          </h1>
          <div className="col">
            <span>Note: You will be charged 10% of this transaction</span>
            <div className="col-md-3">
              <label htmlFor="amount" className="form-label form-label-sm">
                Amount
              </label>
              <input
                type="number"
                className="form-control form-control-sm shadow-none"
                name="amount"
                required
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="bank" className="form-label form-label-sm">
                Bank
              </label>
              <input
                type="text"
                className="form-control form-control-sm shadow-none"
                name="bank"
                required
                value={user.bank}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label
                htmlFor="accountNumber"
                className="form-label form-label-sm"
              >
                Account number
              </label>
              <input
                type="number"
                className="form-control form-control-sm shadow-none"
                name="accountNumber"
                required
                value={user.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="accountName" className="form-label form-label-sm">
                Account name
              </label>
              <input
                type="text"
                className="form-control form-control-sm shadow-none"
                name="accountName"
                required
                value={user.accountName}
                onChange={handleChange}
              />
            </div>
            {user.isAgent && (
              <div className="col-md-3">
                <label htmlFor="account" className="form-label form-label-sm">
                  Select account to withdraw from
                </label>
                <select
                  name="account"
                  id="account"
                  className="form-select form-select-sm shadow-none"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Account</option>
                  <option value="wallet">Wallet</option>
                  <option value="agent">Agent</option>
                </select>
              </div>
            )}
            <div className="col-md-3">
              <label htmlFor="remark" className="form-label form-label-sm">
                Remarks (optional)
              </label>
              <input
                type="text"
                className="form-control form-control-sm shadow-none"
                name="remark"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label
                htmlFor="transactionPin"
                className="form-label form-label-sm"
              >
                Transaction pin
              </label>
              <input
                type="password"
                className="form-control form-control-sm shadow-none"
                name="transactionPin"
                required
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <button
                className="submit-button"
                type="submit"
                disabled={processing}
              >
                {processing ? "Please wait..." : "CONTINUE"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="accountUpdate">
          <p>Kindly update your bank account information to continue</p>
          {/* <button onClick={handleBD}>Ok</button> */}
        </div>
      )}
    </div>
  );
};

export default WithdrawDims;
