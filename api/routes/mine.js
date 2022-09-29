const router = require("express").Router();
const User = require("../models/Users");
const { verifyTokenAndAuthorizationAndUser } = require("./verifyToken");

router.put("/", verifyTokenAndAuthorizationAndUser, async (req, res) => {
  const user = await User.findById(req.user.id);

  let time = user.time;
  const currentTime = new Date();
  const totalSeconds = (currentTime - time) / 1000;
  // const hour = Math.floor((totalSeconds / 3600) % 24);
  // console.log(hour)
  const futureDate = new Date(currentTime.setHours(currentTime.getHours() + 24));
  if (user && user.isValidated) {
    if (totalSeconds >= 0) {
      if (user.package === "basic") {
        let mine = 250;
        for (i = mine; i >= 1; i++) {
          await user.updateOne({ $inc: { mineWallet: +i } });
          await user.updateOne({ time: futureDate });
          break;
        }
        res.status(200).json("Mining");
      } else if (user.package === "regular") {
        let mine = 500;
        for (i = mine; i >= 1; i++) {
          await user.updateOne({ $inc: { mineWallet: +i } });
          await user.updateOne({ time: futureDate });
          break;
        }
        res.status(200).json("Mining");
      } else if (user.package === "standard") {
        let mine = 1250;
        for (i = mine; i >= 1; i++) {
          await user.updateOne({ $inc: { mineWallet: +i } });
          await user.updateOne({ time: futureDate });
          break;
        }
        res.status(200).json("Mining");
      } else if (user.package === "professional") {
        let mine = 2500;
        for (i = mine; i >= 1; i++) {
          await user.updateOne({ $inc: { mineWallet: +i } });
          await user.updateOne({ time: futureDate });
          break;
        }
        res.status(200).json("Mining");
      } else if (user.package === "silver") {
        let mine = 5000;
        for (i = mine; i >= 1; i++) {
          await user.updateOne({ $inc: { mineWallet: +i } });
          await user.updateOne({ time: futureDate });
          break;
        }
        res.status(200).json("Mining");
      } else if (user.package === "gold") {
        let mine = 12500;
        for (i = mine; i >= 1; i++) {
          await user.updateOne({ $inc: { mineWallet: +i } });
          await user.updateOne({ time: futureDate });
          break;
        }
        res.status(200).json("Mining");
      } else {
        res.status(403).json("No subscribed package");
      }
    } else {
      res.status(400).json("Mining is currently on");
    }
  } else {
    res.status(403).json("Please validate your account to continue");
  }
});

module.exports = router;
