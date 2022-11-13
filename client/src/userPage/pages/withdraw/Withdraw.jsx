import { useEffect, useState } from "react";
import { userRequest } from "../../../requestMethod";
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

  // get logged in user
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/user/user");
      setLoggedUser(res.data);
    };
    fetchUser();
  }, [setLoggedUser]);

  return (
    <>
      {user.isValidated || loggedUser.isValidated ? (
        <div className="withdraw">
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
        </div>
      ) : (
        <div className="validate">Please validate your accont to continue</div>
      )}
    </>
  );
};

export default Withdraw;
