const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Static file serving

// MongoDB Connection
const mongoURL = "mongodb+srv://kj9747516:9090kj90@cluster0.dnlxcv0.mongodb.net/sunnybasket?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.error("❌ MongoDB Connection Error!", err));

// Test Route
app.get("/", (req, res) => {
  res.send("API is working fine");
});

// Routes
const videoUploadRoute = require("./routes/uploadVideo");
const uploadRoute = require("./routes/uploads");
const authRoute = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes"); // NEW

app.use("/api", videoUploadRoute);
app.use("/api", uploadRoute);
app.use("/api", authRoute);
app.use("/api", userRoutes);
app.use("/api/products", productRoutes); // NEW

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
