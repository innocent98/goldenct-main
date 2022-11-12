import "./feature.scss";

const Feature = () => {
  return (
    <div className="feature">
      <div className="top">
        <h4>Amazing Features</h4>
        <p>
          Explore sensational features to prepare your best investment in
          cryptocurrency
        </p>
      </div>

      <div className="cards">
        <div className="card">
          {/* <span className="material-icons">manage_history</span> */}
          <img src="assets/img/f1.png" alt="" className="img-fluid" />
          <h5>Manage Portfolio</h5>
          <p>
            Perform Micro task jobs and withdraw your money to any local bank account.
          </p>
        </div>
        <div className="card">
          {/* <span className="material-icons">verified_user</span> */}
          <img src="assets/img/f2.png" alt="" className="img-fluid" />
          <h5>Reliable & Quick Transactions</h5>
          <p>
            Reliable, Secured and quick transaction.
          </p>
        </div>
        <div className="card">
          {/* <span className="material-icons">currency_bitcoin</span> */}
          <img src="assets/img/f3.png" alt="" className="img-fluid" />
          <h5>Cryptocurrency Variety</h5>
          <p>
            Mine Golden Comfort Token
          </p>
        </div>
        <div className="card">
          {/* <span className="material-icons">accessible_forward</span> */}
          <img src="assets/img/f4.png" alt="" className="img-fluid" />
          <h5>Widespread accessibility & Usability</h5>
          <p>
            Easy to know how Golden Comfort Token works and friendly to newbie.
          </p>
        </div>
      </div>
      <div className="link">
        <a href="/">See Packages</a>
      </div>

      <div className="mining">
        <div className="left">
          <h4>Stay Updated</h4>
          <p>Join now with GOLDENPAY to get the latest news and start earning</p>
        </div>
        <div className="right">
            <form className="row g-3">
                <div className="col-md-4 input">
                    <input type="email" className="form-control shadow-none" placeholder="Enter your email" />
                </div>
                <div className="col-md-4 button">
                    <button className="submit-button">Subscribe</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Feature;
