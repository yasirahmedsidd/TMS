const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "tms_user",
  },
  company: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  social: {
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = model("tms_profile", ProfileSchema);
