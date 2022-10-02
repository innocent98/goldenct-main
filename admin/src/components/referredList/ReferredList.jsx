import "./referredList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function ReferredList() {
  // const [deletePop, setDeletePop] = useState(false)

  // const handleDelete = () => {
  //   setDeletePop(!deletePop)
  // }
  const columns = [
    { field: "uuid", headerName: "ID", width: 200 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: true,
    },
    {
      field: "package",
      headerName: "Package",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 150,
      editable: true,
    },
  ];
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const location = useLocation().pathname.split("/")[2];
  // console.log(location);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(`/user/agents-referred/${location}/?user=${query}`);
      setUsers(res.data);
    };
    fetchUser();
  }, [location, query, setUsers]);

  const reversed = [...users].reverse();

  const rows = reversed.map((user) => ({
    id: user._id,
    uuid: user.uuid,
    email: user.email,
    username: user.username,
    package: `${user.package ? user.package : "none"}`,
    status: user.isValidated ? "Active" : "Pending",
  }));

  return (
    <div className="userList">
      <div className="col-md-4">
        <input
          className="form-control shadow-none"
          type="text"
          name="user"
          id=""
          placeholder="Search by email or ID"
          onChange={handleQuery}
        />
      </div>
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
