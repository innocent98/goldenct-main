import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../../requestMethod";
// import { Toaster, toast } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./becomeAgent.scss";
import AgentTopUp from "./agentPayment/TopUp";

const BecomeAgent = ({
  setPackages,
  setDashboard,
  setAgent,
  setMine,
  setTask,
  setWithdraw,
  setFaqs,
  setSettings,
}) => {
  setAgent(true);
  setDashboard(false);
  setPackages(false);
  setMine(false);
  setTask(false);
  setWithdraw(false);
  setFaqs(false);
  setSettings(false);

  const user = useSelector((state) => state.user.currentUser);
  const [agentId, setAgentId] = useState("");
  const [agentPackage, setAgentPackage] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const newAgent = { userId: user._id, agentPackage, amount };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.post("/user/agent", newAgent);
      setAgentId(res.data._id);
      setSuccess(true);
    } catch (error) {
      return toast.error(error.response.data);
    }
  };

  const handleRenew = async (e) => {
    e.preventDefault();
    try {
      const res = await userRequest.post("/user/agent-upgrade", newAgent);
      setAgentId(res.data._id);
      setSuccess(true);
    } catch (error) {
      return toast.error(error.response.data);
    }
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
        <div className="packages">
          <ToastContainer position="top-center" reverseOrder={false} />
          <div className={success ? "account" : "none"}>
            <AgentTopUp agentId={agentId} />
            {/* <AccountDetails agentId={agentId} /> */}
          </div>
          <div className={success ? "none" : "packageLeft"}>
            <div className={user.isAgent ? "wallet" : "none"}>
              <div className="singleWallet">
                <div className="title">Agent Wallet Balance</div>
                <h2>#{user.isAgent ? user.agent.agentWallet : ""}</h2>
              </div>
              <div className="singleWallet">
                <div className="title">Agent Reward</div>
                <h2>#{user.isAgent ? user.agent.reward : ""}</h2>
              </div>
            </div>
            <h2>Agent???s Package</h2>
            <p>
              Note that only validated users can become an agent. Becoming an
              agent gives you the right to validate users and earn 50%
              commission on each user.
            </p>
            {user.isAgent ? (
              <div className="package">
                <div className="row">
                  <h1>Renew Your Agent Plan</h1>
                </div>
                <div className="row">
                  <div className="col head">Package Name</div>
                  <div className="col head">Price (#/$)</div>
                  <div className="col head">Return</div>
                  <div className="col head">Subscribe</div>
                </div>
                <hr />
                <form className="row" onSubmit={handleRenew}>
                  <div className="col">Super Star</div>
                  <div className="col">#1,000/ $10</div>
                  <div className="col">#100,000/$200</div>
                  <div className="col">
                    <button
                      onClick={() =>
                        setAgentPackage("super_star") ||
                        setAmount("#1,000/ $10")
                      }
                    >
                      Renew
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="package">
                <div className="row">
                  <h1>Apply To Become An Agent</h1>
                </div>
                <div className="row">
                  <div className="col head">Package Name</div>
                  <div className="col head">Price (#/$)</div>
                  <div className="col head">Return</div>
                  <div className="col head">Subscribe</div>
                </div>
                <hr />
                <form className="row" onSubmit={handleSubmit}>
                  <div className="col">Super Star</div>
                  <div className="col">#1,000/ $10</div>
                  <div className="col">#100,000/$200</div>
                  <div className="col">
                    <button
                      onClick={() =>
                        setAgentPackage("super_star") ||
                        setAmount("#1,000/ $10")
                      }
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="validate">Please validate your accont to continue</div>
      )}
    </>
  );
};

export default BecomeAgent;
