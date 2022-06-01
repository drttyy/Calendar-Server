const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema({
  tile: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  date: {
    type: Date,
    required: true,
  },
});

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
