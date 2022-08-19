import Footer from "../../components/footer/Footer";
import GetStarted from "../../components/getStarted/GetStarted";
import "./packages.scss";

const Packages = () => {
  return (
    <div className="HomePackages">
      <div className="wrapper">
        <div className="first">
          <h1>Affordable plans to get you started</h1>
          <p>
            Start mining Pay-as-you-go. You only get to pay when your users use
            it. This is how we charge you as a business.
          </p>
        </div>
        <div className="second">
          <div className="package">
            <h3>Basic</h3>
            <p>#1,000/2$</p>
            <img src="assets/img/basic001.png" alt="" className="img-fluid" />
          </div>
          <div className="package">
            <h3>Regular</h3>
            <p>#2,000/4$</p>
            <img src="assets/img/basic002.png" alt="" className="img-fluid" />
          </div>
          <div className="package">
            <h3>Standard</h3>
            <p>#5,000/10$</p>
            <img src="assets/img/basic003.png" alt="" className="img-fluid" />
          </div>
          <div className="package">
            <h3>Professional</h3>
            <p>#10,000/20$</p>
            <img src="assets/img/basic004.png" alt="" className="img-fluid" />
          </div>
        </div>
      </div>
      <div>
        <GetStarted />
        <Footer />
      </div>
    </div>
  );
};

export default Packages;
