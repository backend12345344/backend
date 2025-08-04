const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const PORT = 4000;


app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Static file serving


const mongoURL = "mongodb+srv://kj9747516:9090kj90@cluster0.dnlxcv0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ MongoDB Connection Error!", err));

app.get("/", (req, res) => {
  res.send("API is working fine");
});

const videoUploadRoute = require("./routes/uploadVideo");
const uploadRoute = require("./routes/uploads");
const authRoute = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");

app.use("/api", videoUploadRoute);
app.use("/api", uploadRoute);
app.use("/api", authRoute);
app.use("/api", userRoutes);




app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
