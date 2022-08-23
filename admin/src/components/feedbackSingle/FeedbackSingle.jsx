import { useLocation } from "react-router-dom";
import "./feedbackSingle.css";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function FeedbackSingle() {
  const [job, setJob] = useState([]);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(
        `/task/uploaded-proof/find-all/${path}`
      );
      setJob(res.data);
    };
    fetchUser();
  }, [path]);

  const reversed = [...job].reverse();

  const columns = [
    {
      field: "picture",
      headerName: "Proof",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <a href={params.row.picture} className="link">
              View proof
            </a>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleApprove = async () => {
          try {
            await userRequest.put(`/task/approve-task-proof/${params.row.id}`, {
              isApproved: true,
            });
            return alert("You have successfully approved this proof");
          } catch (error) {
            return alert(error.response.data);
          }
        };

        const handleDecline = async () => {
          try {
            await userRequest.put(`/task/reject-task-proof/${params.row.id}`, {
              isApproved: true,
            });
            return alert("You have declined this proof");
          } catch (error) {
            return alert(error.response.data);
          }
        };
        return (
          <>
            <Link to={"/sponsored-job/" + params.row.id}>
              <button className="productListEdit" onClick={handleApprove}>
                {params.row.status === "Approved" ? "Approved" : "Approve"}
              </button>
            </Link>
            <Delete className="productListDelete" onClick={handleDecline} />
          </>
        );
      },
    },
  ];

  const rows = reversed.map((job) => ({
    id: job._id,
    picture: job.screenshot,
    status: job.isApproved ? "Approved" : "approve",
  }));

  return (
    <div className="productList">
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
