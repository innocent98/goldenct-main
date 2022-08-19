import { useState } from "react";
import ResetPassword from "../../components/resetPassword/ResetPassword";
import TransactionPin from "../../components/transactionPin/TransactionPin";
import "./security.scss";

const Security = ({ security, setSecurity, setSettings }) => {
  const [resetPassword, setResetPassword] = useState(false)
  const [transactionPin, setTransactionPin] = useState(false)

  const handlePasswordReset = () => {
    setResetPassword(true)
  }

  const handleTransactionPin = () => {
    setTransactionPin(true)
  }

  const handleSettings = () => {
    setSecurity(false);
    setSettings(true);
  };
  return (
    <div className={security ? "security" : "none"}>
      <span className="material-icons back" onClick={handleSettings}>
        arrow_back
      </span>

      <div className="container-fluid top">
        <div className="left">
          <h3>Reset Password</h3>
          <p>Change your old password to a new one</p>
        </div>
        <div className="right">
          <span onClick={handlePasswordReset}>Reset Password</span>
        </div>
      </div>
      <div className="container-fluid">
        <div className="left">
          <h3>Change Transaction PIN</h3>
          <p>Change your old password to a new one</p>
        </div>
        <div className="right">
          <span onClick={handleTransactionPin}>Change Pin</span>
        </div>
      </div>

      <div className={resetPassword ? "passwordReset" : "none"}>
       <ResetPassword setResetPassword={setResetPassword} /> 
      </div>
      <div className={transactionPin? "transactionPinChange" : "none"}>
        <TransactionPin setResetTransactionPin={setTransactionPin} />
      </div>
    </div>
  );
};

export default Security;
