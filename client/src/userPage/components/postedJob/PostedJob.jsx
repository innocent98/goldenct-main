import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../../../requestMethod";
import "./postedJob.scss";

const PostedJob = ({ viewJob }) => {
  const [loggedUser, setLoggedUser] = useState("");
  const [jobs, setJobs] = useState([]);

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
      const res = await userRequest.get("/task/user-posted-jobs");
      setJobs(res.data);
    };
    fetchJobs();
  }, [setJobs]);

  const reversed = [...jobs].reverse();

  return (
    <div className={viewJob ? "postedJob" : "none"}>
      <div className="wrapper">
        <div className="left">
          <section>
            <p>Wallet Balance</p>
            <h1>#{loggedUser.taskWallet}</h1>
          </section>
          <div className="container-fluid">
            <table className="table">
              <thead>
                <tr>
                  {/* <th scope="col">S/N</th> */}
                  <th scope="col">Job Title</th>
                  <th scope="col">Amount paid</th>
                  <th scope="col">Applied/Workers</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {reversed.map((job) => (
                  <tr key={job._id}>
                    {/* <th scope="row">
                    <ol>
                      <li></li>
                    </ol>
                  </th> */}
                    <td>{job.jobTitle}</td>
                    <td>#{job.totalPayable}</td>
                    <td>
                      {job.applied}/{job.workers}
                    </td>
                    <td>
                      <Link to={"/proof/" + job._id} className="action">
                        Uploaded proofs
                      </Link>
                    </td>
                  </tr>
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

export default PostedJob;
