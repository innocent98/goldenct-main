import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  WorkOutline,
  Report,
  Work,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/apiCalls";

export default function Sidebar() {
  const userA = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/agents" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Agents
              </li>
            </Link>
            <Link to="/payments" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Payment Proofs
              </li>
            </Link>
            <Link to="/top-up-list" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Funds Top-up
              </li>
            </Link>
            <Link to="/withdraw" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Withdrawals
              </li>
            </Link>
            <Link to="/jobs" className="link">
              <li className="sidebarListItem">
                <Work className="sidebarIcon" />
                Jobs
              </li>
            </Link>
            <Link to="/packages" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                User Packages
              </li>
            </Link>
            <Link to="/agent-packages" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Agent Packages
              </li>
            </Link>
            <Link to="/identity" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Identities
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
          </ul>
        </div>
        {userA.role === "Admin" && (
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
              <Link to="/admins" className="link">
                <li className="sidebarListItem">
                  <WorkOutline className="sidebarIcon" />
                  Manage
                </li>
              </Link>
            </ul>
          </div>
        )}
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Activities</h3>
          <ul className="sidebarList">
            <Link to="/feedback" className="link">
              <li className="sidebarListItem">
                <Report className="sidebarIcon" />
                Sponsored proofs
              </li>
            </Link>
            <li className="sidebarListItem" onClick={handleLogout}>
              <Report className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
