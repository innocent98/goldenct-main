import "./error.scss";

const Error = () => {
  return (
    <div className="error">
      <div className="container">
        <span className="material-icons cancel">highlight_off</span>
        <h4>Unable to Complete</h4>
        <p>
         Unexpected error occured, please try again
        </p>
        <a href="/" className="contact">
          Contact Support
        </a>
        <a href="/" className="try">
          TRY AGAIN
        </a>
      </div>
    </div>
  );
};

export default Error;
