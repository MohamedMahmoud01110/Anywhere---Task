const Announcement = require("../models/AnnouncementModel");

exports.createAnnouncement = async (req, res) => {
  const announcement = await Announcement.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      announcement,
    },
  });
};

exports.getAnnouncements = async (req, res) => {
  const { course: courseFilter, read, page = 1, limit = 10 } = req.query;

  const query = {};

  if (courseFilter) query.course = courseFilter;
  if (read !== undefined) query.read = read === "true";

  const pageNum = Number(page);
  const limitNum = Math.min(Number(limit), 50);

  const total = await Announcement.countDocuments(query);

  const announcements = await Announcement.find(query)
    .sort({ createdAt: -1 })
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  res.json({
    status: "success",
    data: {
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      announcements,
    },
  });
};

exports.getAnnouncementById = async (req, res) => {
  const announcement = await Announcement.findById(req.params.id);
  if (!announcement) return res.status(404).json({ message: "Not Found" });
  res.status(200).json({
    status: "success",
    data: {
      announcement,
    },
  });
};

exports.updateAnnouncement = async (req, res) => {
  const announcement = await Announcement.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!announcement) return res.status(404).json({ message: "Not Found" });
  res.status(200).json({
    status: "success",
    message: "updated successfully",
    data: {
      announcement,
    },
  });
};

exports.deleteAnnouncement = async (req, res) => {
  const announcement = await Announcement.findByIdAndDelete(req.params.id);
  if (!announcement) return res.status(404).json({ message: "Not Found" });
  res.status(204).json({
    status: "success",
    message: "deleted successfully",
    data: null,
  });
};
