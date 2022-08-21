import { useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../../requestMethod";
import AccountDetails from "../../components/accountDetails/AccountDetails";
import { Toaster, toast } from "react-hot-toast";
import "./becomeAgent.scss";

const BecomeAgent = ({ agent }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [agentId, setAgentId] = useState("");
  const [agentPackage, setAgentPackage] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);

  const newAgent = { userId: user._id, agentPackage, amount };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.isVerified) {
      try {
        const res = await userRequest.post("/user/agent", newAgent);
        setAgentId(res.data._id);
        setSuccess(true);
      } catch (error) {
        return toast.error(error.response.data);
      }
    } else {
      return alert(
        "You need to be verified to become an agent. Kindly provide a valid means of identification to continue"
      );
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
  
  return (
    <div className={agent ? "packages" : "none"}>
      <Toaster position="top-center" reverseOrder={false} />
      {user.isValidated ? (
        <>
          <div className={success ? "account" : "none"}>
            <AccountDetails agentId={agentId} />
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
            <h2>Agent’s Package</h2>
            <p>
              Note that only validated users can become an agent. Becoming an
              agent gives you the right to validate users and earn 50% commission on each user.
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
                  <div className="col">#5,000/ $10</div>
                  <div className="col">#100,000/$200</div>
                  <div className="col">
                    <button
                      onClick={() =>
                        setAgentPackage("super_star") ||
                        setAmount("#5,000/ $10")
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
                  <div className="col">#5,000/ $10</div>
                  <div className="col">#100,000/$200</div>
                  <div className="col">
                    <button
                      onClick={() =>
                        setAgentPackage("super_star") ||
                        setAmount("#5,000/ $10")
                      }
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            )}
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

export default BecomeAgent;
