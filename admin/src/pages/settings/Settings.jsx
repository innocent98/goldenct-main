import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRequest } from "../../requestMethod";
import "./settings.css";

export default function Settings() {
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
      await userRequest.put(`/admin/reset-password/${userA._id}/admin/user-admin`, {
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
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
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
            <div className="userUpdateItem">
              <label>Password</label>
              <input
                type="password"
                name="password"
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
            </button>{" "}
            <br />
            <Link to={"/account-settings/update-auth/" + userA._id}>Update auth</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
