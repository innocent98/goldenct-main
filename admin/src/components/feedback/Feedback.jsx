import "./feedback.css";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
import dateFormat from "dateformat";

export default function Feedback() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await userRequest.get("/task/sponsored-job/all");
      setJobs(res.data);
    };
    fetchJobs();
  }, [query, setJobs]);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "jobTitle", headerName: "Job Title", width: 200 },
    {
      field: "jobTitle",
      headerName: "Reference",
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      width: 160,
    },
    {
      field: "applied",
      headerName: "Total Applied",
      width: 160,
      type: "number",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
      type: "number",
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/sponsored-job/" + params.row.id}>
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

  const reversed = [...jobs].reverse();

  const rows = reversed.map((job) => ({
    id: job._id,
    jobTitle: job.jobTitle,
    applied: job.applied,
    amount: `#${job.amount}`,
    date: dateFormat(job.createdAt, "mmmm dd yyyy"),
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
