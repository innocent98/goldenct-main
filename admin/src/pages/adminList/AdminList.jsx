import "./adminList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/apiCalls";
import jwt_decode from "jwt-decode";

export default function AdminList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/admin/admins");
      setUsers(res.data);
    };
    fetchUser();
  }, []);

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
      field: "role",
      headerName: "Role",
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const handleDelete = async (e) => {
          e.preventDefault();
          try {
            const res = await userRequest.delete(
              `/admin/delete-admin/${params.row.id}`
            );
            setUsers(users.filter((item) => item._id !== params.row.id));
            return alert(res.data);
          } catch (error) {
            return alert(error.response.data);
          }
        };
        return (
          <>
            {/* <Link to={"/user/" + params.row.uuid}>
              <button className="userListEdit">Edit</button>
            </Link> */}
            <Delete className="userListDelete" onClick={handleDelete} />
          </>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    uuid: user.uuid,
    user: user.lastName + " " + user.firstName,
    email: user.email,
    role: user.role,
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
      <div className="wrapper">
        <div className="col-md-4">
          <input
            className="form-control shadow-none"
            type="text"
            name="user"
            id=""
            placeholder="Search by email"
          />
        </div>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
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
