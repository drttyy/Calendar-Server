const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  createdCompany: [
    {
      type: Schema.Types.ObjectId,
      ref: "Company", //???????? company ou user?
    },
  ],
  createdAppointment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
});

const User = model("User", userSchema);

module.exports = User;
