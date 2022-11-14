import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./topUp.scss";
// import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { REACT_APP_FLUTTERWAVE } from "./config";
import Logo from "./img/Logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SuccessValidateAgent from "./Success";

const KEY = REACT_APP_FLUTTERWAVE;

const AgentTopUp = ({ agentId }) => {
  const user = useSelector((state) => state.user.currentUser);

  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(1000);

  // const componentProps = {
  //   email: user.email,
  //   amount: exactAmount + charges,
  //   metadata: {
  //     name: user.name,
  //     phone: user.phoneNumber,
  //   },
  //   publicKey: KEY,
  //   text: "Proceed",
  //   onSuccess: () => setSuccess(true),
  //   onClose: () => navigate("/dashboard"),
  // };

  const config = {
    public_key: KEY,
    tx_ref: Date.now(),
    amount: amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user.email,
      phonenumber: user.phoneNumber,
      name: user.name,
    },
    customizations: {
      title: "Golden Comfort Tech",
      description: "Fund Wallet",
      logo: Logo,
    },
  };

  const fwConfig = {
    ...config,
    text: "Proceed",
    callback: (response) => {
      setSuccess(true);
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onSuccess: () => setSuccess(true),
    onClose: () => window.location.reload(),
  };

  return (
    <div className="topUp">
      <ToastContainer position="top-center" reverseOrder={false} />
      <h3>Agent Account</h3>
      {success && (
        <div className={success ? "account" : "none"}>
          <SuccessValidateAgent agentId={agentId} uuid={user.uuid} />
        </div>
      )}
      <div className={success ? "none" : "row"}>
        <div className="col-md-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="number"
            className="form-control"
            name="amount"
            required
            onChange={(e) => setAmount(amount)}
            value={amount}
            min={1000}
            max={1000000}
          />
        </div>
        <div className="col-md-3">
          {amount >= 100 && (
            <FlutterWaveButton className="paystack-button" {...fwConfig} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentTopUp;
