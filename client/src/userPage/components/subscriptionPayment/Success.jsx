import React, { useEffect } from "react";
import { userRequest } from "../../../requestMethod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const SuccessValidate = () => {
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const validateUser = async () => {
      try {
        await userRequest.put(`/admin/validate/user/${user.uuid}/refer`);
        toast.success("Success");
        window.location.replace("/dashboard");
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    validateUser();
  });

  return (
    <div>
      <ToastContainer position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SuccessValidate;
