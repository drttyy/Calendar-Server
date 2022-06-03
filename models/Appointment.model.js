const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  date: {
    type: Date,
    /* required: true, */
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
});

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
