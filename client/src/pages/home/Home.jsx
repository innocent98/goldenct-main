import "./home.scss";
import Intro from "../../components/intro/Intro";
import Choose from "../../components/choose/Choose";
import Feature from "../../components/feature/Feature";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Intro />
      <Choose />
      <Feature />
      <Footer />
    </div>
  );
};

export default Home;
