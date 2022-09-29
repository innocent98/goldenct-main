import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import storage from "../../../firebase";
import { userRequest } from "../../../requestMethod";
// import { Toaster, toast } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./accountDetails.scss";

const AccountDetails = ({ validUserId, agentId, jobId, paymentId }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [details, setDetails] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [click, setClick] = useState(false);
  const [progress, setProgress] = useState(0);
  const [submissionProgress, setSubmissionProgress] = useState(false);

  const navigate = useNavigate;

  // get user first subscription for validation
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await userRequest.get(`/user/get-subscribed/${validUserId}`);
      setDetails(res.data);
    };
    fetchDetails();
  }, [setDetails, validUserId]);

  // get user upgrade subscription details
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await userRequest.get(`/user/get-package/${validUserId}`);
      setDetails(res.data);
    };
    fetchDetails();
  }, [setDetails, validUserId]);

  // get agent details
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await userRequest.get(`/user/get-agent/${agentId}`);
      setDetails(res.data);
    };
    fetchDetails();
  }, [agentId, setDetails]);

  // get agent subsequent renewal details
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await userRequest.get(`/user/get-agent-packages/${agentId}`);
      setDetails(res.data);
    };
    fetchDetails();
  }, [agentId, setDetails]);

  // get posted job details
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await userRequest.get(`/task/posted-jobs-details/${jobId}`);
      setDetails(res.data);
    };
    fetchDetails();
  }, [jobId, setDetails]);

  // get top-up payment details
  useEffect(() => {
    const fetchDetails = async () => {
      const res = await userRequest.get(`/user/get-payment/${paymentId}`);
      setDetails(res.data);
    };
    fetchDetails();
  }, [paymentId, setDetails]);

  // upload payment proof
  const newPayment = {
    uuid: user.uuid,
    amount: details.amount,
    screenshot: screenshot,
    paymentFor: details.agentPackage
      ? details.agentPackage
      : details.userPackage
      ? details.userPackage
      : details.jobCat
      ? details.jobCat
      : "Wallet Top-up",
  };

  const handleClick = (e) => {
    setClick(true);
    if (screenshot) {
      const uploadFile = (file) => {
        if (!file) return;
        const filename = Date.now() + file.name;
        const storageRef = ref(storage, `/goldenct-paymentProof/${filename}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(prog);
          },
          (err) => console.log(err),
          () => {
            const pic = getDownloadURL(uploadTask.snapshot.ref).then((url) =>
              setScreenshot(url)
            );
            newPayment.screenshot = pic;
          }
        );
      };
      uploadFile(screenshot);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setSubmissionProgress(true);
    try {
      await userRequest.post("/user/payment", newPayment);
      toast.success("Payment successful, kindly wait for approval.");
      setSubmissionProgress(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      navigate("/");
    } catch (error) {
      setSubmissionProgress(false);
      return toast.error(error.response.data);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className="refresh">Please do not refresh this page</div>
      <br />
      <div className="accountDetails">
        <div className="accountLeft">
          <h1>Account Details</h1>
          <table className="table-bordered">
            <tbody>
              <tr>
                <th>Description</th>
                <td>Account Details</td>
              </tr>
              <tr>
                <th>Bank Name</th>
                <td>WEMA BANK</td>
              </tr>
              <tr>
                <th>Account Number</th>
                <td>7358345540</td>
              </tr>
              <tr>
                <th>Account Name</th>
                <td>GOLDEN COMFORT TECH. LTD</td>
              </tr>
              <tr>
                <th>Total Payable Amount Plus VAT</th>
                <td>{details.totalPayable || details.amount}</td>
              </tr>
              <tr>
                <th>Payment For </th>
                <td>
                  {details.agentPackage ||
                    details.userPackage ||
                    details.jobCat ||
                    "Wallet Top-up"}
                </td>
              </tr>
            </tbody>
          </table>
          <h1>Payment Transaction</h1>
          <p>Upload proof of payment (pdf or img allowed, 1mb max) </p>
          <form className="row g-3" onSubmit={handlePayment}>
            <div className="col-md-3">
              <input
                type="file"
                className="form-control"
                name="screenshot"
                onChange={(e) => setScreenshot(e.target.files[0])}
              />
              <div
                className={click ? "progress" : "none"}
                style={{ backgroundColor: "green", color: "white" }}
              >
                {progress && (
                  <span
                    style={click ? { display: "block" } : { display: "none" }}
                  >
                    {progress}%
                  </span>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="btn btn-success"
                style={screenshot ? { display: "block" } : { display: "none" }}
                onClick={handleClick}
              >
                Upload screenshot
              </div>
            </div>
            <div className="col-md-3">
              <button
                className={submissionProgress ? "submit progress" : "submit"}
                type="submit"
                disabled={progress < 100 || submissionProgress}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="accountRight">
          <p>Note: Kindly use transfer remark as your transfer description</p>
          <h1>Transaction Created</h1>
          <table className="table-bordered">
            <tbody>
              <tr>
                <th>Description</th>
                <td>Account Details</td>
              </tr>
              <tr>
                <th>Currency</th>
                <td>Naira / USD</td>
              </tr>
              <tr>
                <th>Method</th>
                <td>Bank Transfer</td>
              </tr>
              <tr>
                <th>Transfer Remarks </th>
                <td>{details.reference}</td>
              </tr>
              <tr>
                <th>Total Payable Amount Plus VAT</th>
                <td>{details.totalPayable || details.amount}</td>
              </tr>
              <tr>
                <th>Payment for </th>
                <td>
                  {details.agentPackage ||
                    details.userPackage ||
                    details.jobCat ||
                    "Wallet Top-up"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AccountDetails;
