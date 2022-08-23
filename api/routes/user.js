const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const UserBackup = require("../models/UsersBackup");
const Agent = require("../models/Agent");
const ValidUser = require("../models/ValidUser");
const jwt = require("jsonwebtoken");
const { sendPaymentNotification } = require("../config/payment.config");
const {
  verifyTokenAndUser,
  verifyTokenAndUserBody,
  verifyTokenAndAuthorization,
  verifyTokenAndAuthorizationAndUser,
} = require("./verifyToken");
const UserPackage = require("../models/UserPackage");
const AgentPackage = require("../models/AgentPackage");
const PaymentProof = require("../models/PaymentProof");
const Identity = require("../models/Identity");
const TopWallet = require("../models/TopWallet");
const Withdraw = require("../models/Withdraw");
const TotalRevenew = require("../models/TotalRevenew");
const Feedback = require("../models/Feedback");
const { sendWithdrawalNotification } = require("../config/withdraw.config");
const crypto = require("crypto");

router.get("/download", async (req, res) => {
  // generate subscription reference num
  const min = Math.ceil(1000);
  const max = Math.floor(1000000);
  const reference = Math.floor(Math.random() * (max - min + 1)) + min;
  res.status(200).json(reference);
});

// get users stat
router.get("/stats", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// get all users
router.get("/users", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // filter users with query method
    const { user } = req.query;
    const keys = ["username", "uuid"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(user))
      );
    };

    const users = await User.find();
    // const {password, currentPassword, ...others} = users[0]._doc
    if (user) {
      res.status(200).json(search(users));
    } else if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json("No registered user!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// get latest users
router.get("/users/latest", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 }).limit(5);
    // const {password, currentPassword, ...others} = users[0]._doc
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json("No registered user!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// get single logged in user by user
router.get("/user", verifyTokenAndAuthorizationAndUser, async (req, res) => {
  try {
    const user = await User.findOne({ uuid: req.user.uuid });
    const { password, currentPassword, ...others } = user._doc;
    if (user) {
      res.status(200).json(others);
    } else {
      res.status(404).json("User not found!");
    }
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// get single user by admin
router.get("/user/:uuid", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findOne({ uuid: req.params.uuid });
    const { password, currentPassword, ...others } = user._doc;
    if (user) {
      res.status(200).json(others);
    } else {
      res.status(404).json("User not found!");
    }
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// user edit details
router.put(
  "/edit/user",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    const agent = await Agent.findOne({ uuid: req.user.uuid });
    try {
      const user = await User.findOneAndUpdate(
        { uuid: req.user.uuid },
        { $set: req.body },
        { new: true }
      );
      await UserBackup.findOneAndUpdate(
        req.user.uuid,
        { $set: req.body },
        { new: true }
      );
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
      if (user || agent) {
        res.status(200).json({ ...others, agent, accessToken });
        // console.log(agent)
      } else {
        res.status(404).json("User not found");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection Error!");
    }
  }
);

// user reset-password
router.put(
  "/reset-password",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      // check if current password is correct
      if (bcrypt.compareSync(req.body.currentPassword, user.currentPassword)) {
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
          req.body.currentPassword = req.body.password;
          try {
            const user = await User.findOneAndUpdate(
              { uuid: req.user.uuid },
              { $set: req.body },
              { new: true }
            );
            await UserBackup.findOneAndUpdate(
              { uuid: req.user.uuid },
              {
                $set: req.body,
              }
            );
            res.status(200).json(user);
          } catch (err) {
            err;
          }
        }
      } else {
        res.status(400).json("Current password does not match.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// user update transaction pin
router.put(
  "/update-pin",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user.transactionPin) {
        // check if current pin is correct
        if (
          bcrypt.compareSync(
            req.body.currentTransactionPin,
            user.currentTransactionPin
          )
        ) {
          if (req.body.transactionPin) {
            const salt = await bcrypt.genSalt(10);
            req.body.transactionPin = await bcrypt.hash(
              req.body.transactionPin,
              salt
            );
            req.body.currentTransactionPin = req.body.transactionPin;
            try {
              const user = await User.findOneAndUpdate(
                { uuid: req.user.uuid },
                { $set: req.body },
                { new: true }
              );
              await UserBackup.findOneAndUpdate(
                { uuid: req.user.uuid },
                {
                  $set: req.body,
                }
              );
              await user.updateOne({ isPinSet: true });
              res.status(200).json(user);
            } catch (err) {
              err;
            }
          }
        } else {
          res.status(400).json("Current pin does not match.");
        }
      } else {
        if (req.body.transactionPin) {
          const salt = await bcrypt.genSalt(10);
          req.body.transactionPin = await bcrypt.hash(
            req.body.transactionPin,
            salt
          );
          req.body.currentTransactionPin = req.body.transactionPin;
          try {
            const user = await User.findOneAndUpdate(
              { uuid: req.user.uuid },
              { $set: req.body },
              { new: true }
            );
            await UserBackup.findOneAndUpdate(
              { uuid: req.user.uuid },
              {
                $set: req.body,
              }
            );
            await user.updateOne({ isPinSet: true });
            res.status(200).json(user);
          } catch (err) {
            err;
          }
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// user forgot password
router.put("/forgot-password/:id", verifyTokenAndUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // check if current password is correct
    if (user && req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      req.body.currentPassword = req.body.password;
      try {
        const user = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        // await UserBackup.findOneAndUpdate(req.user.uuid, {
        //   $set: req.body,
        // });
        res.status(200).json(user);
      } catch (err) {
        err;
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// become an agent
router.post("/agent", verifyTokenAndUserBody, async (req, res) => {
  try {
    // generate reference num
    const min = Math.ceil(1000);
    const max = Math.floor(1000000);
    const reference = Math.floor(Math.random() * (max - min + 1)) + min;

    const user = await User.findById(req.body.userId);
    // uuid of the logged in user
    const agent = await Agent.findOne({ uuid: req.user.uuid });
    if (user && user.isValidated) {
      const saveAgent = new Agent({
        uuid: req.user.uuid,
        agentPackage: req.body.agentPackage,
        amount: req.body.amount,
        reference: "REF: " + reference,
      });
      await saveAgent.save();
      res.status(200).json(saveAgent);
    } else if (agent.isValid) {
      res.status(403).json("You are already an Agent!");
    } else {
      res
        .status(400)
        .json("Your account need to be validated before you become an agent");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// get single agent details by user
router.get(
  "/get-agent/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const getAgent = await Agent.findById(req.params.id);
      if (getAgent) {
        res.status(200).json(getAgent);
      } else {
        res.status(404).json("Not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get all agents
router.get("/agents-agent", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // filter users with query method
    const { user } = req.query;
    const keys = ["email", "uuid"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(user))
      );
    };

    const agents = await Agent.find();
    if (user) {
      res.status(200).json(search(agents));
    } else if (agents) {
      res.status(200).json(agents);
    } else {
      res.status(404).json("No registered agent yet.");
    }
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// get single agent by admin for validation
router.get(
  "/agents-agent/:uuid",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const agent = await Agent.findOne({ uuid: req.params.uuid });
      if (agent) {
        res.status(200).json(agent);
      } else {
        res.status(404).json("No registered agent yet.");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// agent subsequent subscription to a package/upgrade package
router.post("/agent-upgrade", verifyTokenAndUserBody, async (req, res) => {
  try {
    // generate reference num
    const min = Math.ceil(1000);
    const max = Math.floor(1000000);
    const reference = Math.floor(Math.random() * (max - min + 1)) + min;

    const user = await User.findById(req.body.userId);
    if (user && user.isAgent) {
      const savePackage = new AgentPackage({
        uuid: req.user.uuid,
        agentPackage: req.body.agentPackage,
        amount: req.body.amount,
        reference: "REF: " + reference,
      });
      await savePackage.save();
      res.status(200).json(savePackage);
    } else {
      res.status(404).json("Agent account does not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// get single agent subsequent sbscription details by user
router.get(
  "/get-agent-packages/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const getAgentPackge = await AgentPackage.findById(req.params.id);
      if (getAgentPackge) {
        res.status(200).json(getAgentPackge);
      } else {
        res.status(404).json("Not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get all agent's subscription
router.get(
  "/agents-packages",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      // filter users with query method
      const { reference } = req.query;
      const keys = ["reference", "uuid"];

      const search = (data) => {
        return data.filter((item) =>
          keys.some((key) => item[key].toLowerCase().includes(reference))
        );
      };

      const agentsPackages = await AgentPackage.find();
      if (reference) {
        res.status(200).json(search(agentsPackages));
      } else if (agentsPackages) {
        res.status(200).json(agentsPackages);
      } else {
        res.status(404).json("No registered packages yet.");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// get single agent subscription
router.get(
  "/users-packages/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const agentPackage = await AgentPackage.findById(req.params.id);
      if (agentPackage) {
        res.status(200).json(agentPackage);
      } else {
        res.status(404).json("No registered packages yet.");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// user subscribe to a package for validation
router.post(
  "/subscribe",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      // generate reference num
      const min = Math.ceil(1000);
      const max = Math.floor(1000000);
      const reference = Math.floor(Math.random() * (max - min + 1)) + min;

      const user = await User.findById(req.user.id);
      // uuid of logged in user
      const validUser = await ValidUser.findOne({ uuid: req.user.uuid });
      if (user) {
        const saveValidUser = new ValidUser({
          uuid: req.user.uuid,
          userPackage: req.body.userPackage,
          amount: req.body.amount,
          reference: "REF: " + reference,
        });
        await saveValidUser.save();
        res.status(200).json(saveValidUser);
      } else if (validUser.isValid) {
        res.status(403).json("You are already subscriber!");
      } else {
        res.status(404).json("Account does not exist");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get single valid user details by user
router.get(
  "/get-subscribed/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const getSubscribed = await ValidUser.findById(req.params.id);
      if (getSubscribed) {
        res.status(200).json(getSubscribed);
      } else {
        res.status(404).json("Not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get all subscribed users for validation
router.get(
  "/users-subscription",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const usersSubscribed = await ValidUser.find();
      if (usersSubscribed) {
        res.status(200).json(usersSubscribed);
      } else {
        res.status(404).json("No registered packages yet.");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// get single subscribed user by admin for validation
router.get(
  "/users-subscription/:uuid",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const userSubscribed = await ValidUser.findOne({
        uuid: req.params.uuid,
      });
      if (userSubscribed) {
        res.status(200).json(userSubscribed);
      } else {
        res.status(404).json("No registered packages yet.");
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json("Connection error!");
    }
  }
);

// user subsequent subscription to a package/upgrade package
router.post("/upgrade", verifyTokenAndUserBody, async (req, res) => {
  try {
    // generate reference num
    const min = Math.ceil(1000);
    const max = Math.floor(1000000);
    const reference = Math.floor(Math.random() * (max - min + 1)) + min;

    const user = await User.findById(req.body.userId);
    if (user && user.isValidated) {
      const savePackage = new UserPackage({
        uuid: req.user.uuid,
        userPackage: req.body.userPackage,
        amount: req.body.amount,
        reference: "REF: " + reference,
      });
      await savePackage.save();
      res.status(200).json(savePackage);
    } else {
      res
        .status(404)
        .json("You must be a valid user to perform this operation.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// get single user subsequent package upgrade details by user
router.get(
  "/get-package/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const getPackage = await UserPackage.findById(req.params.id);
      if (getPackage) {
        res.status(200).json(getPackage);
      } else {
        res.status(404).json("Not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get all user's package
router.get("/users-packages", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // filter users with query method
    const { reference } = req.query;
    const keys = ["reference", "uuid"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(reference))
      );
    };

    const usersPackages = await UserPackage.find();
    if (reference) {
      res.status(200).json(search(usersPackages));
    } else if (usersPackages) {
      res.status(200).json(usersPackages);
    } else {
      res.status(404).json("No registered packages yet.");
    }
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// get single user package
router.get(
  "/users-packages/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const usersPackage = await UserPackage.findById(req.params.id);
      if (usersPackage) {
        res.status(200).json(usersPackage);
      } else {
        res.status(404).json("No registered packages yet.");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// upload payment proof
router.post(
  "/payment",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      // generate reference num
      const min = Math.ceil(1000);
      const max = Math.floor(1000000);
      const reference = Math.floor(Math.random() * (max - min + 1)) + min;

      const user = await User.findById(req.user.id);
      if (user) {
        const savePayment = new PaymentProof({
          uuid: req.user.uuid,
          amount: req.body.amount,
          paymentFor: req.body.paymentFor,
          screenshot: req.body.screenshot,
          reference: "REF: " + reference,
        });
        await savePayment.save();
        res.status(200).json(savePayment);
        sendPaymentNotification(
          (id = savePayment._id),
          (uuid = savePayment.uuid)
        );
      } else {
        res
          .status(404)
          .json("You must be a valid user to perform this operation.");
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get all payment proof
router.get(
  "/payment/get-proofs",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      // filter users with query method
      const { reference } = req.query;
      const keys = ["reference"];

      const search = (data) => {
        return data.filter((item) =>
          keys.some((key) => item[key].toLowerCase().includes(reference))
        );
      };

      const payment = await PaymentProof.find();
      if (reference) {
        res.status(200).json(search(payment));
      } else if (payment) {
        res.status(200).json(payment);
      } else {
        res
          .status(404)
          .json("You must be a valid user to perform this operation.");
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get single payment proof
router.get(
  "/payment/get-proof/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const payment = await PaymentProof.findById(req.params.id);
      if (payment) {
        res.status(200).json(payment);
      } else {
        res
          .status(404)
          .json("You must be a valid user to perform this operation.");
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// upload identity
router.post(
  "/identity",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      // generate reference num
      const min = Math.ceil(1000);
      const max = Math.floor(1000000);
      const reference = Math.floor(Math.random() * (max - min + 1)) + min;

      const user = await User.findById(req.user.id);
      if (user && user.isValidated) {
        if (user.identity.length < 1) {
          const saveIdentity = new Identity({
            uuid: req.user.uuid,
            email: req.user.email,
            reference: "REF: " + reference,
            front: req.body.front,
            back: req.body.back,
          });
          await saveIdentity.save();
          await user.updateOne({ $push: { identity: saveIdentity } });
          res.status(200).json(saveIdentity);
        } else {
          res.status(403).json("You have a pending submission");
        }
      } else {
        res
          .status(403)
          .json("You must be a valid user to perform this operation.");
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get all identities
router.get("/identities", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // filter users with query method
    const { user } = req.query;
    const keys = ["uuid"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(user))
      );
    };

    const identity = await Identity.find();
    if (user) {
      res.status(200).json(search(identity));
    } else if (identity) {
      res.status(200).json(identity);
    } else {
      res.status(404).json("Not found!");
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json("Connection error!");
  }
});

// get single identity
router.get("/identity/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const identity = await Identity.findById(req.params.id);
    if (identity) {
      res.status(200).json(identity);
    } else {
      res.status(404).json("Not found!");
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json("Connection error!");
  }
});

// user top-up wallet
router.post(
  "/wallet/top-up",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      // generate reference num
      const min = Math.ceil(1000);
      const max = Math.floor(1000000);
      const reference = Math.floor(Math.random() * (max - min + 1)) + min;

      const user = await User.findById(req.user.id);
      const totalRevenew = await TotalRevenew.findById(
        "62f681f91ea7e22a28c93ee1"
      );
      if (user && user.isValidated) {
        const saveTopUp = new TopWallet({
          uuid: req.user.uuid,
          reference: "REF: " + reference,
          amount: req.body.amount,
        });
        const findReference = await TopWallet.findOne({
          reference: saveTopUp.reference,
        });
        if (!findReference) {
          let amountTopUp = saveTopUp.amount;
          for (i = amountTopUp; i >= 1; i++) {
            await user.updateOne({ $inc: { taskWallet: +i } });
            await totalRevenew.updateOne({ $inc: { in: +i } });
            break;
          }
          await saveTopUp.save();
          res.status(200).json(saveTopUp);
        } else {
          res
            .status(400)
            .json(
              "We are facing difficulty validating your payment, please try again."
            );
        }
      } else {
        res
          .status(404)
          .json("You must be a valid user to perform this operation.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get all top-up payment
router.get("/get-payments", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // filter users with query method
    const { payment } = req.query;
    const keys = ["reference"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(payment))
      );
    };

    const getPayments = await TopWallet.find();
    if (payment) {
      res.status(200).json(search(getPayments));
    } else if (getPayments) {
      res.status(200).json(getPayments);
    } else {
      res.status(404).json("Not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// user withdraw
router.post(
  "/wallet/withdraw",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      // generate reference num
      const min = Math.ceil(1000);
      const max = Math.floor(1000000);
      const reference = Math.floor(Math.random() * (max - min + 1)) + min;

      const user = await User.findById(req.user.id);
      const agent = await Agent.findOne({ uuid: req.user.uuid });
      const totalRevenew = await TotalRevenew.findById(
        "62f681f91ea7e22a28c93ee1"
      );
      const amount = req.body.amount;
      const withdrawablePercentage = (amount * 10) / 100;
      const withdrawableAmount = amount - withdrawablePercentage;
      if (user && user.isValidated) {
        if (user.isPinSet) {
          if (
            bcrypt.compareSync(req.body.transactionPin, user.transactionPin)
          ) {
            if (agent && req.body.account == "agent") {
              if (agent.reward >= 500) {
                if (agent.reward >= amount) {
                  const saveWithdraw = new Withdraw({
                    uuid: req.user.uuid,
                    reference: "REF: " + reference,
                    withdrawableAmount: withdrawableAmount,
                    amount: req.body.amount,
                    bank: user.bank,
                    accountNumber: user.accountNumber,
                    accountName: user.accountName,
                    remark: req.body.remark,
                    account: req.body.account,
                  });
                  let amountToWidraw = saveWithdraw.amount;
                  for (i = amountToWidraw; i >= 1; i++) {
                    await agent.updateOne({ $inc: { reward: -i } });
                    await totalRevenew.updateOne({ $inc: { out: +i } });
                    break;
                  }
                  await saveWithdraw.save();
                  res
                    .status(200)
                    .json(
                      `Withdrawal of ${saveWithdraw.amount} was successful, kindly wait for approval from the admin.`
                    );
                  sendWithdrawalNotification(
                    (uuid = saveWithdraw.uuid),
                    (referenceNo = saveWithdraw.reference)
                  );
                } else {
                  res
                    .status(400)
                    .json(
                      "Your balance is insufficient to perform this operation."
                    );
                }
              } else {
                res
                  .status(400)
                  .json("Balance must be at least 500 before you can withdraw");
              }
            } else if (user && user.taskWallet >= 500) {
              if (user.taskWallet >= amount) {
                const saveWithdraw = new Withdraw({
                  uuid: req.user.uuid,
                  reference: "REF: " + reference,
                  withdrawableAmount: withdrawableAmount,
                  amount: req.body.amount,
                  bank: user.bank,
                  accountNumber: user.accountNumber,
                  accountName: user.accountName,
                  remark: req.body.remark,
                  account: req.body.account,
                });
                let amountToWidraw = saveWithdraw.amount;
                for (i = amountToWidraw; i >= 1; i++) {
                  await user.updateOne({ $inc: { taskWallet: -i } });
                  await totalRevenew.updateOne({ $inc: { out: +i } });
                  break;
                }
                await saveWithdraw.save();
                res
                  .status(200)
                  .json(
                    `Withdrawal of ${saveWithdraw.amount} was successful, kindly wait for approval from the admin.`
                  );
                sendWithdrawalNotification(
                  (uuid = saveWithdraw.uuid),
                  (referenceNo = saveWithdraw.reference)
                );
              } else {
                res
                  .status(400)
                  .json(
                    "Your balance is insufficient to perform this operation."
                  );
              }
            } else {
              res
                .status(400)
                .json("Balance must be at least 500 before you can withdraw");
            }
          } else {
            res.status(400).json("Transaction pin is invalid");
          }
        } else {
          res
            .status(400)
            .json("Kindly set up your transaction pin before you continue");
        }
      } else {
        res
          .status(404)
          .json("You must be a valid user to perform this operation.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get all withdraw
router.get("/get-withdrawn", verifyTokenAndAuthorization, async (req, res) => {
  try {
    // filter users with query method
    const { withdrawn } = req.query;
    const keys = ["reference"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(withdrawn))
      );
    };

    const getWithdrawn = await Withdraw.find();
    if (withdrawn) {
      res.status(200).json(search(getWithdrawn));
    } else if (getWithdrawn.length > 0) {
      res.status(200).json(getWithdrawn);
    } else {
      res.status(404).json("Not found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// get withdraw history
router.get(
  "/withdrawn-history",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const withdrawnHistory = await Withdraw.find({ uuid: req.user.uuid });
      res.status(200).json(withdrawnHistory);
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// get total revenew
router.get(
  "/get-total/revenew",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const totalRevenew = await TotalRevenew.findById(
        "62f681f91ea7e22a28c93ee1"
      );
      if (totalRevenew) {
        res.status(200).json(totalRevenew);
      } else {
        res.status(404).json("Not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// feedback
router.post(
  "/post-feedback",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const newFeed = new Feedback({
        email: req.user.email,
        feed: req.body.feed,
      });
      await newFeed.save();
      res.status(200).json("Feedback received, thank you.");
    } catch (err) {
      // console.log(err)
      res.status(500).json("Connection error!");
    }
  }
);

// get feedback
router.get("/get-feedback", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const feed = await Feedback.find();
    res.status(200).json(feed);
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// get referred list of an agent
router.get(
  "/agents/referred",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const findAgent = await Agent.findOne({ uuid: req.user.uuid });
      if (findAgent) {
        res.status(200).json(findAgent.referred.length);
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

module.exports = router;
