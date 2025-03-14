import { Router } from "express";
import { FollowUpController } from "../controllers/followupController";

const router = Router();
const followupController = new FollowUpController();

// Process new emails for follow-up reminders
router.post("/followup/process", async (req, res) => {
  try {
    await followupController.processNewEmails(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("An error occurred while processing emails");
  }
});

// Trigger sending of due reminders
router.post("/followup/send-reminders", async (req, res) => {
  try {
    await followupController.processReminders(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("An error occurred while sending reminders");
  }
});

// Get all reminders
router.get("/followup/reminders", async (req, res) => {
  try {
    await followupController.getReminders(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("An error occurred while fetching reminders");
  }
});

// Get a specific reminder
router.get("/followup/reminders/:id", async (req, res) => {
  try {
    await followupController.getReminderById(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("An error occurred while fetching the reminder");
  }
});

// Update a reminder
router.put("/followup/reminders/:id", async (req, res) => {
  try {
    await followupController.updateReminder(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("An error occurred while updating the reminder");
  }
});

// Delete a reminder
router.delete("/followup/reminders/:id", async (req, res) => {
  try {
    await followupController.deleteReminder(req, res);
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).send("An error occurred while deleting the reminder");
  }
});

export default router;
