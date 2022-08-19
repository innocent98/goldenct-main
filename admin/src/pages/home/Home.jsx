import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/apiCalls";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import { userRequest } from "../../requestMethod";

export default function Home() {
  const user = useSelector((state) => state.user.currentUser);

  // automatically logout a user when session expires
  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
  };

  useEffect(() => {
    const token = user.accessToken;
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
        return alert("Session expired! kindly login again to continue");
      }
    }
  });

  //  get user stat
  const [stat, setStat] = useState([]);
  useEffect(() => {
    const fetchStat = async () => {
      const res = await userRequest.get("/user/stats");
      setStat(res.data);
    };
    fetchStat();
  }, []);

  const statDetails = stat.map((s) => ({
    name:
      s._id === 1
        ? "Jan"
        : s._id === 2
        ? "Feb"
        : s._id === 3
        ? "Mar"
        : s._id === 4
        ? "April"
        : s._id === 5
        ? "May"
        : s._id === 6
        ? "June"
        : s._id === 7
        ? "July"
        : s._id === 8
        ? "Aug"
        : s._id === 9
        ? "Sept"
        : s._id === 10
        ? "Oct"
        : s._id === 11
        ? "Nov"
        : "Dec",
    "Active User": s.total,
  }));

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={statDetails}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
