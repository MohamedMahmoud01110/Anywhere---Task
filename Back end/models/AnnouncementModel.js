const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    doctorName: { type: String, required: true },
    course: { type: String, required: true },
    message: { type: String, required: true },
    avatar: { type: String, default: "" },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Announcement", announcementSchema);
