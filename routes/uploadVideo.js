const express = require("express");
const router = express.Router();
const upload = require("./../middleware/uploads");

router.post("/upload-video", upload.array("video", 4), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ msg: "No video uploaded" });
  }

  const videoUrls = req.files.map(file => {
    return `${req.protocol}://${req.get("host")}/uploads/videos/${file.filename}`;
  });

  res.json({ msg: "Video uploaded successfully", videoUrls });
});

module.exports = router;
