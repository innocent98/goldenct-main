import "./withdrawnList.css";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function WithdrawnList() {
  const [withdrawn, setWithdrawn] = useState([]);
  const [query, setQuery] = useState("");

  const handleQuery = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(
        "/user/get-withdrawn/?withdrawn=" + query
      );
      setWithdrawn(res.data);
    };
    fetchUser();
  }, [query, setWithdrawn]);

  const columns = [
    { field: "uuid", headerName: "ID", width: 200 },
    { field: "reference", headerName: "Reference", width: 200 },
    {
      field: "bank",
      headerName: "Bank",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
    {
      field: "withdrawable",
      headerName: "Withdrawable Amount",
      width: 160,
    },
    {
      field: "accountNumber",
      headerName: "Account Number",
      width: 160,
    },
    {
      field: "accountName",
      headerName: "Account Name",
      width: 160,
    },
    {
      field: "account",
      headerName: "Account",
      width: 160,
    },
    {
      field: "remark",
      headerName: "Remark",
      width: 160,
    },
    {
      field: "status",
      headerName: "Payout",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        const handleApprove = async () => {
          try {
            await userRequest.put(`/admin/pay/${params.row.id}`, {
              isPaid: true,
            });
            return alert("Paid out");
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
                  (params.row.status === "Paid" && "approved")
                }
                onClick={handleApprove}
                disabled={params.row.status === "Paid"}
              >
                {params.row.status === "Paid" ? "Paid" : "Mark paid"}
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

  const reversed = [...withdrawn].reverse();

  const rows = reversed.map((payment) => ({
    id: payment._id,
    uuid: payment.uuid,
    reference: payment.reference,
    bank: payment.bank,
    amount: payment.amount,
    withdrawable: payment.withdrawableAmount,
    accountNumber: payment.accountNumber,
    accountName: payment.accountName,
    account: payment.account,
    remark: payment.remark,
    status: payment.isPaid ? "Paid" : "Pending",
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
