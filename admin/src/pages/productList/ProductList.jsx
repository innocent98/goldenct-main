import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function ProductList() {
  // const [deletePop, setDeletePop] = useState(false)

  // const handleDelete = () => {
  //   setDeletePop(!deletePop)
  // }
  const columns = [
    { field: "uuid", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 250,
      editable: true,
    },
    {
      field: "package",
      headerName: "Package",
      width: 150,
      editable: true,
    },
    {
      field: "balance",
      headerName: "Balance",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "reward",
      headerName: "Reward Balance",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "referred",
      headerName: "Referred",
      type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.uuid}>
              <button className="userListEdit">Edit</button>
            </Link>
            <Delete
              className="userListDelete"
              // onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/user/agents-agent/?user=" + query);
      setUsers(res.data);
    };
    fetchUser();
  }, [query, setUsers]);

  const reversed = [...users].reverse();

  const rows = reversed.map((user) => ({
    id: user._id,
    uuid: user.uuid,
    package: user.agentPackage,
    user: user.email,
    balance: `#${user.agentWallet}`,
    reward: `#${user.reward}`,
    referred: user.referred.length
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
