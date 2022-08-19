import { useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../../requestMethod";
import AccountDetails from "../../components/accountDetails/AccountDetails";
// import { Toaster, toast } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./packages.scss";

const Packages = ({ packages }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [validUserId, setValidUserId] = useState("");
  const [userPackage, setUserPackage] = useState("");
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(false);

  const newPackage = { userId: user._id, userPackage, amount };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      const res = await userRequest.post("/user/subscribe", newPackage);
      setValidUserId(res.data._id);
      setSuccess(true);
      setProgress(false);
    } catch (error) {
      setProgress(false);
      toast.error(error.response.data);
    }
  };

  const handleUpgrade = async (e) => {
    e.preventDefault();
    setProgress(true);
    try {
      const res = await userRequest.post("/user/upgrade", newPackage);
      setValidUserId(res.data._id);
      setSuccess(true);
      setProgress(false);
    } catch (error) {
      setProgress(false);
      toast.error(error.response.data);
    }
  };

  return (
    <div className={packages ? "userPackages" : "none"}>
      <ToastContainer position="top-center" reverseOrder={false} />
      <div className={success ? "account" : "none"}>
        <AccountDetails validUserId={validUserId} />
      </div>
      <div className={success ? "none" : "packageLeft"}>
        <h2>Packages</h2>
        <p>
          Note that mining is done every 24 hours. CL stands for Cent Lifetime,
          DL stands for Daily Lifetime and ML stands for Monthly Lifetime. You
          can also buy from an agent and get your account validated.
        </p>
        {user.isValidated ? (
          <div className="packageSelect">
            <div className="row">
              <div className="col head">Package Name</div>
              <div className="col head">Price (#/$)</div>
              <div className="col head">Subscribe</div>
            </div>
            <div className="form">
              <form className="row" onSubmit={handleUpgrade}>
                <input type="text" value="Basic" readOnly className="col" />
                <div className="col">#1,000/ $2</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("basic") || setAmount("#1,000/ $2")
                    }
                  >
                    Upgrade
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">250GCT (CL)</div>
                <div className="col">
                  {/* <button onClick={handleOption}>Buy</button> */}
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">7500GCT (ML)</div>
                <div className="col">
                  {/* <button onClick={handleOption}>Buy</button> */}
                </div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleUpgrade}>
                <input type="text" value="Regular" readOnly className="col" />
                <div className="col">#2,000/$4</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("regular") || setAmount("#2,000/ $4")
                    }
                  >
                    Upgrade
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">500GCT (DL)</div>
                <div className="col">
                  {/* <button onClick={handleOption}>Buy</button> */}
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">15000GCT (ML)</div>
                <div className="col">
                  {/* <button onClick={handleOption}>Buy</button> */}
                </div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleUpgrade}>
                <input type="text" value="Standard" readOnly className="col" />
                <div className="col">#5,000/$10</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("standard") || setAmount("#5,000/$10")
                    }
                  >
                    Upgrade
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">1250GCT (DL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">37500GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleUpgrade}>
                <input
                  type="text"
                  value="Professional"
                  readOnly
                  className="col"
                />
                <div className="col">#10,000/$20</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("professional") || setAmount("#10,000/$20")
                    }
                  >
                    Upgrade
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">2500GCT (DL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">75000GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleUpgrade}>
                <input type="text" value="Silver" readOnly className="col" />
                <div className="col">#20,000/$40</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("silver") || setAmount("#20,000/$40")
                    }
                  >
                    Upgrade
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">5000GCT (DL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">150000GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleUpgrade}>
                <input type="text" value="Gold" readOnly className="col" />
                <div className="col">#50,000/$100</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("gold") || setAmount("#50,000/$100")
                    }
                  >
                    Upgrade
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">12500GCT (DL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">375000GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
          </div>
        ) : (
          <div className="packageSelect">
            <div className="row">
              <div className="col head">Package Name</div>
              <div className="col head">Price (#/$)</div>
              <div className="col head">Subscribe</div>
            </div>
            <div className="form">
              <form className="row" onSubmit={handleSubmit}>
                <input type="text" value="Basic" readOnly className="col" />
                <div className="col">#1,000/ $2</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("basic") || setAmount("#1,000/ $2")
                    }
                  >
                    Buy
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">250GCT (CL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">7500GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleSubmit}>
                <input type="text" value="Regular" readOnly className="col" />
                <div className="col">#2,000/$4</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("regular") || setAmount("#2,000/ $4")
                    }
                  >
                    Buy
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">500GCT (DL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">15000GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleSubmit}>
                <input type="text" value="Standard" readOnly className="col" />
                <div className="col">#5,000/$10</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("standard") || setAmount("#5,000/$10")
                    }
                  >
                    Buy
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">1250GCT (DL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">37500GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value="Professional"
                  readOnly
                  className="col"
                />
                <div className="col">#10,000/$20</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("professional") || setAmount("#10,000/$20")
                    }
                  >
                    Buy
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">2500GCT (DL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">75000GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleSubmit}>
                <input type="text" value="Silver" readOnly className="col" />
                <div className="col">#20,000/$40</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("silver") || setAmount("#20,000/$40")
                    }
                  >
                    Buy
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">5000GCT (DL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">150000GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
            <hr />
            <div className="form">
              <form className="row" onSubmit={handleSubmit}>
                <input type="text" value="Gold" readOnly className="col" />
                <div className="col">#50,000/$100</div>
                <div className="col">
                  <button
                    disabled={progress}
                    onClick={() =>
                      setUserPackage("gold") || setAmount("#50,000/$100")
                    }
                  >
                    Buy
                  </button>
                </div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">12500GCT (DL)</div>
                <div className="col"></div>
              </form>
              <form className="row">
                <div className="col"></div>
                <div className="col">375000GCT (ML)</div>
                <div className="col"></div>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className={success ? "none" : "packageRight"}>
        {/* <h2>Find an agent near you</h2>
        <form className="row g-3">
          <div className="col-md-3">
            <select name="country" id="" className="form-select shadow-none">
              <option value="nigeria">Nigeria</option>
            </select>
          </div>
          <div className="col-md-3">
            <select name="country" id="" className="form-select shadow-none">
              <option value="nigeria">Nigeria</option>
            </select>
          </div>
          <div className="col-md-3">
            <button>Search</button>
          </div>
        </form> */}

        <img src="assets/img/happy.png" className="img-fluid" alt="" />
      </div>
    </div>
  );
};

export default Packages;
