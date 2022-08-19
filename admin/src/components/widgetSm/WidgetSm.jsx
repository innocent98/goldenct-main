import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
import { useState } from "react";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/user/users/latest");
      setUsers(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.picture ? user.picture : "img/avatar.png"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.isValidated ? "Active" : "Pending"}</span>
            </div>
              <Link to={`/user/${user.uuid}`} className="link">
            <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
            </button>
              </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
