import { useState } from "react";
import "./userFaq.scss";

const UserFaq = ({
  setPackages,
  setDashboard,
  setAAgent,
  setMine,
  setTask,
  setWWithdraw,
  setFaqs,
  setSettings,
}) => {
  setFaqs(true);
  setDashboard(false);
  setPackages(false);
  setAAgent(false);
  setMine(false);
  setTask(false);
  setWWithdraw(false);
  setSettings(false);

  const [golden, setGolden] = useState(false);
  const [miner, setMiner] = useState(false);
  const [goct, setGoct] = useState(false);
  const [lpims, setLpims] = useState(false);
  const [dims, setDims] = useState(false);
  const [withdraw, setWithdraw] = useState(false);
  const [currency, setCurrency] = useState(false);
  const [children, setChildren] = useState(false);
  const [minimum, setMinimum] = useState(false);
  const [time, setTime] = useState(false);
  const [agent, setAgent] = useState(false);
  const [upgrade, setUpgrade] = useState(false);
  const [multiple, setMultiple] = useState(false);
  return (
    <div className="userFaq">
      <h1>Frequently Asked Questions</h1>
      <p>
        When you know more, you earn more. Learn about how it works and
        kickstart into mining.
      </p>
      <div className="questions">
        <div className="row">
          <div className="card">
            <h2 onClick={() => setGolden(!golden)}>
              <span className="material-icons">
                {golden ? "remove" : "add"}
              </span>
              What is GoldenCT?
            </h2>
            <p style={golden ? { display: "block" } : { display: "none" }}>
              GoldenCT means Golden Comfort Technologies, a fast growing Africa
              number one community based project that embraces a comfort living
              system for humanity.
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setMiner(!miner)}>
              <span className="material-icons">{miner ? "remove" : "add"}</span>
              What is Golden-Miner?
            </h2>
            <p style={miner ? { display: "block" } : { display: "none" }}>
              Golden Miners is one of the Business Models of Golden Comfort
              Technologies, it allows you to mine GOCT and earn daily income.
              i.e it operate on Lifetime Passive Income Mining System (LPIMs)
              and Daily Income Micro-Tasks System (DIMs).
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setGoct(!goct)}>
              <span className="material-icons">{goct ? "remove" : "add"}</span>
              What is GOCT?
            </h2>
            <p style={goct ? { display: "block" } : { display: "none" }}>
              {" "}
              It means Golden Comfort Token; this is the native currency of
              GoldenCT and it will be used across all the ecosystem of the
              company.
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setLpims(!lpims)}>
              <span className="material-icons">{lpims ? "remove" : "add"}</span>
              What is LPIMs?
            </h2>
            <p style={lpims ? { display: "block" } : { display: "none" }}>
              Lifetime Passive Income Mining System.
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setDims(!dims)}>
              <span className="material-icons">{dims ? "remove" : "add"}</span>
              What is DIMs?
            </h2>
            <p style={dims ? { display: "block" } : { display: "none" }}>
              Daily Income Micro-Tasks System.
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setWithdraw(!withdraw)}>
              <span className="material-icons">
                {withdraw ? "remove" : "add"}
              </span>
              When will I be able to withdraw GOCT?
            </h2>
            <p style={withdraw ? { display: "block" } : { display: "none" }}>
              After one year
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setCurrency(!currency)}>
              <span className="material-icons">
                {currency ? "remove" : "add"}
              </span>
              Can I convert GOCT to any currency?{" "}
            </h2>
            <p style={currency ? { display: "block" } : { display: "none" }}>
              Yes
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setChildren(!children)}>
              <span className="material-icons">
                {children ? "remove" : "add"}
              </span>
              When can I withdraw 20% saved for my children?
            </h2>
            <p style={children ? { display: "block" } : { display: "none" }}>
              After five years
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setMinimum(!minimum)}>
              <span className="material-icons">
                {minimum ? "remove" : "add"}
              </span>
              How much is the minimum withdraw on DIMs?
            </h2>
            <p style={minimum ? { display: "block" } : { display: "none" }}>
              {" "}
              $2/#1,000
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setTime(!time)}>
              <span className="material-icons">{time ? "remove" : "add"}</span>
              When can I withdraw my DIMs?
            </h2>
            <p style={time ? { display: "block" } : { display: "none" }}>
              {" "}
              At your convenient time
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setAgent(!agent)}>
              <span className="material-icons">{agent ? "remove" : "add"}</span>
              Who is an agent?
            </h2>
            <p style={agent ? { display: "block" } : { display: "none" }}>
              A person who activate user account
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setUpgrade(!upgrade)}>
              <span className="material-icons">
                {upgrade ? "remove" : "add"}
              </span>
              Can I upgrade my account?
            </h2>
            <p style={upgrade ? { display: "block" } : { display: "none" }}>
              Yes
            </p>
          </div>
          <div className="card">
            <h2 onClick={() => setMultiple(!multiple)}>
              <span className="material-icons">
                {multiple ? "remove" : "add"}
              </span>
              Can I have a multiple account?
            </h2>
            <p style={multiple ? { display: "block" } : { display: "none" }}>
              No, multiple account is not allowed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFaq;
