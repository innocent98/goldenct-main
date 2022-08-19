import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./singleUplooadedProof.scss";
import { userRequest } from "../../../requestMethod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getRemainingTimeUntilMsTimestamp } from "../../utils/utils";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const SingleUplooadedProof = () => {
  const [proof, setProof] = useState({});
  const [progress, setProgress] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchProof = async () => {
      const res = await userRequest.get(
        `/task/uploaded-proof/find-single/${path}`
      );
      setProof(res.data);
    };
    fetchProof();
  }, [path, setProof]);


  const handleApprove = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      await userRequest.put(`/task/approve-job-proof/${path}`);
      alert("Proof approved");
      window.location.reload();
      setProgress(false);
    } catch (error) {
      return toast.error(error.response.data);
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      await userRequest.put(`/task/reject-job-proof/${path}`);
      alert("Proof rejected");
      window.location.reload();
      setProgress(false);
    } catch (error) {
      return toast.error(error.response.data);
    }
  };

  const countdownTimestampMs = proof.time;
  const currentTime = new Date();
  const totalSeconds = (currentTime - countdownTimestampMs) / 1000;
  //   const hour = (totalSeconds / 3600) % 24;
  //   console.log(totalSeconds);

  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  // countdown funtion for mining
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestampMs]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  // auto approve job
  useEffect(() => {
    const autoApprove = async () => {
      if (!proof.isApproved && totalSeconds >= 0) {
        await handleApprove();
      } else if (!proof.isDeclined && totalSeconds >= 0) {
        await handleApprove();
      }
    };
    autoApprove();
  });

  return (
    <div className="singleUploadedProof">
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className="timeLeft">
        Time left for you to approve or reject proof is{" "}
        <span>{remainingTime.days}d</span> <span>{remainingTime.hours}h</span>{" "}
        <span>{remainingTime.minutes}m</span>{" "}
        <span>{remainingTime.seconds}s</span>
      </div>
      <img src={proof.screenshot} alt="" className="img-fluid" />
      <div className="button">
        <button
          className={proof.isApproved ? "action green" : "action"}
          onClick={handleApprove}
          disabled={progress || proof.isApproved || proof.isDeclined}
        >
          {proof.isApproved ? "Approved" : "Aprrove"}
        </button>
        <button
          className={proof.isDeclined ? "action red" : "action"}
          onClick={handleReject}
          disabled={progress || proof.isApproved || proof.isDeclined}
        >
          {proof.isDeclined ? "Rejected" : "Reject"}
        </button>
      </div>
      <span className="doneBy">
        Job done by: <span>{proof.uuid}</span>
      </span>
    </div>
  );
};

export default SingleUplooadedProof;
