const router = require("express").Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const User = require("../models/Users");
const UserBackup = require("../models/UsersBackup");
const Agent = require("../models/Agent");
const ValidUser = require("../models/ValidUser");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");
const UserPackage = require("../models/UserPackage");
const AgentPackage = require("../models/AgentPackage");
const PostJob = require("../models/PostJob");
const Task = require("../models/Task");
const Identity = require("../models/Identity");
const { sendIdentityEmail } = require("../config/identityReject.config");
const { sendJobReject } = require("../config/jobReject.config");
const TopWallet = require("../models/TopWallet");
const Withdraw = require("../models/Withdraw");

// edit admin details by admin
router.put(
  "/edit/admin/user-admin/:id",
  verifyTokenAndAdmin,
  async (req, res) => {
    try {
      const user = await Admin.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json("Connection Error!");
    }
  }
);

// get all admins
router.get("/admins", verifyTokenAndAdmin, async (req, res) => {
  try {
    const admins = await Admin.find();
    if (admins) {
      res.status(200).json(admins);
    } else res.status(404).json("Not Found");
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// delete an admin
router.delete("/delete-admin/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const admins = await Admin.findByIdAndDelete(req.params.id);
    if (admins) {
      res.status(200).json("User successfully deleted");
    } else res.status(404).json("Not Found");
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// admin reset-password by role admin
router.put(
  "/reset-password/:id/admin/user-admin",
  verifyTokenAndAdmin,
  async (req, res) => {
    try {
      const user = await Admin.findById(req.params.id);
      // check if current password is correct
      if (bcrypt.compareSync(req.body.currentPassword, user.currentPassword)) {
        if (bcrypt.compareSync(req.body.auth, user.auth)) {
          if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            req.body.auth = await bcrypt.hash(req.body.auth, salt);
            req.body.currentPassword = req.body.password;
            try {
              const updateUser = await Admin.findOneAndUpdate(req.user.uuid, {
                $set: req.body,
              });
              res.status(200).json(updateUser);
            } catch (err) {
              err;
            }
          }
        } else {
          res.status(400).json("Auth does not match");
        }
      } else {
        res.status(400).json("Current password does not match.");
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// admin reset-auth by role admin
router.put(
  "/reset-auth/:id/admin/user-admin",
  verifyTokenAndAdmin,
  async (req, res) => {
    try {
      const user = await Admin.findById(req.params.id);
      // check if current auth is correct
      if (bcrypt.compareSync(req.body.currentAuth, user.currentAuth)) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          if (req.body.auth) {
            const salt = await bcrypt.genSalt(10);
            req.body.auth = await bcrypt.hash(req.body.auth, salt);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            req.body.currentAuth = req.body.auth;
            try {
              const updateUser = await Admin.findOneAndUpdate(req.user.uuid, {
                $set: req.body,
              });
              res.status(200).json(updateUser);
            } catch (err) {
              err;
            }
          }
        } else {
          res.status(400).json("Password does not match");
        }
      } else {
        res.status(400).json("Current auth does not match.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// edit a user details by an admin
router.put(
  "/edit/user/:uuid",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        req.body.currentPassword = req.body.password;
      }
      if (req.body.transactionPin) {
        const salt = await bcrypt.genSalt(10);
        req.body.transactionPin = await bcrypt.hash(
          req.body.transactionPin,
          salt
        );
        req.body.currentTransactionPin = req.body.transactionPin;
      }
      const user = await User.findOneAndUpdate(
        { uuid: req.params.uuid },
        { $set: req.body },
        { new: true }
      );
      if (user) {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json("Connection Error!");
    }
  }
);

// // validate a user by an admin
// router.put(
//   "/validate/user/:uuid",
//   verifyTokenAndAuthorization,
//   async (req, res) => {
//     try {
//       // check valid user model
//       const validUser = await ValidUser.findOne({ uuid: req.params.uuid });
//       if (!validUser.isValid) {
//         //   proceed if user available is not ye validated
//         const updateUser = await ValidUser.findOneAndUpdate(
//           { uuid: req.params.uuid },
//           { $set: req.body },
//           { new: true }
//         );
//         const user = await User.findOne({ uuid: req.params.uuid });
//         const userBackup = await UserBackup.findOne({ uuid: req.params.uuid });
//         const package = validUser.userPackage;
//         if (user) {
//           await user.updateOne({ package: package });
//           await user.updateOne({ isValidated: true });
//           await userBackup.updateOne({ package: package });
//           await userBackup.updateOne({ isValidated: true });
//         } else {
//           res.status(404).json("User not found!");
//         }
//         res.status(200).json(updateUser);
//       } else {
//         res.status(403).json("User is already a subscriber!");
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).json("Connection Error!");
//     }
//   }
// );

// validate a user with referral by an admin
router.put(
  "/validate/user/:uuid/refer",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      // check for user in valid user model
      const validUser = await ValidUser.findOne({ uuid: req.params.uuid });
      if (validUser && !validUser.isValid) {
        // if user is not yet validated, proceed
        const updateUser = await ValidUser.findOneAndUpdate(
          { uuid: req.params.uuid },
          { $set: req.body },
          { new: true }
        );
        const user = await User.findOne({ uuid: req.params.uuid });
        const package = validUser.userPackage;
        if (user) {
          await user.updateOne({ package: package });
          await user.updateOne({ isValidated: true });
          const agent = user.referee;
          //   find agent with user referee in agent model
          const findAgent = await Agent.findOne({ uuid: agent });
          //   console.log(findAgent)
          // if (findAgent) {
          if (findAgent.referred.includes(req.params.uuid)) {
            // if validating user is present inside agent's array, proceed with this
            if (validUser.userPackage === "basic") {
              const deduct = 1000;
              const reward = 500;
              let agentWallet = findAgent.agentWallet;
              if (agentWallet >= deduct) {
                for (i = deduct; i >= 0; i--) {
                  await findAgent.updateOne({ $inc: { agentWallet: -i } });
                  break;
                }
                for (i = reward; i >= 0; i++) {
                  await findAgent.updateOne({ $inc: { reward: +i } });
                  break;
                }
              }
            } else if (validUser.userPackage === "regular") {
              const deduct = 2000;
              const reward = 1000;
              let agentWallet = findAgent.agentWallet;
              if (agentWallet >= deduct) {
                for (i = deduct; i >= 0; i--) {
                  await findAgent.updateOne({ $inc: { agentWallet: -i } });
                  break;
                }
                for (i = reward; i >= 0; i++) {
                  await findAgent.updateOne({ $inc: { reward: +i } });
                  break;
                }
              }
            } else if (validUser.userPackage === "standard") {
              const deduct = 5000;
              const reward = 2500;
              let agentWallet = findAgent.agentWallet;
              if (agentWallet >= deduct) {
                for (i = deduct; i >= 0; i--) {
                  await findAgent.updateOne({ $inc: { agentWallet: -i } });
                  break;
                }
                for (i = reward; i >= 0; i++) {
                  await findAgent.updateOne({ $inc: { reward: +i } });
                  break;
                }
              }
            } else if (validUser.userPackage === "professional") {
              const deduct = 10000;
              const reward = 5000;
              let agentWallet = findAgent.agentWallet;
              if (agentWallet >= deduct) {
                for (i = deduct; i >= 0; i--) {
                  await findAgent.updateOne({ $inc: { agentWallet: -i } });
                  break;
                }
                for (i = reward; i >= 0; i++) {
                  await findAgent.updateOne({ $inc: { reward: +i } });
                  break;
                }
              }
            } else if (validUser.userPackage === "silver") {
              const deduct = 20000;
              const reward = 10000;
              let agentWallet = findAgent.agentWallet;
              if (agentWallet >= deduct) {
                for (i = deduct; i >= 0; i--) {
                  await findAgent.updateOne({ $inc: { agentWallet: -i } });
                  break;
                }
                for (i = reward; i >= 0; i++) {
                  await findAgent.updateOne({ $inc: { reward: +i } });
                  break;
                }
              }
            } else if (validUser.userPackage === "gold") {
              const deduct = 50000;
              const reward = 25000;
              let agentWallet = findAgent.agentWallet;
              if (agentWallet >= deduct) {
                for (i = deduct; i >= 0; i--) {
                  await findAgent.updateOne({ $inc: { agentWallet: -i } });
                  break;
                }
                for (i = reward; i >= 0; i++) {
                  await findAgent.updateOne({ $inc: { reward: +i } });
                  break;
                }
              }
            }
          }
          // }
        } else {
          res.status(404).json("User not found!");
        }
        res.status(200).json(updateUser);
      } else {
        res.status(403).json("User is already a subscriber!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection Error!");
    }
  }
);

// decline a user
router.put(
  "/decline/user/:uuid",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      // check for user in valid user model
      const validUser = await ValidUser.findOne({ uuid: req.params.uuid });
      if (validUser && !validUser.isValid) {
        const updateUser = await ValidUser.findOneAndUpdate(
          { uuid: req.params.uuid },
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateUser);
      } else {
        res.status(403).json("User is already a subscriber!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection Error!");
    }
  }
);

// approve a user package by an admin
router.put(
  "/approve/user/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const userPackage = await UserPackage.findById(req.params.id);
      if (!userPackage.isApproved) {
        const updateUser = await UserPackage.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        const findUser = userPackage.uuid;
        const user = await User.findOne({ uuid: findUser });
        // const userBackup = await UserBackup.findOne({ uuid: findUser });
        const package = userPackage.userPackage;
        if (user) {
          await user.updateOne({ package: package });
          // await userBackup.updateOne({ package: package });
        } else {
          res.status(404).json("User not found!");
        }
        res.status(200).json(updateUser);
      } else {
        res.status(403).json("User package approved already!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection Error!");
    }
  }
);

// validate an agent
router.put(
  "/validate-agent/:uuid",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const agentId = await Agent.findOne({ uuid: req.params.uuid });
      if (!agentId.isValid) {
        const updateAgent = await Agent.findOneAndUpdate(
          { uuid: req.params.uuid },
          { $set: req.body },
          { new: true }
        );
        const user = await User.findOne({ uuid: req.params.uuid });
        if (user) {
          const username = user.username;
          const email = user.email;
          let agentWallet = 100000;
          await user.updateOne({ isAgent: true });
          await agentId.updateOne({ agentCode: username });
          await agentId.updateOne({ agentWallet: agentWallet });
          await agentId.updateOne({ email: email });
        }
        if (updateAgent) {
          res.status(200).json(updateAgent);
        } else {
          res.status(404).json("Agent not found");
        }
      } else {
        res.status(403).json("Agent validated already");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// decline an agent
router.put(
  "/decline-agent/:uuid",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const agentId = await Agent.findOne({ uuid: req.params.uuid });
      if (!agentId.isValid) {
        const updateAgent = await Agent.findOneAndUpdate(
          { uuid: req.params.uuid },
          { $set: req.body },
          { new: true }
        );
        if (updateAgent) {
          res.status(200).json(updateAgent);
        } else {
          res.status(404).json("Agent not found");
        }
      } else {
        res.status(403).json("Agent validated already");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// approve an agent package by an admin
router.put(
  "/approve-agent/user/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      // check valid user model
      const agentPackage = await AgentPackage.findById(req.params.id);
      if (agentPackage && !agentPackage.isApproved) {
        //   proceed if user package available is not yet approved
        const updateUser = await AgentPackage.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        const findAgent = agentPackage.uuid;
        const agent = await Agent.findOne({ uuid: findAgent });
        const package = agentPackage.agentPackage;
        let agentWallet = 100000;
        if (agent) {
          for (i = agentWallet; i >= agentWallet; i++) {
            await agent.updateOne({ $inc: { agentWallet: +i } });
            await agent.updateOne({ agentPackage: package });
            break;
          }
        } else {
          res.status(404).json("User not found!");
        }
        res.status(200).json(updateUser);
      } else {
        res.status(403).json("User package approved already!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection Error!");
    }
  }
);

// approve posted job
router.put(
  "/approve-job/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const job = await PostJob.findById(req.params.id);
      const uuid = job.uuid;
      const user = await User.findOne({ uuid: uuid });
      // console.log(user)
      const { _id, isApproved, ...others } = job._doc;
      if (!job.isApproved && !job.isDeclined) {
        await job.updateOne({ isApproved: true });
        let add = 1;
        for (i = add; i >= 1; i++) {
          await user.updateOne({ $inc: { successfulJob: +i } });
          await user.updateOne({ $inc: { pendingJob: -i } });
          break;
        }
        const task = new Task((req.body = others));
        await task.save();
        res.status(200).json("Job approved successfully");
      } else {
        // console.log(user)
        res.status(400).json("Job approved already!");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// reject posted job
router.put(
  "/decline-job/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const job = await PostJob.findById(req.params.id);
      const uuid = job.uuid;
      const user = await User.findOne({ uuid: uuid });
      // console.log(user)
      const { _id, isApproved, totalPayable, ...others } = job._doc;
      if (!job.isApproved && !job.isDeclined) {
        await job.updateOne({ isDeclined: true });
        await job.updateOne({ reason: "Not up to our standard" });
        let add = 1;
        for (i = add; i >= 1; i++) {
          await user.updateOne({ $inc: { rejectedJob: +i } });
          await user.updateOne({ $inc: { taskWallet: +totalPayable } });
          break;
        }
        await PostJob.findOneAndUpdate(
          { uuid: uuid },
          { $set: req.body },
          { new: true }
        );
        res.status(200).json("Job declined successfully");
        sendJobReject(
          (email = user.email),
          (username = user.username),
          (jobTitle = job.jobTitle)
        );
      } else {
        // console.log(user)
        res.status(400).json("Action has been performed already!");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// accept identity
router.put(
  "/approve-identity/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const findIdentity = await Identity.findById(req.params.id);
      const findUser = findIdentity.uuid;
      const user = await User.findOne({ uuid: findUser });
      if (findIdentity && !findIdentity.isApproved) {
        await findIdentity.updateOne({ isApproved: true });
        await user.updateOne({ isVerified: true });
        res.status(200).json("You have successfully approved this identity");
      } else {
        res.status(404).json("This action has been performed already!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection");
    }
  }
);

// reject identity
router.put(
  "/decline-identity/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const findIdentity = await Identity.findById(req.params.id);
      const findUser = findIdentity.uuid;
      const user = await User.findOne({ uuid: findUser });
      if (findIdentity && !findIdentity.isDeclined) {
        await findIdentity.updateOne({ isDeclined: true });
        await user.updateOne({ $pull: { identity: {} } });
        res.status(200).json("You have successfully declined this identity");
        sendIdentityEmail((email = findIdentity.email));
      } else {
        res.status(404).json("This action has been performed already!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection");
    }
  }
);

// logout/disable user's account
router.put(
  "/disable-account/:uuid",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const findUser = await User.findOne({ uuid: req.params.uuid });
      if (findUser) {
        await findUser.updateOne({ isLoggedout: true });
        res.status(200).json("You have successfully logged out this user");
      }
    } catch (err) {
      res.status(500).json("Connection");
    }
  }
);

// enable user's account
router.put(
  "/enable-account/:uuid",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const findUser = await User.findOne({ uuid: req.params.uuid });
      if (findUser) {
        await findUser.updateOne({ isLoggedout: false });
        res.status(200).json("You have successfully enabled this user");
      }
    } catch (err) {
      res.status(500).json("Connection");
    }
  }
);

// pay withdrawal
router.put("/pay/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const findWithdrawn = await Withdraw.findById(req.params.id);
    if (findWithdrawn && findWithdrawn.isPaid == false) {
      await findWithdrawn.updateOne({ isPaid: true });
      res.status(200).json("You have successfully approved this payment");
    } else {
      res.status(404).json("This action has been performed already!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection");
  }
});

module.exports = router;
