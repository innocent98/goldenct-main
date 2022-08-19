import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { userRequest } from "../../requestMethod";
import { getRemainingTimeUntilMsTimestamp } from "../../userPage/utils/utils";
import { Toaster, toast } from "react-hot-toast";
import "./confirmEmail.scss";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const ConfirmEmail = () => {
  const [confirmUser, setConfirmUser] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [progress, setProgress] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    try {
      const fetchConfirmUser = async () => {
        const res = await userRequest.get(`/auth/confirm-user/${path}`);
        setConfirmUser(res.data);
      };
      fetchConfirmUser();
    } catch (error) {
      return alert(error.response.data);
    }
  }, [path, setConfirmUser]);

  const handleResend = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.put(`/auth/resend-code/${path}`);
      alert(res.data);
      window.location.reload();
    } catch (error) {
      return alert(error.response.data);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      const res = await userRequest.put(`/auth/email-confirmation/${path}`, {
        confirmationCode,
      });
      toast.success(res.data);
      window.location.replace("/");
      setProgress(false);
    } catch (error) {
      setProgress(false);
      return toast.error(error.response.data);
    }
  };

  //   handle countdown
  let secondsToAdd = new Date(confirmUser.resendConfirmationCodeIn);
  const currentTime = new Date();
  const futureSeconds = secondsToAdd.setSeconds(secondsToAdd.getSeconds() + 30);
  const totalSeconds = Math.round((currentTime - secondsToAdd) / 1000);
  //   console.log(Math.round(totalSeconds))
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(futureSeconds);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [futureSeconds]);

  function updateRemainingTime(countdown) {
    setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
  }

  return (
    <div className="container">
      <Toaster position="top-center" reverseOrder={false} />
      <h4>Confirm your Email Address</h4>
      <p>
        To complete your registration, please enter the code that we sent to:
      </p>
      <h4 className="sent">{confirmUser.email}</h4>
      <h6>Enter Code</h6>
      <form className="row g-3" onSubmit={handleSubmitOtp}>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control form-control-md  shadow-none"
            required
            onChange={(e) => setConfirmationCode(e.target.value)}
          />
          <label
            htmlFor="otp"
            className={totalSeconds < 0 ? "form-label" : "resend"}
          >
            <button disabled={totalSeconds < 0} onClick={handleResend}>
              Click to Resend OTP{" "}
              {totalSeconds < 0 && <span>in {remainingTime.seconds}s</span>}
            </button>
          </label>
        </div>
        <div className="col-md-4">
          <button className="submit-button" type="submit" disabled={progress}>
            CONTINUE
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmEmail;
