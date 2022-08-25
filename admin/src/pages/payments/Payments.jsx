import "./payments.css";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(
        "/user/payment/get-proofs/?reference=" + query
      );
      setPayments(res.data);
    };
    fetchUser();
  }, [query, setPayments]);

  const columns = [
    { field: "uuid", headerName: "ID", width: 200 },
    { field: "reference", headerName: "Reference", width: 200 },
    {
      field: "paymentFor",
      headerName: "Payment For",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleDelete = async () => {
          try {
            const res = await userRequest.delete(
              `/user/payment/delete-proof/${params.row.id}`
            );
            window.location.reload();
            return alert(res.data);
          } catch (error) {
            return alert(error.response.data);
          }
        };
        return (
          <>
            <Link to={"/payment-proof/" + params.row.id}>
              <button className="productListEdit">View</button>
            </Link>
            <Delete className="productListDelete" onClick={handleDelete} />
          </>
        );
      },
    },
  ];

  const reversed = [...payments].reverse();

  const rows = reversed.map((payment) => ({
    id: payment._id,
    uuid: payment.uuid,
    reference: payment.reference,
    paymentFor: payment.paymentFor,
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
