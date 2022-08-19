import "./identities.css";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function Identities() {
  const [identities, setIdentities] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get("/user/identities/?user=" + query);
      setIdentities(res.data);
    };
    fetchUser();
  }, [query, setIdentities]);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "uuid", headerName: "User", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/identity-single/" + params.row.id}>
              <button className="productListEdit">View</button>
            </Link>
            <Delete
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const rows = identities.map((identity) => ({
    id: identity._id,
    uuid: identity.uuid,
    status: identity.isApproved ? "Approved" : identity.isDeclined ? "Declined" : "Pending",
  }));

  return (
    <div className="productList">
      <div className="col-md-4">
        <input
          className="form-control shadow-none"
          type="text"
          name="user"
          id=""
          placeholder="Search by user"
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
