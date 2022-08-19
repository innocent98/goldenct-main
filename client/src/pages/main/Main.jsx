import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import About from "../about/About";
import Faq from "../faq/Faq";
import Home from "../home/Home";
import Login from "../login/Login";
import Packages from "../packages/Packages";
import Register from "../register/Register";
import Work from "../work/Work";
import "./main.scss";

const Main = () => {
  const [home, setHome] = useState(true);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(false);
  const [about, setAbout] = useState(false);
  const [packages, setPackages] = useState(false);
  const [work, setWork] = useState(false);
  const [faq, setFaq] = useState(false);
  const [side, setSide] = useState(false);
  return (
    <div className="main">
      <div className="nav">
        <Navbar
          home={home}
          setHome={setHome}
          about={about}
          setAbout={setAbout}
          packages={packages}
          setPackages={setPackages}
          work={work}
          setWork={setWork}
          faq={faq}
          setFaq={setFaq}
          register={register}
          setRegister={setRegister}
          login={login}
          setLogin={setLogin}
          side={side}
          setSide={setSide}
        />
        <Sidebar
          home={home}
          setHome={setHome}
          about={about}
          setAbout={setAbout}
          packages={packages}
          setPackages={setPackages}
          work={work}
          setWork={setWork}
          faq={faq}
          setFaq={setFaq}
          register={register}
          setRegister={setRegister}
          login={login}
          setLogin={setLogin}
          side={side}
          setSide={setSide}
        />
      </div>
      <div
        className="home"
        style={home ? { display: "block" } : { display: "none" }}
      >
        <Home />
      </div>
      <div
        className="about"
        style={about ? { display: "block" } : { display: "none" }}
      >
        <About />
      </div>
      <div
        className="packages"
        style={packages ? { display: "block" } : { display: "none" }}
      >
        <Packages />
      </div>
      <div
        className="work"
        style={work ? { display: "block" } : { display: "none" }}
      >
        <Work />
      </div>
      <div
        className="faq"
        style={faq ? { display: "block" } : { display: "none" }}
      >
        <Faq />
      </div>
      <div
        className="register"
        style={register ? { display: "block" } : { display: "none" }}
      >
        <Register login={login} setLogin={setLogin} setRegister={setRegister} />
      </div>
      <div
        className="login"
        style={login ? { display: "block" } : { display: "none" }}
      >
        <Login />
      </div>
    </div>
  );
};

export default Main;
