import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import gmailRoutes from "./routes/gmailRoute";
import followupRoutes from "./routes/followupRoutes";
import { FollowUpController } from "./controllers/followupController";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the FollowUpController to start the scheduler
const followupController = new FollowUpController();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Static files
const rootDir = __dirname;
app.use(express.static(path.join(rootDir, "public")));

const viewsPath = path.join(rootDir, "views");

// Routes
app.use("/", gmailRoutes);
app.use("/", followupRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>Gmail API Project</h1>
    <p>This is a Gmail API integration using Node.js, Express, and TypeScript.</p>
    <a href="/auth">Authenticate with Gmail</a>
    <a href="/emails">View emails</a>
    <a href="/compose">Compose email</a>
  `);
});

app.get("/followup-dashboard", (req, res) => {
  res.sendFile(path.join(viewsPath, "followup-dashboard.html"));
});

// Server status endpoint
app.get("/status", (req, res) => {
  res.json({
    status: "running",
    serverTime: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Scheduled tasks:");
  console.log(
    " - Process new emails: Every 4 hours (00:00, 04:00, 08:00, 12:00, 16:00, 20:00)"
  );
  console.log(" - Process due reminders: Twice daily (07:00, 19:00)");
});

process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit(0);
});
