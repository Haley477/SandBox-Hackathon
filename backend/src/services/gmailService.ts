import { google } from "googleapis";
import { oauth2Client } from "../config/auth";
import {
  EmailData,
  EmailListResponse,
  ReminderInstruction,
} from "../types/gmailTypes";

export class GmailService {
  private gmail = google.gmail({ version: "v1", auth: oauth2Client });

  /**
   * List emails from Gmail inbox
   */
  async listEmails(
    maxResults = 10,
    pageToken?: string
  ): Promise<EmailListResponse> {
    try {
      const response = await this.gmail.users.messages.list({
        userId: "me",
        maxResults,
        pageToken,
      });

      console.log("==== response ====", response);
      const messageIds = response.data.messages || [];
      const emails: EmailData[] = [];

      // Get details for each email
      for (const message of messageIds) {
        if (message.id) {
          const email = await this.getEmail(message.id);
          emails.push(email);
        }
      }

      // TS errorquick fix
      // TODO: Fix this properly
      return {
        emails,
        nextPageToken: response.data.nextPageToken || undefined,
        resultSizeEstimate:
          response.data.resultSizeEstimate !== null
            ? response.data.resultSizeEstimate
            : undefined,
      };
    } catch (error) {
      console.error("Error fetching emails:", error);
      throw error;
    }
  }

  /**
   * Get a specific email by ID
   */
  async getEmail(messageId: string): Promise<EmailData> {
    try {
      const response = await this.gmail.users.messages.get({
        userId: "me",
        id: messageId,
      });

      return response.data as EmailData;
    } catch (error) {
      console.error(`Error fetching email ${messageId}:`, error);
      throw error;
    }
  }

  /**
   * Parse email data to extract headers and content
   */
  parseEmail(email: EmailData) {
    const headers = email.payload?.headers || [];

    // Extract common headers
    const subject =
      headers.find((h) => h.name.toLowerCase() === "subject")?.value ||
      "No Subject";
    const from =
      headers.find((h) => h.name.toLowerCase() === "from")?.value ||
      "Unknown Sender";
    const to =
      headers.find((h) => h.name.toLowerCase() === "to")?.value ||
      "Unknown Recipient";
    const date =
      headers.find((h) => h.name.toLowerCase() === "date")?.value ||
      "Unknown Date";

    const reminderInstructions = this.extractReminderInstructions(subject);

    return {
      id: email.id,
      threadId: email.threadId,
      subject,
      from,
      to,
      date,
      reminderInstructions,
    };
  }

  /**
   * Send an email
   */

  async sendEmail(
    to: string,
    subject: string,
    body: string,
    isHtml: boolean = false
  ): Promise<string> {
    try {
      const profile = await this.gmail.users.getProfile({
        userId: "me",
      });

      const from = profile.data.emailAddress;

      if (!from) {
        throw new Error("Could not retrieve email address");
      }

      // Create content
      let emailContent = "";

      // Headers
      emailContent += `From: ${from}\r\n`;
      emailContent += `To: ${to}\r\n`;
      emailContent += `Subject: ${subject}\r\n`;

      // Content type
      if (isHtml) {
        emailContent += `Content-Type: text/html; charset=utf-8\r\n`;
      } else {
        emailContent += `Content-Type: text/plain; charset=utf-8\r\n`;
      }

      emailContent += "\r\n";
      emailContent += body;

      // Encode email
      const encodedEmail = Buffer.from(emailContent)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      // Send email
      const response = await this.gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedEmail,
        },
      });

      return response.data.id || "Email Sent Successfully";
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  /**
   * Extract reminder instructions from email subject and body
   * @param subject Email subject
   * @returns ReminderInstruction object or null if not found
   */
  extractReminderInstructions(subject: string): ReminderInstruction | null {
    //  Check reminder pattern
    const subjectMatch = subject.match(/\[remind:([^\]]+)\]/i);
    if (subjectMatch && subjectMatch[1]) {
      return this.parseReminderString(subjectMatch[1]);
    }

    return null;
  }

  /**
   * Parse a reminder string into a structured object
   * @param reminderStr The reminder string (e.g., "1d,3d,1w")
   * @returns A structured reminder instruction object
   */
  private parseReminderString(reminderStr: string): ReminderInstruction {
    const intervals: number[] = [];
    const originalText = reminderStr.trim();

    reminderStr.split(",").forEach((part) => {
      part = part.trim().toLowerCase();

      if (!part) return;

      let value = parseInt(part);

      if (isNaN(value)) {
        value = 1; // Default to 1 if no number specified
      }

      if (part.endsWith("d")) {
        // Days
        intervals.push(value);
      } else if (part.endsWith("w")) {
        // Weeks
        intervals.push(value * 7);
      } else if (part.endsWith("m")) {
        // Months (approximate)
        intervals.push(value * 30);
      } else {
        // Assume days if no unit specified
        intervals.push(value);
      }
    });

    // Sort intervals in ascending order
    intervals.sort((a, b) => a - b);

    return {
      originalText,
      intervals: intervals.length > 0 ? intervals : [1, 3, 7],
    };
  }
}
