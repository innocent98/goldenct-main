import { useState } from "react";
import ResetPassword from "../../components/resetPassword/ResetPassword";
import TransactionPin from "../../components/transactionPin/TransactionPin";
import "./security.scss";

const Security = ({
  setPackages,
  setDashboard,
  setAgent,
  setMine,
  setTask,
  setWithdraw,
  setFaqs,
  setSettings,
  setProfile,
  setSecurity,
}) => {
  setSecurity(true);
  setProfile(false);
  setDashboard(false);
  setPackages(false);
  setAgent(false);
  setMine(false);
  setTask(false);
  setWithdraw(false);
  setFaqs(false);
  setSettings(false);

  const [resetPassword, setResetPassword] = useState(false);
  const [transactionPin, setTransactionPin] = useState(false);

  const handlePasswordReset = () => {
    setResetPassword(true);
  };

  const handleTransactionPin = () => {
    setTransactionPin(true);
  };

  const handleSettings = () => {
    setSecurity(false);
    setSettings(true);
  };
  return (
    <div className="security">
      <a href="/settings" className="link">
        <span className="material-icons back" onClick={handleSettings}>
          arrow_back
        </span>
      </a>

      <div className="securityCon top">
        <div className="leftC">
          <h3>Reset Password</h3>
          <p>Change your old password to a new one</p>
        </div>
        <div className="rightC">
          <span onClick={handlePasswordReset}>Reset Password</span>
        </div>
      </div>
      <div className="securityCon">
        <div className="leftC">
          <h3>Change Transaction PIN</h3>
          <p>Change your old password to a new one</p>
        </div>
        <div className="rightC">
          <span onClick={handleTransactionPin}>Change Pin</span>
        </div>
      </div>

      <div className={resetPassword ? "passwordReset" : "none"}>
        <ResetPassword setResetPassword={setResetPassword} />
      </div>
      <div className={transactionPin ? "transactionPinChange" : "none"}>
        <TransactionPin setResetTransactionPin={setTransactionPin} />
      </div>
    </div>
  );
};

export default Security;
