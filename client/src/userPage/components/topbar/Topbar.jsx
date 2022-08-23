import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../redux/apiCalls";
import { userRequest } from "../../../requestMethod";
import "./topbar.scss";

const Topbar = ({
  settings,
  setSettings,
  profile,
  setProfile,
  security,
  setDashboard,
  setPackages,
  setAgent,
  setMine,
  setTask,
  setWithdraw,
  setFaqs,
  setViewJob,
  setRejectedJob,
  setSide,
  setIdentity,
  setTopUp,
}) => {
  const user = useSelector((state) => state.user.currentUser);

  const [dropdown, setdropdon] = useState(false);
  // const [profile, setProfile] = useState(false)
  // const [settings, setSettings] = useState(false)
  // const [postJob, setPostJob] = useState(false);
  // const [viewJob, setViewJob] = useState(false);

  const handleDropdown = () => {
    setdropdon(!dropdown);
  };

  const handleProfile = () => {
    setdropdon(!dropdown);
    setProfile(true);
    setSettings(false);
    setRejectedJob(false);
    setViewJob(false);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleSettings = () => {
    setdropdon(!dropdown);
    setSettings(true);
    setProfile(false);
    setRejectedJob(false);
    setViewJob(false);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleIdentity = () => {
    setIdentity(true);
    setdropdon(!dropdown);
    setSettings(false);
    setProfile(false);
    setRejectedJob(false);
    setViewJob(false);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setTopUp(false);
  };

  const handleViewJob = () => {
    setdropdon(!dropdown);
    setViewJob(true);
    setSettings(false);
    setRejectedJob(false);
    setProfile(false);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleRejectedJob = () => {
    setdropdon(!dropdown);
    setRejectedJob(true);
    setViewJob(false);
    setSettings(false);
    setProfile(false);
    setDashboard(false);
    setPackages(false);
    setAgent(false);
    setMine(false);
    setTask(false);
    setWithdraw(false);
    setFaqs(false);
    setIdentity(false);
    setTopUp(false);
  };

  const handleSide = () => {
    setSide(true);
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
    <div className={user ? "topbar" : "none"}>
      <div className="wrapper">
        <div className="left">
          <img src="assets/img/Logo.png" alt="" />
          <h4>GOLDENCT</h4>
          <div
            className={profile || security ? "none" : "hambuger"}
            onClick={handleSide}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>

        <div
          className="right"
          style={
            settings || profile || security
              ? { display: "none" }
              : { display: "flex" }
          }
        >
          <div className="col help">
            <a href="mailto:goldencomforttech@gmail.com" className="link">
              <span className="material-icons quiz">quiz</span>
              Need Help?
            </a>
            {/* <span className="material-icons">notifications</span> */}
          </div>
          <div className="col" onClick={handleDropdown}>
            <div className="img">
              <img
                className="img-fluid"
                src={user && user.picture ? user.picture : "assets/img/avatar.png"}
                alt=""
              />
            </div>
            {user && user.fullName}
            <span className="material-icons">
              {dropdown ? "keyboard_arrow_up" : "expand_more"}
            </span>
          </div>
        </div>
      </div>

      <div className={dropdown ? "dropdown" : "none"}>
        <ul>
          <a href="/profile" className="link">
            <li onClick={handleProfile}>Profile</li>
          </a>
          <a href="/settings" className="link">
            <li onClick={handleSettings}>Settings</li>
          </a>
          <a href="/verify" className="link">
            <li onClick={handleIdentity}>
              {loggedUser.isVerified ? "Verified" : "Verify account"}
            </li>
          </a>
          {/* <li onClick={handlePostJob}>Post Job</li> */}
          <a href="/posted-jobs" className="link">
            <li
              onClick={handleViewJob}
              className={user && user.successfulJob >= 1 ? "" : "none"}
            >
              View Posted Jobs
            </li>
          </a>
          <a href="/rejected-jobs" className="link">
            <li
              onClick={handleRejectedJob}
              className={user && user.rejectedJob >= 1 ? "" : "none"}
            >
              View Rejected Jobs
            </li>
          </a>
          <li>
            <a href="/history" className="link">
              Withdrawal history
            </a>
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
