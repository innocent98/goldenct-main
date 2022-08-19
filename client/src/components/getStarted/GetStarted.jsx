import "./getStarted.scss";

const GetStarted = ({register, setRegister}) => {
  return (
    <div className="getStarted">
      <div className="first">
        <h1>Lets get you started with GoldenCT today</h1>
        <p>
          Earn up to 10% more when you do your daily task. Follow the steps to
          participate
        </p>
        <a href="/register">Get Started for free</a>
      </div>
      <div className="second">
        <img src="assets/img/frame.png" className="img-fluid" alt="" />
      </div>
    </div>
  );
};

export default GetStarted;
