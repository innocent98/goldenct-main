import { useState } from "react";
import Footer from "../../components/footer/Footer";
import GetStarted from "../../components/getStarted/GetStarted";
import Mission from "../../components/mission/Mission";
import Unique from "../../components/unique/Unique";
import "./about.scss";

const About = () => {
  const [read, setRead] = useState(false);
  return (
    <div className="about">
      <div className="who">
        <h1>Who we are</h1>
        <p>
          Golden Comfort Technologies Ltd is a fast growing Africa number one
          community based project that embraces a comfort living system for
          humanity. We operate a standard way by which African and all
          continents can use blockchain technology to practice a stress less
          day-to-day activities within our ecosystem.
        </p>
        <a href="#unique" className="readMore" onClick={() => setRead(true)}>
          Read More
        </a>
      </div>
      <Mission />
      <div style={read ? {display: "block"} : {display: "none"}} id="unique">
        <Unique />
      </div>
      <GetStarted />
      <Footer />
    </div>
  );
};

export default About;
