import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../redux/apiCalls";
import "./userSideMenu.scss";

const UserSideMenu = ({
  dashboard,
  setDashboard,
  packages,
  setPackages,
  agent,
  setAgent,
  mine,
  setMine,
  task,
  setTask,
  withdraw,
  setWithdraw,
  faqs,
  setFaqs,
  settings,
  setSettings,
  setProfile,
  setSecurity,
  setViewJob,
  setRejectedJob,
  setClick,
  side,
  setSide,
  setIdentity,
  setTopUp,
}) => {
  const user = useSelector((state) => state.user.currentUser);

  const handleDashboard = () => {
    setDashboard(true);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setSettings(false);
    setProfile(false);
    setSecurity(false);
    setViewJob(false);
    setRejectedJob(false);
    setClick(false);
    setSide(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handlePackages = () => {
    setPackages(true);
    setDashboard(false);
    setAgent(false);
    setMine(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setSettings(false);
    setProfile(false);
    setSecurity(false);
    setViewJob(false);
    setRejectedJob(false);
    setClick(false);
    setSide(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleAgent = () => {
    setAgent(true);
    setDashboard(false);
    setPackages(false);
    setMine(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setSettings(false);
    setProfile(false);
    setSecurity(false);
    setViewJob(false);
    setRejectedJob(false);
    setClick(false);
    setSide(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleMine = () => {
    setMine(true);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setSettings(false);
    setProfile(false);
    setSecurity(false);
    setViewJob(false);
    setRejectedJob(false);
    setClick(false);
    setSide(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleTask = () => {
    setTask(true);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setWithdraw(false);
    setFaqs(false);
    setSettings(false);
    setProfile(false);
    setSecurity(false);
    setViewJob(false);
    setRejectedJob(false);
    setClick(false);
    setSide(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleWithdraw = () => {
    setWithdraw(true);
    setTask(false);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setFaqs(false);
    setSettings(false);
    setProfile(false);
    setSecurity(false);
    setViewJob(false);
    setRejectedJob(false);
    setClick(false);
    setSide(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleFaqs = () => {
    setFaqs(true);
    setWithdraw(false);
    setTask(false);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setSettings(false);
    setProfile(false);
    setSecurity(false);
    setViewJob(false);
    setRejectedJob(false);
    setClick(false);
    setSide(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleSettings = () => {
    setSettings(true);
    setFaqs(false);
    setWithdraw(false);
    setTask(false);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setProfile(false);
    setSecurity(false);
    setViewJob(false);
    setRejectedJob(false);
    setClick(false);
    setSide(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleSide = () => {
    setSide(false);
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
  };

  return (
    <div className={"userSideMenu " + (side && "active")}>
      <div className="hambuger" onClick={handleSide}>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <ul>
        <li>
          <img src="assets/img/Logo.png" className="img-fluid" alt="" />
          <h4>GOLDENCT</h4>
        </li>
        <hr />
        <li
          className={"inactive " + (dashboard && "active")}
          onClick={handleDashboard}
        >
          <span className="material-icons">home</span>Dashboard
        </li>
        <li
          className={"inactive " + (packages && "active")}
          onClick={handlePackages}
        >
          <span className="material-icons">backpack</span>
          {user.isValidated ? "Upgrade Package" : "Packages"}
        </li>
        <li className={"inactive " + (agent && "active")} onClick={handleAgent}>
          <span className="material-icons">real_estate_agent</span>Become an
          Agent
        </li>
        <li className={"inactive " + (mine && "active")} onClick={handleMine}>
          <span className="material-icons">hourglass_full</span>Mine
        </li>
        <li className={"inactive " + (task && "active")} onClick={handleTask}>
          <span className="material-icons">task</span>Daily Income MicroTask
        </li>
        <li
          className={"inactive " + (withdraw && "active")}
          onClick={handleWithdraw}
        >
          <span className="material-icons">wallet</span>Withdraw
        </li>
        <li className={"inactive " + (faqs && "active")} onClick={handleFaqs}>
          <span className="material-icons">question_answer</span>FAQs
        </li>
        <li
          className={"inactive " + (settings && "active")}
          onClick={handleSettings}
        >
          <span className="material-icons">settings</span>Settings
        </li>
      </ul>

      <ul className="logout">
        <li onClick={handleLogout}>
          <span className="material-icons">logout</span>Log out
        </li>
      </ul>
    </div>
  );
};

export default UserSideMenu;
