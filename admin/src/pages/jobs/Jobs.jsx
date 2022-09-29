import "./jobs.css";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await userRequest.get(
        "/task/all-posted-jobs/?reference=" + query
      );
      setJobs(res.data);
    };
    fetchJobs();
  }, [query, setJobs]);

  // const handleDelete = (id) => {
  //   // setData(data.filter((item) => item.id !== id));
  // //the handle will be like onClick={()=>handleDelete(params.id)}
  // };

  const columns = [
    { field: "uuid", headerName: "ID", width: 200 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "jobTitle",
      headerName: "Reference",
      width: 200,
    },
    {
      field: "jobCat",
      headerName: "Job Cat",
      width: 160,
    },
    {
      field: "amount",
      headerName: "Amount Paid",
      width: 160,
      type: "number",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleDelete = async () => {
          await userRequest.delete(`/admin/delete-job/${params.row.uuid}`);
          window.location.reload();
          // setData(data.filter((item) => item.id !== id));
        };
        return (
          <>
            <Link to={"/job/" + params.row.id}>
              <button className="productListEdit">View</button>
            </Link>
            <Delete className="productListDelete" onClick={handleDelete} />
          </>
        );
      },
    },
  ];

  const reversed = [...jobs].reverse();

  const rows = reversed.map((job) => ({
    id: job._id,
    uuid: job.uuid,
    status: job.isApproved
      ? "Approved"
      : job.isDeclined
      ? "Declined"
      : "Pending",
    jobTitle: job.reference,
    jobCat: job.jobCat,
    amount: `#${job.totalPayable}`,
  }));

  return (
    <div className="productList">
      <div className="wrapper">
        <div className="col-md-4">
          <input
            className="form-control shadow-none"
            type="text"
            name="user"
            id=""
            placeholder="Search by reference"
            onChange={handleQuery}
          />
        </div>
        <Link to="/newProduct">
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
