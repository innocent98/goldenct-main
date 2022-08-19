import "./topUpList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function TopUpList() {
  const [payments, setPayments] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(
        "/user/get-payments/?payment=" + query
      );
      setPayments(res.data);
    };
    fetchUser();
  }, [query, setPayments]);

  const columns = [
    { field: "uuid", headerName: "ID", width: 200 },
    { field: "reference", headerName: "Reference", width: 200 },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
  ];

  const reversed = [...payments].reverse();

  const rows = reversed.map((payment) => ({
    id: payment._id,
    uuid: payment.uuid,
    reference: payment.reference,
    amount: payment.amount,
  }));

  return (
    <div className="productList">
      <div className="col-md-4">
        <input
          className="form-control shadow-none"
          type="text"
          name="user"
          id=""
          placeholder="Search by reference no"
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
