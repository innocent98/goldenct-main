import { useState } from "react";
import "./feedback.scss";
import { userRequest } from "../../../requestMethod";
import { useEffect } from "react";
import dateFormat from "dateformat";

const Feedback = () => {
  const [history, setHistory] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await userRequest.get("/user/withdrawn-history");
      setHistory(res.data);
    };
    fetchHistory();
  }, [setHistory]);

  const reversed = [...history].reverse();

  return (
    <div className="feedback">
      <div className="container-fluid">
        <h4 style={{textAlign: "center"}}>Withdrawal History</h4>
        {reversed.length >= 1 ? (
          <table className="table table-light">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reversed.map((his) => (
                <tr key={his._id}>
                  <td>{his.amount}</td>
                  <td>{his.ispaid ? "Paid" : "Processing"}</td>
                  <td>{dateFormat(his.createdAt, "yyyy : mm : dd")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No record...</p>
        )}
      </div>
    </div>
  );
};

export default Feedback;
