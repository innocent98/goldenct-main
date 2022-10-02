import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import storage from "../../../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// import {Toaster, toast} from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./userProfile.scss";
import { update } from "../../../redux/apiCalls";
import { userRequest } from "../../../requestMethod";

const UserProfile = ({
  setPackages,
  setDashboard,
  setAgent,
  setMine,
  setTask,
  setWithdraw,
  setFaqs,
  setSettings,
  setProfile,
}) => {
  setProfile(true);
  setDashboard(false);
  setPackages(false);
  setAgent(false);
  setMine(false);
  setTask(false);
  setWithdraw(false);
  setFaqs(false);
  setSettings(false);

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.user);

  const [picture, setPicture] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const [progress, setProgress] = useState(0);
  const [referred, setReferred] = useState([]);
  // const [setProcessing] = useState(false);
  const [copy, setCopy] = useState(false);

  const handleSettings = () => {
    setSettings(true);
    setProfile(false);
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/goldenct-user/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "picture" && setProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    picture && uploadFile(picture, "picture");
  }, [picture]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    update(dispatch, { ...inputs });
  };

  // get number of referred
  useEffect(() => {
    const fetchReffered = async () => {
      const res = await userRequest.get("/user/agents/referred");
      setReferred(res.data);
    };
    fetchReffered();
  }, []);

  return (
    <div className="userProfile">
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className="wrapper">
        <a href="/settings" className="link">
          <span className="material-icons back" onClick={handleSettings}>
            arrow_back
          </span>
        </a>
        <h2>Profile Information</h2>
        <div className="profilePic">
          <div className="img">
            {picture && (
              <img
                src={URL.createObjectURL(picture)}
                alt=""
                className="img-fluid"
              />
            )}
            <img
              src={user.picture ? user.picture : "assets/img/avatar2.png"}
              alt=""
              style={picture ? { display: "none" } : { display: "block" }}
            />
          </div>
        </div>

        <div className={isFetching ? "circular" : "none"}>
          <Box sx={{ display: "flex" }}>
            {progress < 100 ? <CircularProgress className="cc" /> : ""}
          </Box>
        </div>

        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <label htmlFor="profilePic">
              <span>Change Profile Picture</span>
            </label>
            <input
              type="file"
              id="profilePic"
              name="picture"
              style={{ display: "none" }}
              onChange={(e) => setPicture(e.target.files[0])}
            />
          </div>
          <div className="refer">
            {user.isAgent && (
              <>
                <span>Copy your agent link here</span>
                <div className="col-md-6">
                  <input
                    type="text"
                    value={`https://mygoldenpay.com/register/?agent=${user.username}`}
                    readOnly
                  />
                  <div
                    className="copytxt"
                    onClick={() =>
                      navigator.clipboard.writeText(`https://mygoldenpay.com/register/?agent=${user.username}`) &&
                      setCopy(true)
                    }
                  >
                    {copy ? "Copied" : "Copy"}
                  </div>
                </div>
                <span style={{ marginLeft: "0", color: "#FFC745" }}>
                  Total no of users you registered:
                  <span
                    style={{
                      textAlighn: "center",
                      marginLeft: "10px",
                      color: "#FFC745",
                    }}
                  >
                    {referred.length} | <a href="/my-referred-list" className="link"style={{color: "#FFC745"}}>View referred</a>
                  </span>
                </span>
              </>
            )}
          </div>
          <div className="col-md-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control form-control-sm shadow-none"
              id="fullName"
              name="fullName"
              defaultValue={user.fullName}
              readOnly={user.fullName ? true : false}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-sm shadow-none"
              id="email"
              name="email"
              value={user.email}
              readOnly
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control form-control-sm shadow-none"
              id="phoneNumber"
              name="phoneNumber"
              defaultValue={user.phoneNumber}
              readOnly={user.phoneNumber ? true : false}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="phoneNumber" className="form-label">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="form-select form-select-sm shadow-none"
              onChange={handleChange}
            >
              <option defaultValue={user.gender}>{user.gender}</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control form-control-sm shadow-none"
              id="country"
              name="country"
              defaultValue={user.country}
              readOnly={user.country ? true : false}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control form-control-sm shadow-none"
              id="state"
              name="state"
              defaultValue={user.state}
              readOnly={user.state ? true : false}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="lga" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control form-control-sm shadow-none"
              id="lga"
              name="lga"
              defaultValue={user.lga}
              readOnly={user.lga ? true : false}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="address" className="form-label">
              Home/Business Address
            </label>
            <input
              type="text"
              className="form-control form-control-sm shadow-none"
              id="address"
              name="address"
              defaultValue={user.address}
              readOnly={user.address ? true : false}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <button
              className="submit-button"
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? "Please wait" : "save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
