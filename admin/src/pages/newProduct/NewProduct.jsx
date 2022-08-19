import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { userRequest } from "../../requestMethod";
import storage from "../../firebase";
import "./newProduct.css";

export default function NewProduct() {
  const [processing, setProcessing] = useState(false);
  const [picture, setPicture] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file, urlType) => {
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `/goldenct-sponsored-job/${fileName}`);
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
      await userRequest.post("/task/job/sponsored", {...inputs});
      setProcessing(false);
      return alert("Job created");
    } catch (error) {
      setProcessing(false);
      return alert("Connection error");
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Sponsored Job</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Picture</label>
          <input
            type="file"
            id="file"
            name="picture"
            onChange={(e) => setPicture(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Job Title</label>
          <input type="text" name="jobTitle" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Amount</label>
          <input type="number" name="amount" onChange={handleChange} />
        </div>
        <button
          className="addProductButton"
          type="submit"
          disabled={processing || progress < 100}
        >
          {processing ? "Please wait..." : "Create"}
        </button>
      </form>
    </div>
  );
}
