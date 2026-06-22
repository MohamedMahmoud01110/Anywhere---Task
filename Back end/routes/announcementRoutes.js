const express = require("express");
const router = express.Router();
const catchAsync = require("../middleware/CatchAsync");
const AnnouncementController = require("../controllers/announcementController");

router.post("/", catchAsync(AnnouncementController.createAnnouncement));
router.get("/", catchAsync(AnnouncementController.getAnnouncements));
router.get("/:id", catchAsync(AnnouncementController.getAnnouncementById));
router.put("/:id", catchAsync(AnnouncementController.updateAnnouncement));
router.delete("/:id", catchAsync(AnnouncementController.deleteAnnouncement));

module.exports = router;
