const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/index");
const path = require("path");

dotenv.config();

// connection to the database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected!"))
  .catch((err) => console.log(err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("common"));
app.use(helmet());

// user router
app.use(router);

// //heroku
// app.use(express.static(path.join(__dirname, "/client/build", "/admin/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "admin", "build", "index.html"));
// });

// connection to the server
const PORT = 6000;
app.listen(process.env.PORT || PORT, () => {
  console.log("server running at port " + PORT);
});
