import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/apiCalls";
import jwt_decode from "jwt-decode";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/user/users/?user=" + query);
      setUsers(res.data);
    };
    fetchUser();
  }, [query, setUsers]);

  // const handleDelete = (id) => {
  //   // setData(data.filter((item) => item.id !== id));
  // };

  const columns = [
    { field: "uuid", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
    },
    {
      field: "package",
      headerName: "Package",
      width: 150,
      editable: true,
    },
    {
      field: "wallet",
      headerName: "Wallet",
      type: "number",
      width: 150,
      editable: true,
    },
    {
      field: "mine",
      headerName: "Mine",
      type: "number",
      width: 150,
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

  const reversed = [...users].reverse();

  const rows = reversed.slice().map((user) => ({
    id: user._id,
    uuid: user.uuid,
    user: user.username,
    email: user.email,
    status: user.isLoggedout
      ? "Disabled"
      : user.isValidated
      ? "Active"
      : "Pending",
    package: user.package,
    wallet: `#${user.taskWallet}`,
    mine: `${user.mineWallet}GCT`,
  }));

  // automatically logout a user when session expires
  const userA = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    userLogout(dispatch);
  };

  useEffect(() => {
    const token = userA.accessToken;
    if (token) {
      const decodedToken = jwt_decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
        return alert("Session expired! kindly login again to continue");
      }
    }
  });

  return (
    <div className="userList">
      <div className="col-md-4">
        <input
          className="form-control shadow-none"
          type="text"
          name="user"
          id=""
          placeholder="Search by username or ID"
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
