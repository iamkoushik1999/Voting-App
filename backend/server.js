const path = require("path");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5050;
const isProduction = process.env.NODE_ENV === "production";

// Render (and most PaaS) sit behind a reverse proxy - needed for secure cookies & rate limiting.
app.set("trust proxy", 1);

const connectDB = require("./config/database");
const seedAdmin = require("./config/seedAdmin");
const { errorHandler, notFound } = require("./middleware/errorHandler");

app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());

if (!isProduction) {
  app.use(
    cors({
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  app.use(require("morgan")("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/voter", require("./routes/voterRoutes"));
app.use("/api/candidate", require("./routes/candidateRoutes"));
app.use("/api/public", require("./routes/publicRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, status: "ok" });
});

if (isProduction) {
  const frontendDist = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendDist));
  // Anything that isn't an API route falls through to the SPA's index.html.
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running in development mode");
  });
}

app.use("/api", notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  await seedAdmin();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (${isProduction ? "production" : "development"})`);
  });
};

start();
