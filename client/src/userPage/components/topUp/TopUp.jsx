import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./topUp.scss";
// import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentSuccess from "../paymentSuccess/PaymentSuccess";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { REACT_APP_FLUTTERWAVE } from "./config";
import Logo from "./img/Logo.png"

const KEY = REACT_APP_FLUTTERWAVE;

const TopUp = ({
  setPackages,
  setDashboard,
  setAgent,
  setMine,
  setTask,
  setWithdraw,
  setFaqs,
  setSettings,
}) => {
  setDashboard(false);
  setPackages(false);
  setAgent(false);
  setMine(false);
  setTask(false);
  setWithdraw(false);
  setFaqs(false);
  setSettings(false);

  const user = useSelector((state) => state.user.currentUser);
  const [success, setSuccess] = useState(false);

  // const publicKey = KEY;
  const [amount, setAmount] = useState(0);

  // // conversion
  // const exactAmount = amount * 100;
  // // charges on customers
  // const charges = (exactAmount * 1.5) / 100 + 10000;

  const navigate = useNavigate();

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
    onClose: () => navigate("/micro-task"),
  };

  return (
    <div className="topUp">
      <h3>Fund Account</h3>
      <div className={success ? "account" : "none"}>
        <PaymentSuccess amount={amount} />
      </div>
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
            onChange={(e) => setAmount(e.target.value)}
            min={100}
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

export default TopUp;
