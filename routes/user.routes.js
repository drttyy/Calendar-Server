const router = require("express").Router();
const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.config");

// finding the user on the db
router.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((userDB) => res.status(200).json(userDB))
    .catch((err) => res.status(400).json({ message: "User not found!" }));
});

// editing the user

router.put(
  "/user/:userId",
  fileUploader.single("userImg"),
  (req, res, next) => {
    const { userId } = req.params;
    const { firstName, lastName, email, password, phonenumber } = req.body;
    if (req.file) {
      User.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
          email,
          password,
          phonenumber,
          image: req.file.path,
        },
        {
          new: true,
        }
      )
        .then((response) => res.json(response))
        .catch((err) => {
          res.status(400).json({ message: "No user updated" });
        });
    } else {
      User.findByIdAndUpdate(
        userId,
        {
          firstName,
          lastName,
          email,
          password,
          phonenumber,
        },
        {
          new: true,
        }
      )
        .then((response) => res.json(response))
        .catch((err) => {
          res.status(400).json({ message: "No user updated" });
        });
    }
  }
);

// deleting the user

router.delete("/user/:userId/delete", (req, res, next) => {
  const { userId } = req.params;
  User.findByIdAndDelete(userId)
    .then((response) => res.json(response))
    .catch((err) =>
      res.status(400).json({ message: "Coulndt find this user to delete it" })
    );
});

module.exports = router;
