import "./intro.scss";

const Intro = () => {
  return (
    <div className="intro">
      <div className="left">
        <h2>HOME OF GLOBAL DIGITAL JOBS AND PASSIVE INCOME SYSTEM</h2>
        <img src="assets/img/first.png" alt="" className="rightImg img-fluid" />
        <p>
          Earn steady daily income by performing social media tasks and professinal high skill jobs.
        </p>
        <a href="/register">Get started today! <span><img src="assets/img/arrowRight.png" alt="" /></span></a>
      </div>
      <div className="right">
        <img src="assets/img/first.png" alt="" className="rightImg img-fluid" />
        <img src="assets/img/polygon.png" alt="" className="polygon" />
      </div>
    </div>
  );
};

export default Intro;
