const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

module.exports.sendJobReject = (email, username, jobTitle) => {
  console.log("Check");
  transport
    .sendMail({
      from: process.env.USER,
      to: email,
      subject: "Identity Rejected",
      html: `<h1>Identity Rejected</h1>
          <h2>Hello ${username}</h2>
          <p>The job (${jobTitle}) you posted was rejected due to that it does not meet up to our standard, thank you.
          </p>
          </div>`,
    })
    .catch((err) => console.log(err));
};

