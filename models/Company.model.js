const { Schema, model } = require("mongoose");

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },

  image: {
    type: String,
    /* required: true */
  },

  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],

  openingDate: {
    type: Date,
    /* required: true, */
  },

  closingDate: {
    type: Date,
    /* required: true, */
  },
});

const Company = model("Company", companySchema);

module.exports = Company;
