import { useLocation } from "react-router-dom";
import "./feedbackSingle.css";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function FeedbackSingle() {
  const [job, setJob] = useState([]);
  const [progress, setProgress] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(
        `/task/uploaded-proof/find-all/${path}`
      );
      setJob(res.data);
    };
    fetchUser();
  }, [path]);

  const reversed = [...job].reverse();

  // accept job
  const handleApprove = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      const res = await userRequest.put(`/task/approve-task-proof/${reversed.map((j) => j._id)}`);
      setProgress(false);
      return alert(res.data);
    } catch (error) {
      setProgress(false);
      return alert(error.response.data);
    }
  };

  // decline job
  const handleDecline = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      const res = await userRequest.put(
        `/task/reject-task-proof/${reversed.map((j) => j._id)}`
      );
      setProgress(false);
      return alert(res.data);
    } catch (error) {
      setProgress(false);
      return alert(error.response.data);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Sponsored Job</h1>
      </div>

      <div className="productBottom">
        {reversed.map((j) => (
          <>
            {job.length >= 1 ? (
              <div className="productFormLeft" key={j._id}>
                <label>{j.jobTitle}</label>
                <img src={j.screenshot} alt="" className="productUploadImg" />
                <div className="button">
                  <button
                    className="btn btn-success"
                    disabled={progress || j.isApproved || j.isDeclined}
                    onClick={handleApprove}
                  >
                    {j.isApproved ? "Approved" : "Approve"}
                  </button>
                  <button
                    className="btn btn-danger"
                    disabled={progress || j.isApproved || j.isDeclined}
                    onClick={handleDecline}
                  >
                    {j.isDeclined ? "Declined" : "Decline"}
                  </button>
                </div>
              </div>
            ) : (
              <p>No proof uploaded at the moment...</p>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
