import { useEffect, useState } from "react";
import { userRequest } from "../../../requestMethod";
import "./rejectedJob.scss";

const RejectedJob = ({
  setPackages,
  setDashboard,
  setAgent,
  setMine,
  setTask,
  setWithdraw,
  setFaqs,
  setSettings,
  setRejectedJob,
}) => {
  setRejectedJob(true);
  setDashboard(false);
  setPackages(false);
  setAgent(false);
  setMine(false);
  setTask(false);
  setWithdraw(false);
  setFaqs(false);
  setSettings(false);

  const [loggedUser, setLoggedUser] = useState("");
  const [rejectedJobs, setRejectedJobs] = useState([]);

  // get logged in user
  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/user/user");
      setLoggedUser(res.data);
    };
    fetchUser();
  }, [setLoggedUser]);

  //   get approved posted jobs
  useEffect(() => {
    const fetchJobs = async () => {
      const res = await userRequest.get("/task/all-posted-jobs");
      setRejectedJobs(res.data);
    };
    fetchJobs();
  }, [setRejectedJobs]);

  const reversed = [...rejectedJobs].reverse();

  return (
    <div className="rejectedJob">
      <div className="wrapper">
        <div className="left">
          <section>
            <p>Wallet Balance</p>
            <h1>#{loggedUser.taskWallet}</h1>
          </section>
          <div className="container-fluid">
            <table className="table">
              <thead>
                {/* <th scope="col">S/N</th> */}
                <th scope="col">Job Title</th>
                <th scope="col">Amount refunded</th>
                <th scope="col">Reason</th>
              </thead>
              <tbody>
                {reversed.map((rejectedJob) => (
                  <>
                    {rejectedJob.isDeclined ? (
                      <tr>
                        {/* <th scope="row">
                        {rejectedJobs.lastIndexOf.length}
                      </th> */}
                        <td>{rejectedJob.jobTitle}</td>
                        <td>#{rejectedJob.totalPayable}</td>
                        <td>{rejectedJob.reason}</td>
                      </tr>
                    ) : (
                      ""
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default RejectedJob;
