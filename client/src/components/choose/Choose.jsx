import "./choose.scss";

const Choose = () => {
  return (
    <div className="choose">
      <div className="top">
        <div className="first">
          <div className="icon">
            <span className="material-icons">signal_cellular_alt</span>
          </div>
          <div className="content">
            <h3>$30B</h3>
            <p>Digital Currency Exchanged</p>
          </div>
        </div>
        <div className="second">
          <div className="icon">
            <span className="material-icons">person</span>
          </div>
          <div className="content">
            <h3>10M+</h3>
            <p>Trusted Wallets Investor</p>
          </div>
        </div>
        <div className="third">
          <div className="icon">
            <span className="material-icons">public</span>
          </div>
          <div className="content">
            <h3>195</h3>
            <p>Countries Supported</p>
          </div>
        </div>
      </div>

      <div className="choose">
        <div className="left">
          <img src="assets/img/illustration.png" alt="" />
        </div>
        <div className="right">
          <h3>Why you should choose GOLDENCT</h3>
          <p>
            Experience the next generation cryptocurrency platform. No financial
            borders, extra fees, and fake reviews.
          </p>
          <a href="/">Learn more</a>
        </div>
      </div>

      <div className="earn">
        <div className="left">
          <h3>Earn Daily on GOLDENCT Today!</h3>
          <p>
            Earn up to 10% more when you do your daily task. Follow the steps to
            participate
          </p>
          <a href="/">Get Started</a>
        </div>
        <div className="right">
          <div className="container">
            <div className="left">
              <span className="material-icons">person_add_alt</span>
            </div>
            <div className="right">
              <h5>Create Your Account</h5>
              <p>Your account and personal identity are guaranteed safe.</p>
            </div>
          </div>
          <div className="container">
            <div className="left">
              <span className="material-icons">account_balance_wallet</span>
            </div>
            <div className="right">
              <h5>Connect Bank Account</h5>
              <p>Connect the bank account to start transactions.</p>
            </div>
          </div>
          <div className="container">
            <div className="left">
              <span className="material-icons">repartition</span>
            </div>
            <div className="right">
                <h5>Start Build Portfolio</h5>
                <p>Buy and sell your currencies and keep track of them.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choose;
