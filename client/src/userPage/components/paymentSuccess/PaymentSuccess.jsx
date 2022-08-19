import { useState } from "react";
import "./paymentSuccess.scss";
import { userRequest } from "../../../requestMethod";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const PaymentSuccess = ({ amount }) => {
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  const handleValidayte = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await userRequest.post("/user/wallet/top-up", { amount });
      setProcessing(false);
      navigate("/");
      return alert("Payment successfull! Kindly go back.");
    } catch (error) {
      setProcessing(false);
      return toast.error(error.response.data);
    }
  };

  return (
    <div className="payment">
      <ToastContainer position="top-center" reverseOrder={false} />
      <p>Payment of #{amount} was successful, kindly validate to continue</p>
      <button onClick={handleValidayte} disabled={processing}>
        {processing ? "Please wait..." : "Validate payment"}
      </button>
    </div>
  );
};

export default PaymentSuccess;
