import { Request, Response } from "express";
import { FollowUpService } from "../services/followupService";
import { GmailService } from "../services/gmailService";
import { FollowUpScheduler } from "../scheduler/followupScheduler";

export class FollowUpController {
  private followupService: FollowUpService;
  private scheduler: FollowUpScheduler;

  constructor() {
    const gmailService = new GmailService();
    const serviceEmailAddress =
      process.env.FOLLOWUP_SERVICE_EMAIL || "followupfollowup35@gmail.com";

    this.followupService = new FollowUpService(
      gmailService,
      serviceEmailAddress
    );
    this.scheduler = new FollowUpScheduler(this.followupService);

    // Start the scheduler when controller is instantiated
    this.startScheduler();
  }

  /**
   * Start the follow-up scheduler
   * @returns void
   */
  private startScheduler(): void {
    this.scheduler.start();
  }

  /**
   * Process new emails for follow-up reminders
   */
  async processNewEmails(req: Request, res: Response): Promise<void> {
    try {
      const maxEmails = req.body.maxEmails ? parseInt(req.body.maxEmails) : 20;
      const newRemindersCount = await this.scheduler.manualCheckEmails(
        maxEmails
      );

      res.status(200).json({
        message: `Processed new emails and created ${newRemindersCount} follow-up reminders`,
        newRemindersCount,
      });
    } catch (error) {
      console.error("Error processing new emails:", error);
      res.status(500).json({
        error: "Failed to process new emails",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Process and send due reminders
   */
  async processReminders(req: Request, res: Response): Promise<void> {
    try {
      const sentCount = await this.scheduler.manualProcessReminders();

      res.status(200).json({
        message: `Processed and sent ${sentCount} follow-up reminders`,
        sentCount,
      });
    } catch (error) {
      console.error("Error processing reminders:", error);
      res.status(500).json({
        error: "Failed to process reminders",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Get all reminders
   */
  async getReminders(req: Request, res: Response): Promise<void> {
    try {
      const reminders = this.followupService.getAllReminders();

      res.status(200).json({
        count: reminders.length,
        reminders,
      });
    } catch (error) {
      console.error("Error getting reminders:", error);
      res.status(500).json({
        error: "Failed to get reminders",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Get a specific reminder by ID
   */
  async getReminderById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          error: "Reminder ID is required",
        });
        return;
      }

      const reminder = this.followupService.getReminder(id);

      if (!reminder) {
        res.status(404).json({
          error: `Reminder with ID ${id} not found`,
        });
        return;
      }

      res.status(200).json(reminder);
    } catch (error) {
      console.error("Error getting reminder by ID:", error);
      res.status(500).json({
        error: "Failed to get reminder",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Update a reminder
   */
  async updateReminder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      if (!id) {
        res.status(400).json({
          error: "Reminder ID is required",
        });
        return;
      }

      // Sanitize updates to prevent changing critical fields
      const sanitizedUpdates = { ...updates };
      delete sanitizedUpdates.id;
      delete sanitizedUpdates.emailId;
      delete sanitizedUpdates.threadId;

      const success = this.followupService.updateReminder(id, sanitizedUpdates);

      if (!success) {
        res.status(404).json({
          error: `Reminder with ID ${id} not found`,
        });
        return;
      }

      const updatedReminder = this.followupService.getReminder(id);

      res.status(200).json({
        message: `Reminder with ID ${id} updated successfully`,
        reminder: updatedReminder,
      });
    } catch (error) {
      console.error("Error updating reminder:", error);
      res.status(500).json({
        error: "Failed to update reminder",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Delete a reminder
   */
  async deleteReminder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          error: "Reminder ID is required",
        });
        return;
      }

      const success = this.followupService.deleteReminder(id);

      if (!success) {
        res.status(404).json({
          error: `Reminder with ID ${id} not found`,
        });
        return;
      }

      res.status(200).json({
        message: `Reminder with ID ${id} deleted successfully`,
      });
    } catch (error) {
      console.error("Error deleting reminder:", error);
      res.status(500).json({
        error: "Failed to delete reminder",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Force send a reminder and update its status
   */
  async sendForceReminder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          error: "Reminder ID is required",
        });
        return;
      }

      await this.followupService.sendForceReminder(id);

      const updatedReminder = this.followupService.getReminder(id);

      res.status(200).json({
        message: `Reminder with ID ${id} sent successfully`,
        reminder: updatedReminder,
      });
    } catch (error) {
      console.log("Error sending reminder:", error);
      res.status(500).json({
        error: "Failed to send reminder",
        details: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
