import React from "react";
import "./topbar.css";
import { Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Topbar() {
  const userA = useSelector((state) => state.user.currentUser);
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">GoldenCT</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div> */}
          {userA.role === "Admin" && (
            <Link to={`/settings/${userA._id}`} className="link">
              <div className="topbarIconContainer">
                <Settings />
              </div>
            </Link>
          )}
          <img src="/img/avatar2.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
