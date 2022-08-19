import "./agentPackage.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function AgentPackage() {
  const [packages, setPackages] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchPackages = async () => {
      const res = await userRequest.get(
        "/user/agents-packages/?reference=" + query
      );
      setPackages(res.data);
    };
    fetchPackages();
  }, [query, setPackages]);

  const columns = [
    { field: "uuid", headerName: "ID", width: 200 },
    {
      field: "reference",
      headerName: "Reference",
      width: 160,
    },
    {
      field: "userPackage",
      headerName: "Package",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Cost",
      width: 160,
      type: "number",
    },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleApprove = async () => {
          try {
            await userRequest.put(
              `/admin/approve-agent/user/${params.row.id}`,
              {
                isApproved: true,
              }
            );
            return alert("You have successfully approve this user's package");
          } catch (error) {
            return alert(error.response.data);
          }
        };
        return (
          <>
            <Link>
              <button
                className={
                  "productListEdit " +
                  (params.row.status === "Approved" && "approved")
                }
                onClick={handleApprove}
                disabled={params.row.status === "Approved"}
              >
                {params.row.status === "Approved" ? "Approved" : "Approve"}
              </button>
            </Link>
            {/* <Link>
              <button className="productListDelete">Reject</button>
            </Link> */}
          </>
        );
      },
    },
  ];

  const reversed = [...packages].reverse();

  const rows = reversed.map((p) => ({
    id: p._id,
    uuid: p.uuid,
    reference: p.reference,
    userPackage: p.agentPackage,
    status: p.isApproved ? "Approved" : "Pending",
    amount: `${p.amount}`,
  }));

  return (
    <div className="productList">
      <div className="col-md-4">
        <input
          className="form-control shadow-none"
          type="text"
          name="user"
          id=""
          placeholder="Search by reference or ID"
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
