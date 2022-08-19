import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRemainingTimeUntilMsTimestamp } from "../../utils/utils";
import "./withdrawGolden.scss";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const WithdrawGolden = () => {
  const user = useSelector((state) => state.user.currentUser);

  // get countdown to unlocking
  const [remainingTimeToUnlock, setRemainingTimeToUnlock] =
    useState(defaultRemainingTime);
  let monthsToAdd = new Date(user.createdAt);
  const futureDate = monthsToAdd.setMonth(monthsToAdd.getMonth() + 12);
  // console.log(futureDate);

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
    <div className="withdraw">
      <form className="row g-3">
        <p>Total Mined</p>
        <h1>{user.mineWallet}GCT</h1>
        <div className="col">
          <div className="col-md-3">
            <label htmlFor="amount" className="form-label form-label-sm">
              Amount
            </label>
            <input
              type="text"
              className="form-control form-control-sm shadow-none"
              name="amount"
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="remark" className="form-label form-label-sm">
              Remarks (optional)
            </label>
            <input
              type="text"
              className="form-control form-control-sm shadow-none"
              name="remark"
              required
            />
          </div>
          <div className="col-md-3">
            <label
              htmlFor="transactionPin"
              className="form-label form-label-sm"
            >
              Transaction pin
            </label>
            <input
              type="password"
              className="form-control form-control-sm shadow-none"
              name="transactionPin"
              required
            />
          </div>
          <div className="col-md-3">
            <button className="submit-button" disabled>
              {remainingTimeToUnlock.days}days to go...
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WithdrawGolden;
