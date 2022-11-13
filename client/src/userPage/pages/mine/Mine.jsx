import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../../requestMethod";
import { getRemainingTimeUntilMsTimestamp } from "../../utils/utils";
// import { Toaster, toast } from "react-hot-toast";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./mine.scss";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const Mine = ({
  setPackages,
  setDashboard,
  setAgent,
  setMine,
  setTask,
  setWithdraw,
  setFaqs,
  setSettings,
}) => {
  setMine(true);
  setDashboard(false);
  setPackages(false);
  setAgent(false);
  setTask(false);
  setWithdraw(false);
  setFaqs(false);
  setSettings(false);

  const user = useSelector((state) => state.user.currentUser);

  // get logged in user
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/user/user");
      setLoggedUser(res.data);
    };
    fetchUser();
  }, [setLoggedUser]);

  // handle mine
  const handleMine = async (e) => {
    e.preventDefault();
    try {
      await userRequest.put("/mine");
      window.location.reload();
    } catch (error) {
      return toast.error(error.response.data);
    }
  };

  const countdownTimestampMs = loggedUser.time;

  const currentTime = new Date();
  const totalSeconds = (currentTime - countdownTimestampMs) / 1000;
  // const hour = (totalSeconds / 3600) % 24;
  // console.log(totalSeconds)

  // // automate mining
  // useEffect(() => {
  //   const handleMining = async (e) => {
  //     if (totalSeconds >= 0) {
  //       await handleMine();
  //     }
  //   };
  //   handleMining();
  // }, [totalSeconds]);

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

  // get countdown to unlocking
  const [remainingTimeToUnlock, setRemainingTimeToUnlock] =
    useState(defaultRemainingTime);
  let monthsToAdd = new Date(user.createdAt);
  const futureDate = monthsToAdd.setMonth(monthsToAdd.getMonth() + 12);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTimeToUnlock(futureDate);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [futureDate]);

  function updateRemainingTimeToUnlock(countdown) {
    setRemainingTimeToUnlock(getRemainingTimeUntilMsTimestamp(countdown));
  }

  return (
    <>
      {user.isValidated || loggedUser.isValidated ? (
        <div className="mine">
          <ToastContainer position="top-center" reverseOrder={false} />
          <button
            className="button"
            onClick={handleMine}
            disabled={totalSeconds < 0 || !loggedUser.isValidated}
          >
            {!user.isValidated && !loggedUser.isValidated
              ? "Please validate your account to continue"
              : totalSeconds >= 0
              ? "Mine"
              : `Mining till ${remainingTime.hours}h: ${remainingTime.minutes}m : ${remainingTime.seconds}s`}
          </button>
          <div className="countdown">
            <h2>Countdown to wallet unlocking</h2>
            <div className="row">
              <div className="col">
                <h3>{remainingTimeToUnlock.days}</h3>
                <p>Days</p>
              </div>
              <div className="col">
                <h3>{remainingTimeToUnlock.hours}</h3>
                <p>Hours</p>
              </div>
              <div className="col">
                <h3>{remainingTimeToUnlock.minutes}</h3>
                <p>Mins</p>
              </div>
              <div className="col">
                <h3>{remainingTimeToUnlock.seconds}</h3>
                <p>Secs</p>
              </div>
            </div>
          </div>

          <div className="mineDetails">
            <div className="left">
              <h3>
                Currently mining at: <span>{user.package}</span>
              </h3>
            </div>
            <div className="right">
              <h3>
                Total mined: <span>{user.mineWallet}GCT</span>
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="validate">Please validate your accont to continue</div>
      )}
    </>
  );
};

export default Mine;
