import React, { useEffect } from "react";
import { userRequest } from "../../../../requestMethod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const SuccessValidateAgent = ({ agentId }) => {
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const validateAgent = async () => {
      try {
        if (user.isAgent) {
          await userRequest.put(`/admin/approve-agent/user/${agentId}`);
        } else {
          await userRequest.put(`/admin/validate-agent/${user.uuid}`);
        }
        toast.success("Success");
        window.location.replace("/dashboard");
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    validateAgent();
  });

  return (
    <div>
      <ToastContainer position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SuccessValidateAgent;
