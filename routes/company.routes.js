const router = require("express").Router();
const Company = require("../models/Company.model");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// finding the company on the db
router.get("/company/:companyId", (req, res, next) => {
  const { companyId } = req.params;
  Company.findById(companyId)
    .populate("appointments")
    .then((userDB) => res.status(200).json(userDB))
    .catch((err) => res.status(400).json({ message: "User not found!" }));
});

// editing the company

router.put(
  "/company/:companyId",
  fileUploader.single("userImg"),
  (req, res, next) => {
    const { companyId } = req.params;
    const { name, type, address, openingDate, closingDate } = req.body;
    if (req.file) {
      Company.findByIdAndUpdate(
        companyId,
        {
          name,
          type,
          address,
          openingDate,
          closingDate,
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
      Company.findByIdAndUpdate(
        companyId,
        {
          name,
          type,
          address,
          openingDate,
          closingDate,
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

// deleting the company

router.delete("/company/:companyId", (req, res, next) => {
  const { companyId } = req.params;
  Company.findByIdAndDelete(companyId)
    .then((response) => res.json(response))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Coulndt find this company to delete it" })
    );
});

router.post(
  "/create-company",
  /* fileUploader.single("companyImg"), */
  (req, res, next) => {
    let { name, type, address, openingDate, closingDate, image } = req.body;
    let { _id } = req.payload;
    console.log(req.body);
    Company.create({
      name,
      type,
      address,
      openingDate,
      closingDate,
      image,
      user: _id,
    })
      .then((company) => {
        return User.findByIdAndUpdate(
          _id,
          {
            $push: { createdCompany: company._id },
          },
          { new: true }
        );
      })
      .then((response) => res.status(200).json(response))
      .catch((err) => {
        res.status(400).json("Issue creating the company");
      });
  }
);

// get all the companies
router.get("/company", (req, res, next) => {
  Company.find({})
    .then((allCompanies) => {
      res.status(200).json(allCompanies);
    })
    .catch((err) => res.status(400).json({ message: "No companies found" }));
});

module.exports = router;
