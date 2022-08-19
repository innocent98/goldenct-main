import UpdateAccount from "../updateAccount/UpdateAccount";
import "./userSettings.scss";

const UserSettings = ({ settings, setSettings, setProfile, setSecurity, bankD, setBankD }) => {

  const handleProfile = () => {
    setProfile(true);
    setSettings(false);
    setBankD(false);
  };

  const handleSecurity = () => {
    setSecurity(true);
    setSettings(false);
    setBankD(false);
  };

  const handleBD = () => {
    setBankD(true);
  };

  return (
    <div className={settings ? "userSettings" : "none"}>
      <h2>Settings</h2>
      <div className="container-fluid top">
        <div className="left">
          <h3>Profile Information</h3>
          <p>Provide personal details and how we can reach you</p>
        </div>
        <div className="right">
          <span className="material-icons" onClick={handleProfile}>
            arrow_forward_ios
          </span>
        </div>
      </div>
      <div className="container-fluid">
        <div className="left">
          <h3>Security</h3>
          <p>Change password and transaction PIN</p>
        </div>
        <div className="right">
          <span className="material-icons" onClick={handleSecurity}>
            arrow_forward_ios
          </span>
        </div>
      </div>
      <div className="container-fluid">
        <div className="left">
          <h3>Banks and Payment</h3>
          <p>Add and Delete Bank Accounts</p>
        </div>
        <div className="right">
            <span className="material-icons" onClick={handleBD}>arrow_forward_ios</span>
        </div>
      </div>

      <div className={bankD ? "container-fluid bankD" : "none"}>
        <UpdateAccount bankD={bankD} setBankD={setBankD} />
      </div>
    </div>
  );
};

export default UserSettings;
