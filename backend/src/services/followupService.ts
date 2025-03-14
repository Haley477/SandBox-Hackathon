import { GmailService } from "./gmailService";
import { FollowUpReminder, ParsedEmail } from "../types/gmailTypes";
import { v4 as uuidv4 } from "uuid";

export class FollowUpService {
  private gmailService: GmailService;
  private reminders: Map<string, FollowUpReminder> = new Map();

  // Default reminder intervals (in days)
  private defaultReminderIntervals = [1, 3, 7];

  constructor(gmailService: GmailService) {
    this.gmailService = gmailService;
  }

  /**
   * Process emails and create follow-up reminders
   * @param maxEmails Maximum number of emails to process
   * @returns Number of new reminders created
   */
  async processNewEmails(maxEmails = 20): Promise<number> {
    try {
      // Fetch recent emails
      const emailResponse = await this.gmailService.listEmails(maxEmails);

      const parsedEmails = emailResponse.emails.map((email) =>
        this.gmailService.parseEmail(email)
      );

      console.log("==== parsedEmails ==== : ", parsedEmails);
      let newRemindersCount = 0;

      // Process each email
      for (const email of parsedEmails) {
        // Only process emails sent to our follow-up service email
        //TODO : Here we will check for cc or bcc check isFollowUpEmail
        if (this.isFollowUpEmail(email)) {
          const reminder = await this.createReminderFromEmail(email);
          if (reminder) {
            this.reminders.set(reminder.id, reminder);
            newRemindersCount++;
          }
        }
      }

      return newRemindersCount;
    } catch (error) {
      console.error("Error processing new emails:", error);
      throw error;
    }
  }

  /**
   * Process due reminders and send follow-up emails
   * @returns Number of reminders processed
   */
  async processReminders(): Promise<number> {
    const now = new Date();
    let sentCount = 0;

    for (const [id, reminder] of this.reminders.entries()) {
      if (reminder.status === "completed") {
        console.log(`Reminder ${id} is already completed, skipping`);
        continue;
      }

      // Find the next unsent reminder date
      const nextReminderIndex = reminder.lastSentReminderIndex + 1;
      console.log(`Next reminder index: ${nextReminderIndex}`);

      // If we've sent all reminders, mark as completed
      if (nextReminderIndex >= reminder.reminderDates.length) {
        console.log(`All reminders sent for ${id}, marking as completed`);
        reminder.status = "completed";
        continue;
      }

      const nextReminderDate = new Date(
        reminder.reminderDates[nextReminderIndex]
      );

      // If it's time to send the reminder
      if (nextReminderDate <= now) {
        try {
          console.log(`Sending reminder email for ${id}`);
          // Send the reminder email
          await this.sendReminderEmail(reminder);
          console.log(`Successfully sent reminder email for ${id}`);

          // Update reminder status
          reminder.lastSentReminderIndex = nextReminderIndex;
          reminder.status =
            nextReminderIndex >= reminder.reminderDates.length - 1
              ? "completed"
              : "sent";

          sentCount++;
        } catch (error) {
          console.error(`Error sending reminder for ${id}:`, error);
        }
      } else {
        console.log(`Reminder ${id} is not due yet.`);
      }
    }

    return sentCount;
  }

  /**
   * Send a follow-up reminder email
   * @param reminder FollowUpReminder object
   * @returns Promise that resolves when the email is sent
   */
  private async sendReminderEmail(reminder: FollowUpReminder): Promise<void> {
    const subject = `Follow Up: ${reminder.originalSubject}`;

    // Calculate days since original email
    const daysSinceOriginal = Math.floor(
      (new Date().getTime() - reminder.sendDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const body = `
          Hi,

          This is a follow-up reminder about an email you sent ${daysSinceOriginal} days ago:

          To: ${reminder.recipientEmail}
          Subject: ${reminder.originalSubject}

          Did you receive a response? If not, you might want to send a follow-up.

          Thank you,
          Follow Up Service
          `;

    await this.gmailService.sendEmail(
      reminder.senderEmail,
      subject,
      body,
      false
    );
  }

  /**
   * Create a follow-up reminder from an email
   * @param email Parsed email data
   * @returns FollowUpReminder object or null if not a follow-up email
   */
  async createReminderFromEmail(
    email: ParsedEmail
  ): Promise<FollowUpReminder | null> {
    try {
      // Extract sender's email from the "from" field
      const senderEmail = this.extractEmailAddress(email.from);
      if (!senderEmail) {
        console.warn("Could not extract sender email from:", email.from);
        return null;
      }

      // Extract recipient's email from the "to" field
      const recipientEmail = this.extractEmailAddress(email.to);
      if (!recipientEmail) {
        console.warn("Could not extract recipient email from:", email.to);
        return null;
      }

      // Determine reminder intervals (in days)
      let reminderIntervals = this.defaultReminderIntervals;

      if (
        email.reminderInstructions &&
        email.reminderInstructions.intervals.length > 0
      ) {
        reminderIntervals = email.reminderInstructions.intervals;
      }

      // Create reminder dates based on intervals
      const sendDate = new Date(email.date);
      const reminderDates = reminderIntervals.map((days) => {
        const date = new Date(sendDate);
        date.setDate(date.getDate() + days);
        return date;
      });

      // Create and return the reminder object
      return {
        id: uuidv4(),
        emailId: email.id,
        threadId: email.threadId,
        senderEmail,
        recipientEmail,
        subject: `Follow Up: ${email.subject}`,
        originalSubject: email.subject,
        sendDate,
        reminderDates,
        status: "pending",
        lastSentReminderIndex: -1, // No reminders sent yet
      };
    } catch (error) {
      console.error("Error creating reminder from email:", error);
      return null;
    }
  }

  /**
   * Check if an email is intended for our follow-up service
   * @param email Parsed email data
   * @returns Boolean indicating if the email is a follow-up email
   */
  private isFollowUpEmail(email: ParsedEmail): boolean {
    /**
     * We not check the email for cc or bcc
     * Because the email is sent to the follow-up service email address
     */
    // TODO: Here will check for all of the email but we should
    // only check if the email is cc or bcc

    // Only check for [remind:] syntax in subject
    const reminderSyntaxInSubject = email.subject.includes("[remind:");

    console.log(`Checking email for follow-up: ${email.id}`);
    console.log(`- Subject: ${email.subject}`);
    console.log(`- Has [remind:] in subject: ${reminderSyntaxInSubject}`);

    return reminderSyntaxInSubject;
  }

  /**
   * Extract email address from a formatted string (e.g., "Name <email@example.com>")
   * @param formattedEmail Formatted email string
   * @returns Extracted email address or null if not found
   */
  private extractEmailAddress(formattedEmail: string): string | null {
    const match =
      formattedEmail.match(/<([^>]+)>/) ||
      formattedEmail.match(/([^\s<]+@[^\s>]+)/);
    return match ? match[1] : null;
  }

  /**
   * Get all reminders
   * @returns Array of FollowUpReminder objects
   */
  getAllReminders(): FollowUpReminder[] {
    return Array.from(this.reminders.values());
  }

  /**
   * Get a specific reminder by ID
   * @param id Reminder ID
   * @returns FollowUpReminder object or undefined if not found
   */
  getReminder(id: string): FollowUpReminder | undefined {
    return this.reminders.get(id);
  }

  /**
   * Update a reminder
   * @param id Reminder ID
   * @param updates Partial FollowUpReminder object with updated fields
   * @returns Boolean indicating if the reminder was updated successfully
   */
  updateReminder(id: string, updates: Partial<FollowUpReminder>): boolean {
    const reminder = this.reminders.get(id);

    if (!reminder) {
      console.warn(`Attempt to update non-existent reminder ${id}`);
      return false;
    }

    console.log(`Updating reminder ${id} with:`, updates);

    if (updates.reminderDates) {
      const processedDates = updates.reminderDates.map((date) =>
        typeof date === "string" ? new Date(date) : date
      );

      // Sort dates in ascending order
      processedDates.sort((a, b) => a.getTime() - b.getTime());

      console.log(
        `Original dates: ${reminder.reminderDates.map((d) =>
          new Date(d).toISOString()
        )}`
      );
      console.log(
        `Updated dates: ${processedDates.map((d) => d.toISOString())}`
      );

      // Replace the entire array
      reminder.reminderDates = processedDates;

      // Prevent double processing
      delete updates.reminderDates;
    }

    // Apply other updates
    Object.assign(reminder, updates);

    // Save the updated reminder
    this.reminders.set(id, reminder);
    console.log(`Reminder ${id} updated successfully`);

    return true;
  }

  /**
   * Delete a reminder
   * @param id Reminder ID
   * @returns Boolean indicating if the reminder was deleted successfully
   */
  deleteReminder(id: string): boolean {
    return this.reminders.delete(id);
  }
}
