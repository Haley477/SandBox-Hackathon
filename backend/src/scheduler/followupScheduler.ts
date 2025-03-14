import { FollowUpService } from "../services/followupService";

//TODO Investigate Job Scheduling Solution
export class FollowUpScheduler {
  private followUpService: FollowUpService;
  private checkInterval: ReturnType<typeof setInterval> | null = null;

  constructor(followUpService: FollowUpService) {
    this.followUpService = followUpService;
  }

  /**
   * Start the scheduler to check for follow-ups
   * @param intervalMinutes How often to check for due reminders (in minutes)
   */
  start(intervalMinutes: number = 60): void {
    if (this.checkInterval) {
      this.stop(); // Stop existing scheduler if running
    }

    console.log(
      `Starting follow-up scheduler. Checking every ${intervalMinutes} minutes.`
    );

    // Run immediately once
    this.checkFollowUps();

    // Then schedule regular checks
    this.checkInterval = setInterval(() => {
      this.checkFollowUps();
    }, intervalMinutes * 60 * 1000);
  }

  /**
   * Stop the scheduler
   */
  stop(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      console.log("Follow-up scheduler stopped.");
    }
  }

  /**
   * Check for follow-ups that are due and process them
   */
  private async checkFollowUps(): Promise<void> {
    try {
      console.log("Checking for due follow-up reminders...");
      const sentCount = await this.followUpService.processReminders();
      console.log(`Processed ${sentCount} follow-up reminders.`);
    } catch (error) {
      console.error("Error processing follow-up reminders:", error);
    }
  }
}
