import "./footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="team">
        <div className="left">
          <h2>OUR TEAM</h2>
          <img
            src="assets/img/team.png"
            alt=""
            className="rightImg img-fluid"
          />
          <p>
            We’re a team of resilient, forward -thinking and ambitious
            individuals who believe in enabling comfort living system and easier
            payments across businesses.
          </p>
          <a href="/">
            Learn more
            <span>
              <img src="assets/img/arrowRight.png" alt="" />
            </span>
          </a>
        </div>
        <div className="right">
          <img
            src="assets/img/team.png"
            alt=""
            className="rightImg img-fluid"
          />
          <img src="assets/img/polygon.png" alt="" className="polygon" />
        </div>
      </div>

      <hr style={{ color: "white" }} />

      <div className="top">
        <div className="first">
          <div className="logo">
            <img src="assets/img/Logo.png" alt="" />
            <span>GOLDENCT</span>
          </div>
          <div className="social">
            <a href="https://www.facebook.com/goldencomforttech">
              <img src="assets/img/facebook-f.png" alt="" />
            </a>
            <a href="https://www.instagram.com/goldencomforttech?r=nametag">
              <img src="assets/img/instagram.png" alt="" />
            </a>
            <a href="/">
              <img src="assets/img/youtube.png" alt="" />
            </a>
            <a href="/">
              <img src="assets/img/twitter.png" alt="" />
            </a>
            <a href="https://t.me/GoldenCT">
              <img src="assets/img/telegram.png" alt="" />
            </a>
            <a href="https://www.linkedin.com/company/golden-comfort-tech">
              <img src="assets/img/linkedIn.png" alt="" />
            </a>
          </div>
        </div>
        <div className="extra-links">
          <h4>CONTACT US</h4>
          <ul>
            <li>
              <a href="tel:2349013348385">+2349013348385</a>
            </li>
            <li>
              <a href="tel:2348179947502">+2348179947502</a>
            </li>
          </ul>
        </div>
        <div className="extra-links">
          <h4>MENU</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">About</a>
            </li>
            <li>
              <a href="/">Packages</a>
            </li>
          </ul>
        </div>
        <div className="extra-links">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="mailto:goldencomforttech@gmail.com">Help Center</a>
            </li>
            <li>
              <a href="mailto:goldenjobsreport@gmail.com">Job Related</a>
            </li>
            <li>
              <a href="/">Disclaimer</a>
            </li>
            <li>
              <a href="/">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
      <hr style={{ color: "white" }} />
      <div className="down">
        <div className="left">©2022 GOLDENCT. All rights reserved</div>
        <div className="right">
          <ul>
            <li>
              <a href="/">Terms of Use</a>
            </li>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
