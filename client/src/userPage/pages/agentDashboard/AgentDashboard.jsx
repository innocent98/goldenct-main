import "./agentDashboard.scss"

const AgentDashboard = () => {
  return (
    <div className="agentDashboard">
        <div className="left">
        <div className="wallet">
          <div className="title">Wallet Balance</div>
          <h2>#2,000,000</h2>
        </div>
        <div className="transaction">
          <div className="transactionLeft">
            <div className="history">Transaction History</div>
            <div className="transactionHistory">
              <div className="date">22 May 2022</div>
              <div className="content">
                <img src="assets/img/Logow.png" alt="" />
                <div className="cont">
                  <div className="name">Gold Package</div>
                  <div className="time">01:52PM</div>
                </div>
              </div>
            </div>
            <div className="transactionHistory">
              <div className="date">22 May 2022</div>
              <div className="content">
                <img src="assets/img/Logow.png" alt="" />
                <div className="cont">
                  <div className="name">Gold Package</div>
                  <div className="time">01:52PM</div>
                </div>
              </div>
            </div>
            <div className="transactionHistory">
              <div className="date">22 May 2022</div>
              <div className="content">
                <img src="assets/img/Logow.png" alt="" />
                <div className="cont">
                  <div className="name">Gold Package</div>
                  <div className="time">01:52PM</div>
                </div>
              </div>
            </div>
            <div className="transactionHistory">
              <div className="date">22 May 2022</div>
              <div className="content">
                <img src="assets/img/Logow.png" alt="" />
                <div className="cont">
                  <div className="name">Gold Package</div>
                  <div className="time">01:52PM</div>
                </div>
              </div>
            </div>
          </div>
          <div className="transactionRight">
            <a href="/" className="view">
              View all
            </a>
            <div className="amount">#12,500</div>
            <div className="amount">#12,500</div>
            <div className="amount">#12,500</div>
            <div className="amount">#12,500</div>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="first"></div>
        <div className="cardContainer">
          <div className="cardContainerLeft">
            <img src="assets/img/Logo.png" alt="" />
            <h3>**** 8962</h3>
            <p>SAVIOUR INYANG</p>
          </div>
          <div className="cardContainerRight">
            <img src="assets/img/comm.png" alt="" />
            <span className="material-icons">qr_code_2</span>
            <h3>GOLD</h3>
          </div>
        </div>
        <div className="second">
          <div className="upgrade">
            <div className="upgradeLeft">Upgrade your account to PREMIUM</div>
            <div className="upgradeRight">
              <a href="/">
                <span className="material-icons">arrow_circle_right</span>
              </a>
            </div>
          </div>
          <p>Start mining higher to increase your earning power</p>
          <img src="assets/img/undraw.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard