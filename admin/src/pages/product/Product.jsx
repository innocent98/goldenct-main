import { useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";

export default function Product() {
  const [payment, setPayment] = useState({});

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchUser = async () => {
      const res = await userRequest.get(`/user/payment/get-proof/${path}`);
      setPayment(res.data);
    };
    fetchUser();
  }, [path,setPayment]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Payment</h1>
        {/* <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link> */}
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={payment.screenshot} alt="" className="productInfoImg" />
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">payment for:</span>
              <span className="productName">{payment.paymentFor}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{payment.uuid}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">reference:</span>
              <span className="productInfoValue">{payment.reference}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">amount:</span>
              <span className="productInfoValue">{payment.amount}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <span className="productInfoKey">payment for:</span>
            <span className="productName">{payment.paymentFor}</span>
            <label>
              Sender: <span className="productName"> {payment.uuid}</span>
            </label>
            <img src={payment.screenshot} alt="" className="productUploadImg" />
          </div>
        </form>
      </div>
    </div>
  );
}
