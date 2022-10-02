import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  Wc,
} from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethod";
import dateformat from "dateformat";
import "./user.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/apiCalls";
import jwt_decode from "jwt-decode";

export default function User() {
  const [user, setUser] = useState({});
  const [agent, setAgent] = useState("");
  const [validUser, setValidUser] = useState("");
  const [progress, setProgress] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(`/user/user/${path}`);
      setUser(res.data);
    };
    fetchUser();
  }, [path]);

  // get agent details
  useEffect(() => {
    const fetchAgent = async () => {
      const res = await userRequest.get(`/user/agents-agent/${path}`);
      setAgent(res.data);
    };
    fetchAgent();
  }, [path]);

  // get validUser details
  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(`/user/users-subscription/${path}`);
      setValidUser(res.data);
    };
    fetchUser();
  }, [path]);

  // approve user
  const handleApproveUser = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      await userRequest.put(`/admin/validate/user/${path}/refer`, {
        isValid: true,
      });
      setProgress(false);
      window.location.reload();
      return alert("You successfully validate this user");
    } catch (error) {
      setProgress(false);
      return alert(error.response.data);
    }
  };

  // decline user
  const handleDeclineUser = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      await userRequest.put(`/admin/decline/user/${path}`, {
        isDeclined: true,
      });
      setProgress(false);
      window.location.reload();
      return alert("You successfully validate this user");
    } catch (error) {
      setProgress(false);
      return alert(error.response.data);
    }
  };

  // approve agent
  const handleApproveAgent = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      await userRequest.put(`/admin/validate-agent/${path}`, { isValid: true });
      setProgress(false);
      window.location.reload();
    } catch (error) {
      setProgress(false);
      return alert(error.response.data);
    }
  };

  // decline agent
  const handleDeclineAgent = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      await userRequest.put(`/admin/decline-agent/${path}`, {
        isDeclined: true,
      });
      setProgress(false);
      window.location.reload();
    } catch (error) {
      setProgress(false);
      return alert(error.response.data);
    }
  };

  // disable user's account
  const handleDisable = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.put(`/admin/disable-account/${path}`);
      return alert(res.data);
    } catch (error) {
      return alert(error.response.data);
    }
  };

  // enable user's account
  const handleEnable = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.put(`/admin/enable-account/${path}`);
      return alert(res.data);
    } catch (error) {
      return alert(error.response.data);
    }
  };

  // update a user info
  const [inputs, setInputs] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await userRequest.put(`/admin/edit/user/${path}`, {
        ...inputs,
      });
      setProcessing(false);
      window.location.reload();
      return alert("Data updated successfully.");
    } catch (error) {
      setProcessing(false);
      return alert(error.response.data);
    }
  };

  // automatically logout a user when session expires
  const userA = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
  };

  useEffect(() => {
    const token = userA.accessToken;
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
        return alert("Session expired! kindly login again to continue");
      }
    }
  });

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.picture ? user.picture : "/img/avatar.png"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fullName}</span>
              <span className="userShowUserTitle">{user.package}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {dateformat(user.createdAt, "mmmm dd yyyy")}
              </span>
            </div>
            <div className="userShowInfo">
              <Wc className="userShowIcon" />
              <span className="userShowInfoTitle">{user.gender}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phoneNumber}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                {user.address} | {user.state} | {user.country}
              </span>
            </div>
            <div className="userShowInfo">
              <button
                className="userUpdateButton"
                onClick={user.isLoggedout ? handleEnable : handleDisable}
              >
                {user.isLoggedout ? "Enable account" : "Disable account"}
              </button>
            </div>

            <div
              className={
                !validUser || validUser.isValid || validUser.isDeclined
                  ? "none"
                  : "userShowInfo"
              }
            >
              <span className="userShowIcon">
                Pending validation: {validUser.userPackage}
              </span>
              <span className="userShowInfoTitle">
                <button
                  className="btn btn-success"
                  disabled={progress}
                  onClick={handleApproveUser}
                >
                  {progress ? "Please wait..." : "Accept"}
                </button>{" "}
                <button
                  className="btn btn-danger"
                  disabled={progress}
                  onClick={handleDeclineUser}
                >
                  {progress ? "Please wait..." : "Decline"}
                </button>
              </span>
            </div>
            <div
              className={
                !agent || agent.isValid || agent.isDeclined
                  ? "none"
                  : "userShowInfo"
              }
            >
              <span className="userShowIcon">
                Pending Agent validation: {agent.agentPackage}
              </span>
              <span className="userShowInfoTitle">
                <button
                  className="btn btn-success"
                  disabled={progress}
                  onClick={handleApproveAgent}
                >
                  {progress ? "Please wait..." : "Accept"}
                </button>{" "}
                <button
                  className="btn btn-danger"
                  disabled={progress}
                  onClick={handleDeclineAgent}
                >
                  {progress ? "Please wait..." : "Decline"}
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder={user.fullName}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder={user.phoneNumber}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder={user.address}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>User Wallet</label>
                <input
                  type="text"
                  name="taskWallet"
                  placeholder={user.taskWallet}
                  className="userUpdateInput"
                  onChange={handleChange}
                  maxLength={4}
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.picture ? user.picture : "/img/avatar.png"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <div className="userUpdateItem">
                <label>Bank</label>
                <input
                  type="text"
                  name="bank"
                  className="userUpdateInput"
                  placeholder={user.bank}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  className="userUpdateInput"
                  placeholder={user.accountName}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Account Number</label>
                <input
                  type="num"
                  name="accountNumber"
                  className="userUpdateInput"
                  placeholder={user.accountNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Transaction Pin</label>
                <input
                  type="password"
                  name="transactionPin"
                  className="userUpdateInput"
                  onChange={handleChange}
                  maxLength={4}
                />
              </div>
              <div className="userUpdateItem">
                <label>User Package</label>
                <select name="package" id="" onChange={handleChange}>
                  <option defaultValue={user.package}>{user.package}</option>
                  <option value="basic">Basic</option>
                  <option value="regular">Regular</option>
                  <option value="standard">Standard</option>
                  <option value="professional">Professional</option>
                  <option value="silver">Silver</option>
                  <option value="gold">Gold</option>
                </select>
              </div>
              <br />
              <button
                className="userUpdateButton"
                type="submit"
                disabled={processing}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
