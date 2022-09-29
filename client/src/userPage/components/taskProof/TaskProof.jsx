import { useState } from "react";
import "./taskProof.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../../../requestMethod";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../firebase";
import jwt_decode from "jwt-decode";
import { userLogout } from "../../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
// import { Toaster, toast } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import { saveAs } from "file-saver";
// import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";

const TaskProof = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [progress, setProgress] = useState(false);
  const [submissionProgress, setSubmissionProgress] = useState(false);
  const [screenshot, setScreenshot] = useState(undefined);
  const [inputs, setInputs] = useState({});
  // const [shortDesc, setShortDesc] = useState("");

  // const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // const newProof = {
  //   userId: user._id,
  //   ...inputs,
  //   // shortDesc,
  // };

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/goldenct-taskProof/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "screenshot" && setProgress(Math.round(progress));
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
    screenshot && uploadFile(screenshot, "screenshot");
  }, [screenshot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionProgress(true);
    try {
      await userRequest.post(`/task/upload-proof/${path}`, { ...inputs });
      toast.success(
        "Proof successfully uploaded, wait for approval upon confirmation."
      );
      setSubmissionProgress(false);
      // navigate("/");
    } catch (error) {
      setSubmissionProgress(false);
      return toast.error(error.response.data);
    }
  };

  // fetch job
  const [job, setJob] = useState("");
  useEffect(() => {
    const fetchJob = async () => {
      const res = await userRequest.get(`/task/user-posted-job/${path}`);
      setJob(res.data);
    };
    fetchJob();
  }, [path, setJob]);

  // fetch sponsored job
  useEffect(() => {
    const fetchJob = async () => {
      const res = await userRequest.get(`/task/user-sponsored-job/${path}`);
      setJob(res.data);
    };
    fetchJob();
  }, [path, setJob]);

  const downloadImage = () => {
    saveAs(job.picture, "image.jpg"); // Put your image url here.
  };

  // automatically logout a user when session expires
  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
  };

  useEffect(() => {
    const token = user.accessToken;
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
        return alert("Session expired! kindly login again to continue");
      }
    }
  });

  // const getText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html");
  //   return doc.body.textContent;
  // };

  return (
    <>
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className="taskProof container-fluid">
        <section>
          <h1>Job description</h1>
          <p
            className="dec"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(job.jobDesc),
            }}
          ></p>
          {job.jobLink && (
            <>
              <h3>Job link</h3>
              <p>
                <a href={job.jobLink} className="">
                  {job.jobLink}
                </a>
              </p>{" "}
            </>
          )}
          {job.picture && (
            <button onClick={downloadImage}>Download File</button>
          )}
        </section>
        <section>
          <h1>Upload proof of task done</h1>
          <p>Upload proof of task done (screenshot, 1mb max) </p>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-4">
              <input
                type="file"
                name="screenshot"
                id=""
                className="form-input"
                required
                onChange={(e) => setScreenshot(e.target.files[0])}
              />
              <div
                className={screenshot ? "progress" : "none"}
                style={{ backgroundColor: "green", color: "white" }}
              >
                {progress && (
                  <span
                    style={
                      screenshot ? { display: "block" } : { display: "none" }
                    }
                  >
                    {progress}%
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-4">
              Note: If we discover that you did not do this job and you uploaded
              proof saying you did it, you will bear the consequences that shall
              be melted on your account. Thanks for your compliance.
              {/* <label htmlFor="shortDesc" className="form-label">
                A short description of task done. (optional)
              </label>
              <input
                type="text"
                name="shortDesc"
                id=""
                className="form-control"
                onChange={(e) => setShortDesc(e.target.value)}
              /> */}
            </div>
            <div className="col-md-3">
              <button
                className={
                  submissionProgress
                    ? "submit-button progressBtn"
                    : "submit-button"
                }
                type="submit"
                disabled={progress < 100 || !user.isValidated}
              >
                {user.isValidated ? "Submit" : "Validate account"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default TaskProof;
