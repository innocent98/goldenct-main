import { useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethod";
import "./auth.css";

export default function Auth() {
  const [inputs, setInputs] = useState({});
  const [processing, setProcessing] = useState(false);
  const userA = useSelector((state) => state.user.currentUser);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await userRequest.put(`/admin/reset-auth/${userA._id}/admin/user-admin`, {
        ...inputs,
      });
      setProcessing(false);
      return alert("Data updated successfully.");
    } catch (error) {
      setProcessing(false);
      return alert(error.response.data);
    }
  };

  return (
    <div className="settings">
      <div className="userUpdate">
        <span className="userUpdateTitle">Update Account Password</span>
        <form className="userUpdateForm" onSubmit={handleSubmit}>
          <div className="userUpdateLeft">
            <div className="userUpdateItem">
              <label>Current Auth</label>
              <input
                type="password"
                name="currentAuth"
                className="userUpdateInput"
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="userUpdateInput"
                onChange={handleChange}
              />
            </div>
            <div className="userUpdateItem">
              <label>Auth</label>
              <input
                type="password"
                name="auth"
                className="userUpdateInput"
                onChange={handleChange}
              />
            </div>
            <br />
            <button
              className="userUpdateButton"
              type="submit"
              disabled={processing}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
