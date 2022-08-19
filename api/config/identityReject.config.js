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

module.exports.sendIdentityEmail = (email) => {
  console.log("Check");
  transport
    .sendMail({
      from: process.env.USER,
      to: email,
      subject: "Identity Rejected",
      html: `<h1>Identity Rejected</h1>
          <h2>Hello ${email}</h2>
          <p>The ID for means of identification you provided was rejected. Please try to upload a more clearer and detailed means of identification, thank you.
          </p>
          </div>`,
    })
    .catch((err) => console.log(err));
};
