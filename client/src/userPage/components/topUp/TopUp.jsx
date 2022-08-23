import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./topUp.scss";

import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentSuccess from "../paymentSuccess/PaymentSuccess";
import { REACT_APP_PAY_STACK } from "./config";

const KEY = REACT_APP_PAY_STACK;

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

  // conversion
  const exactAmount = amount * 100;
  // charges on customers
  const charges = (exactAmount * 1.5) / 100 + 10000;

  const navigate = useNavigate();

  const componentProps = {
    email: user.email,
    amount: exactAmount + charges,
    metadata: {
      name: user.name,
      phone: user.phoneNumber,
    },
    publicKey: KEY,
    text: "Proceed",
    onSuccess: () => setSuccess(true),
    onClose: () => navigate("/dashboard"),
  };

  return (
    <div className="topUp">
      <h3>Fund Account</h3>
      <div className={success ? "account" : "none"}>
        <PaymentSuccess amount={amount} />
      </div>
      <div className={success ? "none" : "row"}>
        <div className="col-md-3">
          <label htmlFor="idFront" className="form-label">
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
            <PaystackButton className="paystack-button" {...componentProps} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopUp;
