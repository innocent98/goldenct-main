import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
import { useState } from "react";

export default function FeaturedInfo() {
  const [revenew, setRevenew] = useState("")

  useEffect(() => {
    const fetchRevenew = async () =>{
     const res = await userRequest.get("/user/get-total/revenew")
     setRevenew(res.data)
    }
    fetchRevenew()
  })
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">#{revenew.out + revenew.in}</span>
          <span className="featuredMoneyRate">
            -11.4 <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Paid Out</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">#{revenew.out}</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total In</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">#{revenew.in}</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}
