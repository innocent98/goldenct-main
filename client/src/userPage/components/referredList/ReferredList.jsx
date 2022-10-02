import { useEffect, useState } from "react";
import { userRequest } from "../../../requestMethod";
import "./referredList.scss";

const ReferredList = () => {
  const [referred, setReferred] = useState([]);

  // get number of referred
  useEffect(() => {
    const fetchReffered = async () => {
      const res = await userRequest.get("/user/agents/referred");
      setReferred(res.data);
    };
    fetchReffered();
  }, []);

  return (
    <div className="referredList">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">User Status</th>
            <th scope="col">User Package</th>
          </tr>
        </thead>
        <tbody>
          {referred.map((r) => (
            <tr>
              <td>{r.username}</td>
              <td>{r.isValidated ? "Activated" : "Pending"}</td>
              <td>{r.package ? r.package : "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferredList;
