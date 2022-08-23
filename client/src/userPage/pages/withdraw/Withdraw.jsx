import { useState } from "react";
import { useSelector } from "react-redux";
import WithdrawDims from "../../components/withdrawDims/WithdrawDims";
import WithdrawGolden from "../../components/withdrawGolden/WithdrawGolden";
import "./withdraw.scss";

const Withdraw = ({
  setPackages,
  setDashboard,
  setAgent,
  setMine,
  setTask,
  setWithdraw,
  setFaqs,
  setSettings,
}) => {
  setWithdraw(true);
  setDashboard(false);
  setPackages(false);
  setAgent(false);
  setMine(false);
  setTask(false);
  setFaqs(false);
  setSettings(false);

  const user = useSelector((state) => state.user.currentUser);

  const [tab1, setTab1] = useState(true);
  const [tab2, setTab2] = useState(false);

  const handleTab1 = () => {
    setTab1(true);
    setTab2(false);
  };

  const handleTab2 = () => {
    setTab2(true);
    setTab1(false);
  };

  return (
    <div className="withdraw">
      {user.isValidated ? (
        <>
          <div className="tabSelect">
            <div
              className={"tab form-control-sm " + (tab1 && "tabActive")}
              onClick={handleTab1}
            >
              DIMs
            </div>
            <div
              className={"tab form-control-sm " + (tab2 && "tabActive")}
              onClick={handleTab2}
            >
              GCT
            </div>
          </div>
          <div className={tab1 ? "withdrawDims" : "none"}>
            <WithdrawDims />
          </div>
          <div className={tab2 ? "withdrawGolden" : "none"}>
            <WithdrawGolden />
          </div>
        </>
      ) : (
        <div className="notValid">
          Dear {user.username}, kindly subscribe to a package to validate your
          account and enjoy our exclusive offer.
        </div>
      )}
    </div>
  );
};

export default Withdraw;
