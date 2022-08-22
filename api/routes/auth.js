const router = require("express").Router();
const Admin = require("../models/Admin");
const User = require("../models/Users");
const UserBackup = require("../models/UsersBackup");
const Agent = require("../models/Agent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyTokenAndAdmin } = require("./verifyToken");
const { sendConfirmationEmail } = require("../config/nodemailer.config");
const { sendForgotPassword } = require("../config/forgotPassword.config");

// register an administrative
router.post("/register/admin", verifyTokenAndAdmin, async (req, res) => {
  try {
    // generate uuid
    const min = Math.ceil(1000000);
    const max = Math.floor(1000000000000);
    const uuid = Math.floor(Math.random() * (max - min + 1)) + min;

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const hashedAuth = await bcrypt.hash(req.body.auth, salt);

    // find if a user exist in the user and user backup database
    const findAdmin = await Admin.findOne({ email: req.body.email });
    if (!findAdmin) {
      // create a new administrative if not exist
      const newUser = new Admin({
        uuid: "golden-ct-" + uuid,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        password: hashedPassword,
        currentPassword: hashedPassword,
        auth: hashedAuth,
        currentAuth: hashedAuth,
      });
      await newUser.save();
      res.status(200).json("Registration successful!");
    } else {
      res.status(403).json("User exist, kindly try another");
    }
  } catch (err) {
    // console.log(err)
    res.status(500).json("Connection Error!");
  }
});

// register a user
router.post("/register", async (req, res) => {
  try {
    // generate uuid
    const min = Math.ceil(1000000);
    const max = Math.floor(1000000000000);
    const uuid = Math.floor(Math.random() * (max - min + 1)) + min;

    // generate confirmation code
    const confirmMin = Math.ceil(1000);
    const confirmMax = Math.floor(9000);
    const confirm =
      Math.floor(Math.random() * (confirmMax - confirmMin + 1)) + confirmMin;

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // find if a user exist in the user and user backup database
    const findUser =
      (await User.findOne({ email: req.body.email })) ||
      (await User.findOne({ username: req.body.username }));
    const findUserBackup =
      (await UserBackup.findOne({ email: req.body.email })) ||
      (await UserBackup.findOne({ username: req.body.username }));
    if (!findUser && !findUserBackup) {
      // check if req.query
      const checkedReferred = await Agent.findOne({
        agentCode: req.query.agent,
      });
      if (req.query.agent && checkedReferred) {
        // create a new user if user not exist
        const newUser = new User({
          uuid: "golden-ct-" + uuid,
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          currentPassword: hashedPassword,
          confirmationCode: confirm,
          resendConfirmationCodeIn: new Date(),
          referee: checkedReferred.uuid,
        });
        await newUser.save();
        const newUserBackup = new UserBackup({
          uuid: "golden-ct-" + uuid,
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          currentPassword: hashedPassword,
        });
        await newUserBackup.save();
        await checkedReferred.updateOne({
          $push: { referred: "golden-ct-" + uuid },
        });
        res.status(200).json("Registration successful!");
        sendConfirmationEmail(
          (email = newUser.email),
          (username = newUser.username),
          (confirmationCode = newUser.confirmationCode)
        );
      } else {
        // if not, still proceed to create a new user
        const newUser = new User({
          uuid: "golden-ct-" + uuid,
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          currentPassword: hashedPassword,
          confirmationCode: confirm,
          resendConfirmationCodeIn: new Date(),
        });
        await newUser.save();
        const newUserBackup = new UserBackup({
          uuid: "golden-ct-" + uuid,
          email: req.body.email,
          username: req.body.username,
          password: hashedPassword,
          currentPassword: hashedPassword,
        });
        await newUserBackup.save();
        res.status(200).json("Registration successful!");
        sendConfirmationEmail(
          (email = newUser.email),
          (username = newUser.username),
          (confirmationCode = confirm)
        );
      }
    } else {
      res.status(403).json("User exist, kindly try another");
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json("Connection Error!");
  }
});

// get user for confirmation
router.get("/confirm-user/:username", async (req, res) => {
  try {
    const confirmUser = await User.findOne({
      username: req.params.username,
    });
    const {
      password,
      isConfirmed,
      isAgent,
      isValidated,
      isVerified,
      currentPassword,
      ...others
    } = confirmUser._doc;
    if (!confirmUser.isConfirmed) {
      res.status(200).json({ ...others });
    } else {
      res.status(400).json("User does not exist! Please register.");
    }
  } catch (err) {
    res.status(500).json("Connection Error!");
  }
});

// confirm user email
router.put("/email-confirmation/:username", async (req, res) => {
  try {
    const confirmUser = await User.findOne({
      username: req.params.username,
    });
    if (
      !confirmUser.isConfirmed &&
      confirmUser.confirmationCode == req.body.confirmationCode
    ) {
      await confirmUser.updateOne({ isConfirmed: true });
      await confirmUser.updateOne({ confirmationCode: "" });
      await confirmUser.updateOne({ resendConfirmationCodeIn: null });
      res.status(200).json("Email successfully confirmed! Proceed to login.");
    } else {
      res.status(400).json("Code is incorrect or expired, kindly generate another one.");
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json("Connection Error!");
  }
});

// resend confirmation code
router.put("/resend-code/:username", async (req, res) => {
  try {
    // generate subscription reference num
    const confirmMin = Math.ceil(1000);
    const confirmMax = Math.floor(9000);
    const confirm =
      Math.floor(Math.random() * (confirmMax - confirmMin + 1)) + confirmMin;

    const confirmUser = await User.findOne({
      username: req.params.username,
    });
    if (confirmUser && !confirmUser.isConfirmed) {
      await confirmUser.updateOne({ confirmationCode: confirm });
      await confirmUser.updateOne({ resendConfirmationCodeIn: new Date() });
      sendConfirmationEmail(
        (email = confirmUser.email),
        (username = confirmUser.username),
        (confirmationCode = confirm)
      );
      res
        .status(200)
        .json("Confirmation code resent, please check your email.");
    } else {
      res.status(400).json("User does not exist! Please register.");
    }
  } catch (err) {
    console.log(err)
    res.status(500).json("Connection Error!");
  }
});

// login an administrative
router.post("/login/admin", async (req, res) => {
  try {
    const user = await Admin.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const accessToken = jwt.sign(
          { id: user._id, role: user.role, uuid: user.uuid },
          process.env.JWT_SEC,
          {
            expiresIn: "1h",
          }
        );
        const { password, currentPassword, auth, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      } else {
        res.status(500).json("Invalid credentials");
      }
    } else {
      res.status(400).json("Invalid credentials");
    }
  } catch (err) {
    res.status(500).json("Connection Error!");
  }
});

// login a user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const agent = await Agent.findOne({ email: req.body.email });

    if (user || agent) {
      if (user.isConfirmed) {
        if (!user.isLoggedout) {
          if (bcrypt.compareSync(req.body.password, user.password)) {
            const accessToken = jwt.sign(
              { id: user._id, uuid: user.uuid, email: user.email },
              process.env.JWT_SEC,
              {
                expiresIn: "1h",
              }
            );
            const {
              password,
              currentPassword,
              confirmationCode,
              transactionPin,
              currentTransactionPin,
              ...others
            } = user._doc;
            res.status(200).json({ ...others, agent, accessToken });
          } else {
            res.status(400).json("Invalid credentials!");
          }
        } else {
          res
            .status(400)
            .json(
              "Your account is currently disabled, you cannot login at this moment,"
            );
        }
      } else {
        res
          .status(403)
          .json(`${user.username}, please confirm your email to continue`);
      }
    } else {
      res.status(400).json("Invalid credentials!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection Error!");
  }
});

//  user login to forgot password
router.post("/forgot-password-request", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const forgotToken = jwt.sign(
        { id: user._id, email: user.email, uuid: user.uuid },
        process.env.JWT_SEC,
        {
          expiresIn: "300s",
        }
      );
      const {
        transactionPin,
        currentTransactionPin,
        username,
        password,
        currentPassword,
        isValidated,
        isVerified,
        identity,
        package,
        isAgent,
        time,
        taskWallet,
        agentWallet,
        mineWallet,
        createdAt,
        ...others
      } = user._doc;
      res.status(200).json({ ...others, forgotToken });
      sendForgotPassword((email = user.email), (id = user._id));
    } else {
      res.status(404).json("Invalid email");
    }
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

module.exports = router;
