import jwt_decode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userLogout } from "../../../redux/apiCalls";
import { userRequest } from "../../../requestMethod";
// import { Toaster, toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./uploadedProof.scss";

const UploadedProof = () => {
  const [proofs, setProofs] = useState([]);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProof = async () => {
      const res = await userRequest.get(
        `/task/uploaded-proof/find-all/${path}`
      );
      setProofs(res.data);
    };
    fetchProof();
  }, [path, setProofs]);

  const reversed = [...proofs].reverse();

  // stop job
  const stopJob = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.put(`/task/stop-job/${path}`);
      return alert(res.data)
    } catch (error) {
      return alert(error.response.data);
    }
  };

  // automatically logout a user when tokan expires
  const user = useSelector((state) => state.user.currentUser);

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

  return (
    <div className="uploadedProof">
      <ToastContainer position="top-center" reverseOrder={false} />
      <p className={proofs.length >= 1 ? "" : "none"}>
        Kindly hover on image to take action{" "}
        <span>
          {" "}
          <button onClick={stopJob}>Stop job</button>
        </span>
      </p>

      <div className="container-fluid">
        {proofs.length >= 1 ? (
          <>
            {reversed.map((proof) => (
              <Link
                to={`/proof-single/${proof._id}`}
                key={proof._id}
                className="action"
              >
                <div className="img">
                  <img src={proof.screenshot} alt="" className="img-fluid" />
                  <span className="doneBy">
                    Job done by: <span>{proof.uuid}</span>
                  </span>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <p>No proof uploaded yet</p>
        )}
      </div>
    </div>
  );
};

export default UploadedProof;
