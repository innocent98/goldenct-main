import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../redux/apiCalls";
import { userRequest } from "../../../requestMethod";
import "./userSidebar.scss";

const UserSidebar = ({
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
    setIdentity(false);
    setTopUp(false);
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

  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
  };

  return (
    <div className={user ? "userSidebar" : "none"}>
      <ul>
        <a href="/dashboard" className="link">
          <li
            className={"inactive " + (dashboard && "active")}
            onClick={handleDashboard}
          >
            <span className="material-icons">home</span>Dashboard
          </li>
        </a>
        {user && !user.isValidated && !loggedUser.isValidated && <a href="/packages" className="link">
          <li
            className={"inactive " + (packages && "active")}
            onClick={handlePackages}
          >
            <span className="material-icons">backpack</span>
            {user && user.isValidated ? "Upgrade Package" : "Validate"}
          </li>
        </a>}
        <a href="/become-agent" className="link">
          <li
            className={"inactive " + (agent && "active")}
            onClick={handleAgent}
          >
            <span className="material-icons">real_estate_agent</span>Become an
            Agent
          </li>
        </a>
        <a href="/mine" className="link">
          <li className={"inactive " + (mine && "active")} onClick={handleMine}>
            <span className="material-icons">hourglass_full</span>Mine
          </li>
        </a>
        <a href="/micro-task" className="link">
          <li className={"inactive " + (task && "active")} onClick={handleTask}>
            <span className="material-icons">task</span>Daily Income MicroTask
          </li>
        </a>
        <a href="/withdraw" className="link">
          <li
            className={"inactive " + (withdraw && "active")}
            onClick={handleWithdraw}
          >
            <span className="material-icons">wallet</span>Withdraw
          </li>
        </a>
        <a href="/faq" className="link">
          <li className={"inactive " + (faqs && "active")} onClick={handleFaqs}>
            <span className="material-icons">question_answer</span>FAQs
          </li>
        </a>
        <a href="/settings" className="link">
          <li
            className={"inactive " + (settings && "active")}
            onClick={handleSettings}
          >
            <span className="material-icons">settings</span>Settings
          </li>
        </a>
      </ul>

      <ul className="logout">
        <li onClick={handleLogout}>
          <span className="material-icons">logout</span>Log out
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
