import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import gmailRoutes from "./routes/gmailRoute";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/", gmailRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>Gmail API Project</h1>
    <p>This is a Gmail API integration using Node.js, Express, and TypeScript.</p>
    <a href="/auth">Authenticate with Gmail</a>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
