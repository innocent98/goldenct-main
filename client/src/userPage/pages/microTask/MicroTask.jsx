import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRequest } from "../../../requestMethod";
import CreatePost from "../../components/createPost/CreatePost";
import TablePagination from "@mui/material/TablePagination";
// import { saveAs } from "file-saver";
import "./microTask.scss";

const MicroTask = ({
  setPackages,
  setDashboard,
  setAgent,
  setMine,
  setTask,
  setWithdraw,
  setFaqs,
  setSettings,
}) => {
  setTask(true);
  setDashboard(false);
  setPackages(false);
  setAgent(false);
  setMine(false);
  setWithdraw(false);
  setFaqs(false);
  setSettings(false);

  const user = useSelector((state) => state.user.currentUser);
  const [createPost, setCreatePost] = useState(false);
  const [jobPosted, setJobPosted] = useState([]);
  const [sponsoredJob, setSponsoredJob] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // post job
  const handleCreate = (e) => {
    e.preventDefault();
    setCreatePost(true);
  };

  // fetch job
  useEffect(() => {
    const fetchJobPosted = async () => {
      const res = await userRequest.get("/task/posted-jobs");
      setJobPosted(res.data);
    };
    fetchJobPosted();
  }, [setJobPosted]);

  const reversed = [...jobPosted].reverse();

  // fetch sponsored job
  useEffect(() => {
    const fetchJobPosted = async () => {
      const res = await userRequest.get("/task/sponsored-job");
      setSponsoredJob(res.data[0]);
    };
    fetchJobPosted();
  }, [setSponsoredJob]);

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
    <div className="microTask">
      {user.isValidated ? (
        <>
          <div className={createPost ? "account" : "none"}>
            <CreatePost />
          </div>
          <div className={createPost ? "none" : "agentLeft"}>
            <p>Total Balance</p>
            <h2>#{loggedUser.taskWallet}</h2>
            <div className="task">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <div className="row">
                        <div className="col head">Job Title</div>
                        <div className="col head">No of Workers Needed</div>
                        <div className="col head">Applied</div>
                        <div className="col head">Payment</div>
                        <div className="col head">Action</div>
                      </div>
                    </th>
                  </tr>
                </thead>

                {sponsoredJob && (
                  <tbody>
                    <tr>
                      <td>
                        <form className="row" key={sponsoredJob._id}>
                          <div className="col">{sponsoredJob.jobTitle}</div>
                          <div className="col">All</div>
                          <div className="col">All/All</div>
                          <div className="col">#{sponsoredJob.amount}</div>
                          <div className="col">
                            {/* <a href={job.picture} download={job.picture}> */}
                            <Link to={`/proof-upload/${sponsoredJob._id}`}>
                              <button>Apply</button>
                            </Link>
                            {/* </a> */}
                          </div>
                        </form>
                      </td>
                    </tr>
                  </tbody>
                )}

                {reversed
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((job) => (
                    <tbody>
                      <tr key={job._id}>
                        <td>
                          <form className="row">
                            <div className="col">{job.jobTitle}</div>
                            <div className="col">{job.workers}</div>
                            <div className="col">
                              {job.applied}/{job.workers}
                            </div>
                            <div className="col">#{job.amount}</div>
                            <div className="col">
                              <Link to={`/proof-upload/${job._id}`}>
                                <button disabled={job.workers === job.applied}>
                                  {job.workers === job.applied
                                    ? "Completed"
                                    : "Appy"}
                                </button>
                              </Link>
                            </div>
                          </form>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
              <TablePagination
                rowsPerPageOptions={[2, 5, 10, 25, 100]}
                component="div"
                count={jobPosted.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                className="pagination-sm"
              />
            </div>
          </div>
          <div className={createPost ? "none" : "agentRight"}>
            <div className="container-fluid">
              <h3>
                Be a Job Creator{" "}
                <a href="/">
                  <span className="material-icons" onClick={handleCreate}>
                    arrow_circle_right
                  </span>
                </a>
              </h3>
              <p>
                You certainly can be a job creator by posting available jobs.
              </p>
              <img src="assets/img/working.png" alt="" />
            </div>
            <div className="container-fluid">
              <h3>Daily Income MicroTask Statistics </h3>
              <p>
                Pending Submissions <span>{user.pendingSubmission}</span>
              </p>
              <p>
                Successful Submissions <span>{user.successfulSubmission}</span>
              </p>
              <p>
                Rejected Submissions <span>{user.rejectedSubmission}</span>
              </p>
              <p>
                Pending Job Posts <span>{user.pendingJob}</span>
              </p>
              <p>
                Successful Job Posts <span>{user.successfulJob}</span>
              </p>
            </div>
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

export default MicroTask;
