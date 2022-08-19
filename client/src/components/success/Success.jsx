import "./success.scss";

const Success = ({ login, setLogin, setRegister }) => {
  const handleSuccess = () => {
    // setLogin(true);
    // setRegister(false);
    window.location.reload();
  };
  return (
    <div
      className="success"
      style={login ? { display: "none" } : { display: "block" }}
    >
      <div className="container">
        <span class="material-icons done">check_circle</span>
        <h4>Success</h4>
        {/* <p>
        Your account has been verified successfully.
        </p> */}
        <button className="login" onClick={handleSuccess}>
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Success;
