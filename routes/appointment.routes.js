const router = require("express").Router();
const Appointment = require("../models/Appointment.model");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
const Company = require("../models/Company.model");

// creating an appointment
router.post("/company-apointment", (req, res, next) => {
  const { title, description, date, userId, companyId } = req.body;
  let appointmentId;

  return Appointment.create({
    title,
    description,
    date,
    user: userId,
    company: companyId,
  })
    .then((createdAppointment) => {
      appointmentId = createdAppointment._id;
      return User.findByIdAndUpdate(
        userId,
        {
          $push: { createdAppointment: appointmentId },
        },
        { new: true }
      );
    })
    .then((createdAppointment) => {
      appointmentId = createdAppointment._id;
      return Company.findByIdAndUpdate(
        companyId,
        {
          $push: { createdAppointment: appointmentId },
        },
        { new: true }
      );
    })
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(400).json("Issue creating the appointment"));
});

router.post("/appointment", (req, res, next) => {
  const { title, description, date } = req.body;
  const { _id } = req.payload;

  // CREATING USER APPOINTMENT

  Appointment.create({
    title,
    description,
    date,
    user: _id,
  })
    .then((createdAppointment) => {
      return User.findByIdAndUpdate(
        _id,
        {
          $push: { createdAppointment: createdAppointment._id },
        },
        { new: true }
      );
    })
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res.status(400).json({ message: "Error creating the appointment" })
    );
});

// get all the appointments from the user
router.get("/appointment/user", (req, res, next) => {
  const { _id } = req.payload;

  console.log(req.payload);

  Appointment.find({ user: _id })
    .then((response) => {
      res.status(200).json(response);
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// get all the appointments
router.get("/company/:companyId/appointment", (req, res, next) => {
  const { companyId } = req.params;

  Appointment.find({ company: _id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "No appointment found on this company" });
    });
});

// finding the appointment on the db
router.get("/appointment/:appointmentId", (req, res, next) => {
  const { appointmentId } = req.params;
  Appointment.findById(appointmentId)
    .then((userDB) => res.status(200).json(userDB))
    .catch((err) =>
      res.status(400).json({ message: "Appointment not found!" })
    );
});

// editing the appointment

router.put(
  "/appointment/:appointmentId",
  fileUploader.single("userImg"),
  (req, res, next) => {
    const { appointmentId } = req.params;
    const { title, description, date } = req.body;

    Appointment.findByIdAndUpdate(
      appointmentId,
      {
        title,
        description,
        date,
      },
      {
        new: true,
      }
    )
      .then((response) => res.json(response))
      .catch((err) => {
        res.status(400).json({ message: "No appointment updated" });
      });
  }
);

// deleting the appointment

router.delete("/appointment/:appointmentId", (req, res, next) => {
  const { appointmentId } = req.params;
  Appointment.findByIdAndDelete(appointmentId)
    .then((response) => res.json(response))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Coulndt find this appointment to delete it" })
    );
});

module.exports = router;
