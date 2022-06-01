const { Schema, model } = require("mongoose");

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  img: {
    type: String,
    /* required: true */
  },

  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  Appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],

  date: {
    type: Date,
    required: true,
  },
});

module.exports = Company;
