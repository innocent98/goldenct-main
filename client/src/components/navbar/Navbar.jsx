import "./navbar.scss";

const Navbar = ({
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
  };
  const handlePackages = (e) => {
    e.preventDefault();
    setPackages(true);
    setWork(false);
    setFaq(false);
    setAbout(false);
    setHome(false);
    setRegister(false);
    setLogin(false);
  };

  const handleWork = (e) => {
    e.preventDefault();
    setWork(true);
    setFaq(false);
    setPackages(false);
    setAbout(false);
    setHome(false);
    setRegister(false);
    setLogin(false);
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
  };

  const handleSide = () => {
    setSide(true)
  }

  return (
    <div className="navbar">
      <div className="left">
        <img src="assets/img/Logo.png" alt="" />
        <h4>GOLDENCT</h4>
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
          <li onClick={handlePackages}>
            <a href="/" className={packages ? "active" : "notActive"}>
              Packages
            </a>
          </li>
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
      <div className="hambuger" onClick={handleSide}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
    </div>
    </div>
  );
};

export default Navbar;
