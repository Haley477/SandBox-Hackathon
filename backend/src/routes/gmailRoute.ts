import { Router } from "express";
import { GmailController } from "../controllers/gmailController";

const router = Router();
const gmailController = new GmailController();

// Auth routes
router.get("/auth", (req, res) => gmailController.auth(req, res));

router.get("/auth/callback", async (req, res) => {
  try {
    await gmailController.authCallback(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("An error occurred");
  }
});

// Email routes
router.get("/emails", async (req, res) => {
  try {
    await gmailController.getEmails(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("An error occurred");
  }
});

router.get("/emails/:id", async (req, res) => {
  try {
    await gmailController.getEmailById(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("An error occurred");
  }
});

router.post("/email/send", async (req, res) => {
  console.log("POST /send route hit with body:", req.body);
  try {
    await gmailController.sendEmail(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res
      .status(500)
      .json({
        error: "An error occurred",
        details: error instanceof Error ? error.message : String(error),
      });
  }
});

export default router;
