import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
import dateformat from "dateformat"
import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/task/jobs/latest");
      setJobs(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Jobs</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">User</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Job Title</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {jobs.map((job) => (
        <tr className="widgetLgTr" key={job._id}>
          <td className="widgetLgUser">
            {/* <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            /> */}
            <span className="widgetLgName">{job.uuid}</span>
          </td>
          <td className="widgetLgDate">{dateformat((job.createdAt), "mmmm dd yyyy")}</td>
          <td className="widgetLgAmount">{job.jobTitle}</td>
          <td className="widgetLgStatus">
            <Button type={job.isApproved ? "Approved" : job.isDeclined ? "Declined" : "Pending"} />
          </td>
        </tr>
        ))}
      </table>
    </div>
  );
}
