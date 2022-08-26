import "./createPost.scss";
// import { useSelector } from "react-redux";
import {
  app,
  article,
  discord,
  facebook,
  instagram,
  onlineVote,
  snapchat,
  survey,
  telegram,
  tiktok,
  twitter,
  website,
  youtube,
  professional,
  whatsapp,
} from "../../../data";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useEffect, useState } from "react";
import storage from "../../../firebase";
import { userRequest } from "../../../requestMethod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [selected, setSelected] = useState("");
  let [data, setData] = useState([]);
  const [amount, setAmount] = useState("");
  const [picture, setPicture] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const [progress, setProgress] = useState(false);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  const newJob = {
    ...inputs,
    amount,
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const category = [
    {
      id: 1,
      cat: "App Micro-Task",
    },
    {
      id: 2,
      cat: "Article/Journal Micro-Task",
    },
    {
      id: 3,
      cat: "Discord Micro-Task",
    },
    {
      id: 4,
      cat: "Facebook Micro-Task",
    },
    {
      id: 5,
      cat: "Instagram Micro-Task",
    },
    {
      id: 6,
      cat: "Online voting Micro-Task",
    },
    {
      id: 7,
      cat: "Snapchat Micro-Task",
    },
    {
      id: 8,
      cat: "Survey Micro-Task",
    },
    {
      id: 9,
      cat: "Telegram Micro-Task",
    },
    {
      id: 10,
      cat: "Tiktok Micro-Task",
    },
    {
      id: 11,
      cat: "Twitter Micro-Task",
    },
    {
      id: 12,
      cat: "Website Micro-Task",
    },
    {
      id: 13,
      cat: "YouTube Micro-Task",
    },
    {
      id: 14,
      cat: "Professional Jobs",
    },
    {
      id: 15,
      cat: "Whatsapp Micro-Task",
    },
  ];

  useEffect(() => {
    const fetch = async () => {
      switch (selected) {
        case 1:
          setData(app);
          break;
        case 2:
          setData(article);
          break;
        case 3:
          setData(discord);
          break;
        case 4:
          setData(facebook);
          break;
        case 5:
          setData(instagram);
          break;
        case 6:
          setData(onlineVote);
          break;
        case 7:
          setData(snapchat);
          break;
        case 8:
          setData(survey);
          break;
        case 9:
          setData(telegram);
          break;
        case 10:
          setData(tiktok);
          break;
        case 11:
          setData(twitter);
          break;
        case 12:
          setData(website);
          break;
        case 13:
          setData(youtube);
          break;
        case 14:
          setData(professional);
          break;
        case 15:
          setData(whatsapp);
          break;
        default:
          break;
      }
    };
    fetch();
  }, [selected]);

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/goldenct-jobs/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "picture" && setProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    picture && uploadFile(picture, "picture");
  }, [picture]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await userRequest.post("/task/job", newJob);
      // setJobId(res.data._id);
      setProcessing(false);
      // setSuccess(true);
      navigate("/");
      return alert("Job posted successfully.");
    } catch (error) {
      setProcessing(false);
      return toast.error(error.response.data);
    }
  };

  return (
    <div className="createPost">
      <ToastContainer position="top-center" reverseOrder={false} />

      <form className="row g-3" onSubmit={handleSubmit}>
        <h1>
          Create Jobs{" "}
          <span>
            <a href="/fund-account">Fund Account</a>
          </span>
        </h1>
        <div className="wrapper">
          <section>
            {" "}
            <div className="col-md-3">
              <label htmlFor="title" className="form-label form-label-sm">
                Job Title
              </label>
              <input
                type="text"
                className="form-control form-control-sm shadow-none"
                name="jobTitle"
                required
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="link" className="form-label form-label-sm">
                Job Link
              </label>
              <input
                type="text"
                className="form-control form-control-sm shadow-none"
                name="jobLink"
                required
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="workers" className="form-label form-label-sm">
                No of Workers Needed
              </label>
              <input
                type="number"
                className="form-control form-control-sm shadow-none"
                name="workers"
                required
                onChange={handleChange}
              />
            </div>
          </section>
          <section>
            <br />
            <div className="col-md-3">
              <p className="check-form-label">Job category</p>
            </div>
            <div className="col-md-3 check">
              {category.map((c) => (
                <div className="check-items" key={c.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="jobCat"
                    id=""
                    value={c.cat}
                    onClick={() => setSelected(c.id)}
                    key={c.id}
                    required
                    onChange={handleChange}
                  />
                  <label htmlFor="jobCat" className="form-label form-label-sm">
                    {c.cat}
                  </label>
                </div>
              ))}
            </div>
            <br />
            <div className="col-md-3">
              <p className="check-form-label">Job sub category</p>
            </div>
            <div className="col-md-3 check">
              {data.map((d) => (
                <div className="check-items" key={d.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="jobSubCat"
                    id=""
                    value={d.title}
                    onClick={() => setAmount(d.price)}
                    key={d.id}
                    required
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="jobSubCat"
                    className="form-label form-label-sm"
                  >
                    {d.title}
                  </label>
                </div>
              ))}
            </div>
            <div
              className="col-md-3"
              style={amount > 0 ? { display: "block" } : { display: "none" }}
            >
              <label htmlFor="amount" className="form-label form-label-sm">
                Amount
              </label>
              <input
                type="number"
                className="form-control form-control-sm shadow-none"
                name="amount"
                defaultValue={amount}
                min={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <label htmlFor="amountAlert" style={{ color: "#FFC745" }}>
                Amount can be set higher than initial amount set to attract
                workers and enable job done quicker
              </label>
            </div>
            <div className="col-md-3">
              <label htmlFor="picture" className="form-label form-label-sm">
                File (Optional)
              </label>
              <input
                type="file"
                className="form-control form-control-sm shadow-none"
                name="picture"
                onChange={(e) => setPicture(e.target.files[0])}
              />
              {progress && `${progress}%`}
            </div>
            <div className="col-md-3">
              <label htmlFor="desc" className="form-label form-label-sm">
                Job Description
              </label>
              <textarea
                type="text"
                className="form-control form-control-sm shadow-none"
                name="jobDesc"
                required
                minLength={10}
                onChange={handleChange}
              />
              <label htmlFor="descAlert" style={{ color: "#FFC745" }}>
                Characters should not be more than 100
              </label>
            </div>
          </section>
        </div>
        <div className="col-md-9">
          <button className="submit-button" type="submit" disabled={processing}>
            {processing ? "Please wait..." : "SUBMIT"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
