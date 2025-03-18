import { FollowUpService } from "../services/followupService";
import cron from "node-cron";

export class FollowUpScheduler {
  private followUpService: FollowUpService;
  private emailCheckJob: cron.ScheduledTask | null = null;
  private reminderProcessJob: cron.ScheduledTask | null = null;

  constructor(followUpService: FollowUpService) {
    this.followUpService = followUpService;
  }

  /**
   * Start the scheduler with the cron schedule job
   */
  start(): void {
    if (this.emailCheckJob || this.reminderProcessJob) {
      this.stop();
    }
    console.log("Starting FollowUpScheduler");

    // Process new emails evey 4 hours (at 00:00, 04:00, 08:00, 12:00, 16:00, 20:00)
    this.emailCheckJob = cron.schedule("0 0,4,8,12,16,20 * * *", async () => {
      try {
        console.log("Checking for new emails");
        const newRemindersCount = await this.followUpService.processNewEmails();
        console.log(`Processed ${newRemindersCount} new emails`);
      } catch (error) {
        console.error("Error processing new emails", error);
      }
    });

    // Process reminders twicee a day 7am and 7 pm
    this.reminderProcessJob = cron.schedule("0 7,19 * * *", async () => {
      try {
        console.log("Processing reminders");
        const remindersCount = await this.followUpService.processReminders();
        console.log(`Processed ${remindersCount} reminders`);
      } catch (error) {
        console.error("Error processing reminders", error);
      }
    });
    console.log("Follow-up scheduler started successfully");
  }

  /**
   * Stop the scheduler
   */
  stop(): void {
    if (this.emailCheckJob) {
      this.emailCheckJob.stop();
      this.emailCheckJob = null;
    }
    if (this.reminderProcessJob) {
      this.reminderProcessJob.stop();
      this.reminderProcessJob = null;
    }
    console.log("Follow-up scheduler stopped successfully");
  }

  /**
   * Manually trigger checking for new emails
   */
  async manualCheckEmails(maxEamils: number = 20): Promise<number> {
    try {
      console.log(`Manually checking for new emails with max ${maxEamils}`);
      return await this.followUpService.processNewEmails(maxEamils);
    } catch (error) {
      console.log("Error processing new emails", error);
      throw error;
    }
  }

  /**
   * Manually trigger processing of due reminders
   */
  async manualProcessReminders(): Promise<number> {
    try {
      console.log("Manually processing due follow-up reminders...");
      return await this.followUpService.processReminders();
    } catch (error) {
      console.error("Error manually processing follow-up reminders:", error);
      throw error;
    }
  }
}
