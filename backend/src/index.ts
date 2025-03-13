import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import gmailRoutes from "./routes/gmailRoute";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/debug", (req, res) => {
  res.json({ status: "Server is running", routes: "Registered" });
});

// Debug route to check POST handling
app.post("/debug-post", (req, res) => {
  res.json({
    status: "POST request received",
    body: req.body,
  });
});

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", gmailRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>Gmail API Project</h1>
    <p>This is a Gmail API integration using Node.js, Express, and TypeScript.</p>
    <a href="/auth">Authenticate with Gmail</a>
    <a href="/emails">View emails</a>
    <a href="/compose">Compose email</a>
  `);
});

// Compose email form route
app.get("/compose", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "compose.html"));
});

// Print all registered routes for debugging
console.log("Registered routes:");
app._router.stack.forEach((middleware: any) => {
  if (middleware.route) {
    // Routes registered directly on the app
    console.log(
      `${Object.keys(middleware.route.methods)} ${middleware.route.path}`
    );
  } else if (middleware.name === "router") {
    // Router middleware
    middleware.handle.stack.forEach((handler: any) => {
      if (handler.route) {
        const path = handler.route.path;
        const methods = Object.keys(handler.route.methods);
        console.log(`${methods} ${path}`);
      }
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
