const PostJob = require("../models/PostJob");
const SponsoredJob = require("../models/SponsoredJob");
const Task = require("../models/Task");
const TaskProof = require("../models/TaskProof");
const User = require("../models/Users");
const { sendJobNotification } = require("../config/jobNotification.config");
const {
  verifyTokenAndAuthorizationAndUser,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

const https = require("https");
const download = require("download");
const path = require("path");

const router = require("express").Router();

// post a job
router.post("/job", verifyTokenAndAuthorizationAndUser, async (req, res) => {
  try {
    // generate reference num
    const min = Math.ceil(1000);
    const max = Math.floor(1000000);
    const reference = Math.floor(Math.random() * (max - min + 1)) + min;

    const user = await User.findById(req.user.id);
    const wallet = user.taskWallet;
    if (user && user.isValidated) {
      if (wallet >= 500) {
        const workers = req.body.workers;
        const amount = req.body.amount;
        const total = workers * amount;
        const percentageTotal = (total * 10) / 100;
        const totalPayable = total + percentageTotal;
        const postJob = new PostJob({
          uuid: req.user.uuid,
          reference: "REF: " + reference,
          totalPayable: totalPayable,
          jobTitle: req.body.jobTitle,
          jobDesc: req.body.jobDesc,
          jobCat: req.body.jobCat,
          jobSubCat: req.body.jobSubCat,
          workers: req.body.workers,
          jobLink: req.body.jobLink,
          amount: req.body.amount,
          picture: req.body.picture,
        });
        if (totalPayable <= wallet) {
          for (i = totalPayable; i >= 1; i--) {
            await user.updateOne({ $inc: { taskWallet: -i } });
            await user.updateOne({ $push: { task: postJob.id } });
            break;
          }
          let add = 1;
          for (i = add; i >= 1; i++) {
            await user.updateOne({ $inc: { pendingJob: +i } });
            break;
          }
          await postJob.save();
          res.status(200).json(postJob);
          sendJobNotification((id = postJob._id), (uuid = postJob.uuid));
        } else {
          res
            .status(400)
            .json(
              "Available balance not sufficient for the said payment of " +
                totalPayable
            );
        }
      } else {
        res.status(403).json("Available balance must equal 500 or more");
      }
    } else {
      res
        .status(403)
        .json("You must be a valid user to perform this operation.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// post sponsored job
router.post("/job/sponsored", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const newSponsoredJob = new SponsoredJob({
      jobTitle: req.body.jobTitle,
      amount: req.body.amount,
      picture: req.body.picture,
    });
    await newSponsoredJob.save();
    res.status(200).json(newSponsoredJob);
  } catch (err) {
    res.status(500).json("Connection error!");
  }
});

// perform sponsored job
router.post(
  "/perform/sponsored-job/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const findSponsoredJob = await SponsoredJob.findById(req.params.id);
      if (!user.taskDone.includes(req.params.id)) {
        let bonus = findSponsoredJob.amount;
        for (i = bonus; i >= 1; i++) {
          await user.updateOne({ $inc: { taskWallet: +i } });
          await user.updateOne({
            $push: { taskDone: findSponsoredJob.id },
          });
          break;
        }
        res
          .status(200)
          .json(
            "Kindly download image and share on your social handles to receive bonus"
          );
      } else {
        res.status(403).json("This job has already been done by you.");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

//  get all sponsored job by admin
router.get(
  "/sponsored-job/all",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const findSponsoredJob = await SponsoredJob.find();
      res.status(200).json(findSponsoredJob);
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

//  get sponsored job
router.get(
  "/sponsored-job",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const findSponsoredJob = await SponsoredJob.find()
        .sort({ _id: -1 })
        .limit(1);
      res.status(200).json(findSponsoredJob);
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// get single sponsored job by users
router.get(
  "/user-sponsored-job/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const findTask = await SponsoredJob.findById(req.params.id);
      if (findTask) {
        res.status(200).json(findTask);
      } else {
        res.status(404).json("No task uploaded yet");
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// approve sponsored proof by admin
router.put(
  "/approve-task-proof/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const proofId = await TaskProof.findById(req.params.id);
      const proofUploaderId = proofId.uuid;
      const proofUploader = await User.findOne({ uuid: proofUploaderId });
      const job = proofId.jobId;
      const jobId = await SponsoredJob.findOne({ _id: job });
      // console.log(proofUploader)
      if (proofId && !proofId.isApproved) {
        await proofId.updateOne({ isApproved: true });
        await proofId.updateOne({ time: 0 });
        if (proofUploader) {
          let pay = jobId.amount;
          for (i = pay; i >= 1; i++) {
            await proofUploader.updateOne({ $inc: { taskWallet: +i } });
            break;
          }
          let add = 1;
          for (i = add; i >= 1; i++) {
            await proofUploader.updateOne({
              $inc: { successfulSubmission: +i },
            });
            await proofUploader.updateOne({
              $inc: { pendingSubmission: -i },
            });
            break;
          }
          res.status(200).json("Proof successfully approved.");
        }
      } else {
        res.status(403).json("Proof approved already!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// reject sponsored proof by admin
router.put(
  "/reject-task-proof/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const proofId = await TaskProof.findById(req.params.id);
      const proofUploaderId = proofId.uuid;
      const proofUploader = await User.findOne({ uuid: proofUploaderId });
      const job = proofId.jobId;
      // console.log(proofUploader.taskDone);
      if (proofId && !proofId.isApproved) {
        await proofId.updateOne({ isDeclined: true });
        await proofId.updateOne({ time: 0 });
        if (proofUploader.taskDone.includes(job)) {
          // await proofUploader.updateOne({ $pull: { taskDone: job } });
          let add = 1;
          for (i = add; i >= 1; i++) {
            await proofUploader.updateOne({
              $inc: { rejectedSubmission: +i },
            });
            await proofUploader.updateOne({
              $inc: { pendingSubmission: -i },
            });
            break;
          }
          await TaskProof.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }
            // { new: true }
          );
          res.status(200).json("Proof successfully declined.");
        } else {
          res.send("not allowed");
        }
      } else {
        res.status(403).json("Action cannot be undone!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get single posted jobs before approval
router.get(
  "/posted-jobs-details/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const jobs = await PostJob.findById(req.params.id);
      if (jobs) {
        res.status(200).json(jobs);
      } else {
        res.status(404).json("No job posted at the moment");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// get all posted jobs before approval
router.get(
  "/all-posted-jobs",
  verifyTokenAndAuthorizationAndUser,
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

      const jobs = await PostJob.find();
      if (reference) {
        res.status(200).json(search(jobs));
      } else if (jobs) {
        res.status(200).json(jobs);
      } else {
        res.status(404).json("No job posted at the moment");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// get all posted jobs by admin
router.get(
  "/all/posted-jobs",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const jobs = await PostJob.find();
      if (jobs) {
        res.status(200).json(jobs);
      } else {
        res.status(404).json("No job posted at the moment");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// get latest jobs by admin
router.get("/jobs/latest", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const jobs = await PostJob.find().sort({ _id: -1 }).limit(5);
    // const {password, currentPassword, ...others} = users[0]._doc
    if (jobs) {
      res.status(200).json(jobs);
    } else {
      res.status(404).json("No registered user!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Connection error!");
  }
});

// get all posted/approved jobs
router.get(
  "/posted-jobs",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const jobs = await Task.find();
      if (jobs) {
        res.status(200).json(jobs);
      } else {
        res.status(404).json("No job posted at the moment");
      }
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// user upload performed task proof
router.post(
  "/upload-proof/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      // generate reference num
      const min = Math.ceil(1000);
      const max = Math.floor(1000000);
      const reference = Math.floor(Math.random() * (max - min + 1)) + min;

      const user = await User.findById(req.user.id);
      const jobId =
        (await Task.findById(req.params.id)) ||
        (await SponsoredJob.findById(req.params.id));
      const sponsoredJobId = await SponsoredJob.findById(req.params.id);
      // console.log(sponsoredJobId)
      const currentTime = new Date();
      const futureDate = new Date(
        currentTime.setHours(currentTime.getHours() + 72)
      );
      // getting user's uuid to confirm if present already in task proof
      if (user && user.isValidated) {
        if (!user.taskDone.includes(req.params.id)) {
          const uploadProof = new TaskProof({
            uuid: req.user.uuid,
            jobId: jobId.id,
            poster: jobId.uuid,
            jobTitle: jobId.jobTitle,
            amount: jobId.amount,
            reference: "REF: " + reference,
            time: futureDate,
            screenshot: req.body.screenshot,
            shortDesc: req.body.shortDesc,
          });
          await uploadProof.save();
          await user.updateOne({
            $push: { taskDone: jobId.id || sponsoredJobId.id },
          });
          let add = 1;
          for (i = add; i >= 1; i++) {
            await user.updateOne({ $inc: { pendingSubmission: +i } });
            break;
          }
          res.status(200).json("Proof uploaded successfully");
        } else {
          res.status(403).json("This job has already been done by you.");
        }
      } else {
        res
          .status(400)
          .json("User need to be validated to perform this operation.");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// job owner get all uploaded proof of a job
router.get(
  "/uploaded-proof/find-all/:jobId",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const proofId = await TaskProof.find({ jobId: req.params.jobId });
      if (proofId.length >= 1) {
        res.status(200).json(proofId);
      } else res.status(404).json("No proof available");
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// job owner get single uploaded proof of a job
router.get(
  "/uploaded-proof/find-single/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const proof = await TaskProof.findById(req.params.id);
      if (proof) {
        res.status(200).json(proof);
      } else res.status(404).json("No proof available");
    } catch (err) {
      res.status(500).json("Connection error!");
    }
  }
);

// get all approved posted jobs by job poster
router.get(
  "/user-posted-jobs",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const userUuid = user.uuid;
      const findJob = await Task.find({ uuid: userUuid });
      // console.log(user)
      if (findJob.length >= 1) {
        res.status(200).json(findJob);
      } else {
        res.status(404).json("No task uploaded yet");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get taskdone by user
router.get(
  "/task-done",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const userUuid = user.uuid;
      const findJob = await TaskProof.find({ uuid: userUuid });
      // console.log(user)
      if (findJob.length >= 1) {
        res.status(200).json(findJob);
      } else {
        res.status(404).json("No task uploaded yet");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get latest taskdone by user
router.get(
  "/task-done/latest",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const userUuid = user.uuid;
      const findJob = await TaskProof.find({ uuid: userUuid })
        .sort({ _id: -1 })
        .limit(5);
      // console.log(user)
      if (findJob.length >= 1) {
        res.status(200).json(findJob);
      } else {
        res.status(404).json("No task uploaded yet");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// get single job by users
router.get(
  "/user-posted-job/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const findTask = await Task.findById(req.params.id);
      if (findTask) {
        res.status(200).json(findTask);
      } else {
        res.status(404).json("No task uploaded yet");
      }
    } catch (err) {
      // console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// download file
router.get(
  "/download/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const findTask = await Task.findById(req.params.id);
      const url = findTask.picture;
      if (url) {
        https.get(url, () => {
          const file = url;
          // Path to store the downloaded file
          const filePath = path.join(__dirname, "/public");

          download(file, filePath).then(() => {
            console.log("File downloaded successfully!");
          });
        });
        res.status(200).json("File downloaded successfully!");
      } else {
        res.status(404).json("File not found!");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

// approve a proof by job poster
router.put(
  "/approve-job-proof/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const proofId = await TaskProof.findById(req.params.id);
      const proofUploaderId = proofId.uuid;
      const proofUploader = await User.findOne({ uuid: proofUploaderId });
      const job = proofId.jobId;
      const jobId = await Task.findOne({ _id: job });
      // console.log(proofUploader)
      if (user && user.isValidated) {
        if (proofId && !proofId.isApproved) {
          if (req.user.uuid === proofId.poster) {
            await proofId.updateOne({ isApproved: true });
            await proofId.updateOne({ time: 0 });
            if (proofUploader) {
              let pay = jobId.amount;
              for (i = pay; i >= 1; i++) {
                await proofUploader.updateOne({ $inc: { taskWallet: +i } });
                break;
              }
              let add = 1;
              for (i = add; i >= 1; i++) {
                await proofUploader.updateOne({
                  $inc: { successfulSubmission: +i },
                });
                await proofUploader.updateOne({
                  $inc: { pendingSubmission: -i },
                });
                break;
              }
              let applied = 1;
              for (i = applied; i >= 1; i++) {
                await jobId.updateOne({ $inc: { applied: +i } });
                break;
              }
              res.status(200).json("Proof successfully approved.");
            }
          }
        } else {
          res.status(403).json("Proof approved already!");
        }
      }else{
        res.status(403).json("You need to be a valid user to perform this operation.")
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json("Connection error!");
    }
  }
);

// reject a proof by job poster
router.put(
  "/reject-job-proof/:id",
  verifyTokenAndAuthorizationAndUser,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const proofId = await TaskProof.findById(req.params.id);
      const proofUploaderId = proofId.uuid;
      const proofUploader = await User.findOne({ uuid: proofUploaderId });
      const job = proofId.jobId;
      // console.log(proofUploader.taskDone);
      if (user && user.isValidated) {
        if (proofId && !proofId.isApproved) {
          if (req.user.uuid === proofId.poster) {
            await proofId.updateOne({ isDeclined: true });
            await proofId.updateOne({ time: 0 });
            if (proofUploader.taskDone.includes(job)) {
              // await proofUploader.updateOne({ $pull: { taskDone: job } });
              let add = 1;
              for (i = add; i >= 1; i++) {
                await proofUploader.updateOne({
                  $inc: { rejectedSubmission: +i },
                });
                await proofUploader.updateOne({
                  $inc: { pendingSubmission: -i },
                });
                break;
              }
              await TaskProof.findByIdAndUpdate(
                req.params.id,
                { $set: req.body }
                // { new: true }
              );
              res.status(200).json("Proof successfully declined.");
            } else {
              res.send("not allowed");
            }
          }
        } else {
          res.status(403).json("Action cannot be undone!");
        }
      }else{
        res.status(403).json("You need to be a valid user to perform this operation.")
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Connection error!");
    }
  }
);

module.exports = router;
