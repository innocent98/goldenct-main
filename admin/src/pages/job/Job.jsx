import { useLocation } from "react-router-dom";
import "./job.css";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function Job() {
  const [job, setJob] = useState({});
  const [progress, setProgress] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(`/task/posted-jobs-details/${path}`);
      setJob(res.data);
    };
    fetchUser();
  }, [path]);

  // accept job
  const handleApprove = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      const res = await userRequest.put(`/admin/approve-job/${path}`);
      setProgress(false);
      return alert(res.data);
    } catch (error) {
      setProgress(false);
      return alert(error.response.data);
    }
  };

  // decline job
  const handleDecline = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      const res = await userRequest.put(`/admin/decline-job/${path}`);
      setProgress(false);
      return alert(res.data);
    } catch (error) {
      setProgress(false);
      return alert(error.response.data);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Job</h1>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <div className="productTopRight">
            <div className="productInfoTop">
              {/* <img src={job.screenshot} alt="" className="productInfoImg" /> */}
              <span className="productName">{job.jobTitle}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">cat:</span>
                <span className="productInfoValue">{job.jobCat}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">sub cat:</span>
                <span className="productInfoValue">{job.jobSubCat}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">desc:</span>
                <span className="productInfoValue">{job.jobDesc}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">workers:</span>
                <span className="productInfoValue">{job.workers}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            {/* <img src={job.screenshot} alt="" className="productInfoImg" /> */}
            <span className="productName">{job.jobTitle}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{job.uuid}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">reference:</span>
              <span className="productInfoValue">{job.reference}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">amount:</span>
              <span className="productInfoValue">#{job.totalPayable}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">link:</span>
              <span className="productInfoValue">{job.jobLink}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>{job.jobTitle}</label>
            <img src={job.picture} alt="" className="productUploadImg" />
            <div className="button">
              <button
                className="btn btn-success"
                disabled={progress || job.isApproved || job.isDeclined}
                onClick={handleApprove}
              >
                {job.isApproved ? "Approved" : "Approve"}
              </button>
              <button
                className="btn btn-danger"
                disabled={progress || job.isApproved || job.isDeclined}
                onClick={handleDecline}
              >
                {job.isDeclined ? "Declined" : "Decline"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
