import { useLocation } from "react-router-dom";
import "./identity.css";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function Identity() {
  const [identity, setIdentity] = useState("");
  const [progress, setProgress] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(`/user/identity/${path}`);
      setIdentity(res.data);
    };
    fetchUser();
  }, [path]);

  // accept identity
  const handleApprove = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      const res = await userRequest.put(`/admin/approve-identity/${path}`);
      setProgress(false);
      return alert(res.data);
    } catch (error) {
      setProgress(false);
      return alert(error.response.data);
    }
  };

  // decline identity
  const handleDecline = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      const res = await userRequest.put(`/admin/decline-identity/${path}`);
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
        <h1 className="productTitle">identity</h1>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={identity.front} alt="" className="productInfoImg" />
            </div>
          </div>
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={identity.back} alt="" className="productInfoImg" />
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>{identity.identityTitle}</label>
            <div className="button">
              <button
                className="btn btn-success"
                disabled={progress || identity.isApproved || identity.isDeclined}
                onClick={handleApprove}
              >
                {identity.isApproved ? "Approved" : "Approve"}
              </button>
              <button
                className="btn btn-danger"
                disabled={progress || identity.isApproved || identity.isDeclined}
                onClick={handleDecline}
              >
                {identity.isDeclined ? "Declined" : "Decline"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
