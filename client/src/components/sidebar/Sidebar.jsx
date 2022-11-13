import "./sidebar.scss";

const Sidebar = ({
  home,
  setHome,
  about,
  setAbout,
  work,
  setWork,
  packages,
  setPackages,
  faq,
  setFaq,
  register,
  setRegister,
  login,
  setLogin,
  side,
  setSide,
}) => {
  const handleHome = (e) => {
    e.preventDefault();
    setHome(true);
    setAbout(false);
    setPackages(false);
    setWork(false);
    setFaq(false);
    setRegister(false);
    setLogin(false);
    setSide(false);
  };

  const handleAbout = (e) => {
    e.preventDefault();
    setAbout(true);
    setHome(false);
    setPackages(false);
    setWork(false);
    setFaq(false);
    setRegister(false);
    setLogin(false);
    setSide(false);
  };
  // const handlePackages = (e) => {
  //   e.preventDefault();
  //   setPackages(true);
  //   setWork(false);
  //   setFaq(false);
  //   setAbout(false);
  //   setHome(false);
  //   setRegister(false);
  //   setLogin(false);
  //   setSide(false);
  // };

  const handleWork = (e) => {
    e.preventDefault();
    setWork(true);
    setFaq(false);
    setPackages(false);
    setAbout(false);
    setHome(false);
    setRegister(false);
    setLogin(false);
    setSide(false);
  };

  const handleFaq = (e) => {
    e.preventDefault();
    setFaq(true);
    setWork(false);
    setPackages(false);
    setAbout(false);
    setHome(false);
    setRegister(false);
    setLogin(false);
    setSide(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegister(true);
    setHome(false);
    setAbout(false);
    setPackages(false);
    setWork(false);
    setFaq(false);
    setLogin(false);
    setSide(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLogin(true);
    setHome(false);
    setAbout(false);
    setPackages(false);
    setWork(false);
    setFaq(false);
    setRegister(false);
    setSide(false);
  };

  const handleSide = () => {
    setSide(false);
  };

  return (
    <div className={"sideMenu " + (side && "active")}>
      <div className="hambuger" onClick={handleSide}>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      <div className="left">
        <img src="assets/img/Logo.png" alt="" />
        <h4>GOLDENPAY</h4>
      </div>
      <div className="right">
        <ul>
          <li onClick={handleHome}>
            <a href="/" className={home ? "active" : "notActive"}>
              Home
            </a>
          </li>
          <li onClick={handleAbout}>
            <a href="/" className={about ? " active" : "notActive"}>
              About
            </a>
          </li>
          {/* <li onClick={handlePackages}>
            <a href="/" className={packages ? "active" : "notActive"}>
              Packages
            </a>
          </li> */}
          <li onClick={handleWork}>
            <a href="/" className={work ? "active" : "notActive"}>
              How it works
            </a>
          </li>
          <li onClick={handleFaq}>
            <a href="/" className={faq ? "active" : "notActive"}>
              FAQs
            </a>
          </li>
          <li onClick={handleLogin}>
            <a href="/" className={login ? "active" : "notActive"}>
              Login
            </a>
          </li>
          <hr />
          <li
            className={register ? "register" : "registerNotActive"}
            onClick={handleRegister}
          >
            <a href="/">Register</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
