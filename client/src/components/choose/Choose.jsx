import { useEffect, useState } from "react";
import "./choose.scss";

const slideImg = [
  {
    id: 1,
    img: "assets/img/slide1.png",
  },
  {
    id: 2,
    img: "assets/img/slide2.png",
  },
  {
    id: 3,
    img: "assets/img/slide3.png",
  },
  {
    id: 4,
    img: "assets/img/slide4.png",
  },
];

const Choose = () => {
  const [slider, setSlider] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlider(slider < slideImg.length - 1 ? slider + 1 : 0);
    }, 3000);
    return () => clearInterval(interval);
  });
  return (
    <div className="choose">
      <div className="top">
        {slideImg.map((slide) => (
          <img
            src={slide.img}
            alt=""
            style={{
              transform: `translateX(${slider * -100}%)`,
            }}
            slider={slider}
            className="img-fluid"
          />
        ))}
        {/* <div className="first">
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
        </div> */}
      </div>

      <div className="who">
        <div className="left">
          <img src="assets/img/second.png" alt="" className="secondImg" />
          <img src="assets/img/polygon.png" alt="" className="polygon" />
        </div>
        <div className="right">
          <h3>WHO WE ARE?</h3>
          <p>
            Golden Comfort Technologies Ltd is a fast growing Africa number one
            community based pojects that embaces a comfot living system for
            humanity.
          </p>
          <a href="/">Learn more</a>
        </div>
      </div>

      <div className="choose">
        {/* <div className="left">
          <img src="assets/img/illustration.png" alt="" />
        </div> */}
        <div className="right">
          <h3>WHY CHOOSE US?</h3>
          <p>
            Here is a home of digital jobs where people across the globe comes
            together to complete jobs, hire workers and promote ideals. Your
            membership grants you access to earn passive income daily as a
            Micro-worker/influencer and also to mine Golden Comfort Token.
          </p>
          <a href="/">Learn more</a>
        </div>
      </div>

      <div className="earn">
        <div className="left">
          <h3>START EARNING ON MYGOLDENPAY TODAY!</h3>
          <p>
            Become a member and start earning daily by performing micro jobs and
            professional jobs. Follow the steps to participate
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
