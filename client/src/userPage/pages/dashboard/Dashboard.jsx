import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../../requestMethod";
// import dateFormat from "dateformat"
import moment from "moment";
import "./dashboard.scss";

const Dashboard = ({ setDashboard, setPackages }) => {
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

  const [taskDone, setTaskDone] = useState([]);
  const [latestTaskDone, setLatestTaskDone] = useState([]);
  const [viewAll, setViewAll] = useState(false);

  // get task done
  useEffect(() => {
    const fetchTaskDone = async () => {
      const res = await userRequest.get("/task/task-done");
      setTaskDone(res.data);
    };
    fetchTaskDone();
  }, [setTaskDone]);

  const reversed = [...taskDone].reverse();

  const handleViewAll = (e) => {
    e.preventDefault();
    setViewAll(true);
  };

  // get latest task done
  useEffect(() => {
    const fetchTaskDone = async () => {
      const res = await userRequest.get("/task/task-done/latest");
      setLatestTaskDone(res.data);
    };
    fetchTaskDone();
  }, [setLatestTaskDone]);

  return (
    <div className="dashboard container-fluid">
      <div className="left">
        <div className="wallet">
          <div className="title">Wallet Balance</div>
          <h2>#{loggedUser.taskWallet}</h2>
        </div>
        <div className="transaction">
          <div className="transactionLeft">
            <div className="history">Transaction History</div>
            {viewAll ? (
              <>
                {reversed.map((td) => (
                  <div className="transactionHistory" key={td._id}>
                    <div className="date">{moment(td.createdAt).fromNow()}</div>
                    <div className="content">
                      <img src="assets/img/Logow.png" alt="" />
                      <div className="cont">
                        <div className="name">{td.jobTitle}</div>
                        <div className="time">
                          {td.isApproved
                            ? "Approved"
                            : td.isDeclined
                            ? "Declined"
                            : "Pending"}
                          <span className={td.isDeclined ? "declined" : "none"}>
                            <a href="https://tinyurl.com/3ryjexpx">
                              <button>Report</button>
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {latestTaskDone.length >= 1 ? (
                  <>
                    {latestTaskDone.map((td) => (
                      <div className="transactionHistory" key={td._id}>
                        <div className="date">
                          {moment(td.createdAt).fromNow()}
                        </div>
                        <div className="content">
                          <img src="assets/img/Logow.png" alt="" />
                          <div className="cont">
                            <div className="name">{td.jobTitle}</div>
                            <div className="time">
                              {td.isApproved
                                ? "Approved"
                                : td.isDeclined
                                ? "Declined"
                                : "Pending"}
                              <span
                                className={td.isDeclined ? "declined" : "none"}
                              >
                                <a href="https://tinyurl.com/3ryjexpx">
                                  <button>Report</button>
                                </a>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No transaction yet</p>
                )}
              </>
            )}
          </div>
          <div className="transactionRight">
            <a href="/" className="view" onClick={handleViewAll}>
              View all
            </a>
            {viewAll ? (
              <>
                {taskDone.map((td) => (
                  <div className="amountDetails" key={td._id}>
                    <div className="amount">#{td.amount}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {latestTaskDone.map((td) => (
                  <div className="amountDetails" key={td._id}>
                    <div className="amount">#{td.amount}</div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="right">
        <div className="first"></div>
        <div className="cardContainer">
          <div className="cardContainerLeft">
            <img src="assets/img/Logo.png" className="img-fluid" alt="" />
            <h3>**** 8962</h3>
            <p>{user.fullName}</p>
          </div>
          <div className="cardContainerRight">
            <img src="assets/img/comm.png" className="img-fluid" alt="" />
            <span className="material-icons">qr_code_2</span>
            <h3>GOLD</h3>
          </div>
        </div>
        <div className="second">
          <div className="upgrade">
            <div className="upgradeLeft">Upgrade your account to PREMIUM</div>
            <div className="upgradeRight">
              <a href="/packages">
                <span className="material-icons">arrow_circle_right</span>
              </a>
            </div>
          </div>
          <p>Start mining higher to increase your earning power</p>
          <img src="assets/img/undraw.png" className="img-fluid" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
