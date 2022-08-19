import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useEffect, useState } from "react";
import storage from "../../../firebase";
import { userRequest } from "../../../requestMethod";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./verifyAccount.scss";
import { useSelector } from "react-redux";

const VerifyAccount = ({ identity }) => {
  const user = useSelector((state) => state.user.currentUser);

  const [front, setFront] = useState(undefined);
  const [back, setBack] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const [progress, setProgress] = useState(0);
  const [processing, setProcessing] = useState(false);

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/goldenct-identity/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "front"
          ? setProgress(Math.round(progress))
          : setProgress(Math.round(progress));
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
    front && uploadFile(front, "front");
  }, [front]);

  useEffect(() => {
    back && uploadFile(back, "back");
  }, [back]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await userRequest.post("/user/identity", {
        ...inputs,
      });
      setProcessing(false);
      return toast.success(
        "Data uploaded successfully, our admin will get back to you."
      );
    } catch (error) {
      setProcessing(false);
      return toast.error(error.response.data);
    }
  };

  return (
    <div className={identity ? "verifyAccount" : "none"}>
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className={processing ? "circular" : "none"}>
        <Box sx={{ display: "flex" }}>
          {progress < 100 ? <CircularProgress className="cc" /> : ""}
        </Box>
      </div>

      {user.isVerified ? (
        <p className="verified">Account verified</p>
      ) : (
        <form className="row g-3" onSubmit={handleSubmit}>
          <h3>Input a valid government approved ID</h3>
          <div className="col-md-3">
            <label htmlFor="idFront" className="form-label">
              Front view
            </label>
            <input
              type="file"
              className="form-control"
              required
              onChange={(e) => setFront(e.target.files[0])}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="idBack" className="form-label">
              Back view
            </label>
            <input
              type="file"
              className="form-control"
              required
              onChange={(e) => setBack(e.target.files[0])}
            />
          </div>
          <div className="col-md-3">
            <button
              className="submit-button"
              type="submit"
              disabled={processing}
            >
              Upload
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VerifyAccount;
