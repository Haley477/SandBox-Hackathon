import { google } from "googleapis";
import { oauth2Client } from "../config/auth";
import { EmailData, EmailListResponse } from "../types/gmailTypes";

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

    // Extract body content
    let bodyContent = "";

    if (email.payload?.body?.data) {
      bodyContent = Buffer.from(email.payload.body.data, "base64").toString(
        "utf-8"
      );
    } else if (email.payload?.parts && email.payload.parts.length > 0) {
      // Try to find text/plain or text/html part
      const textPart = email.payload.parts.find(
        (part) =>
          part.mimeType === "text/plain" || part.mimeType === "text/html"
      );

      if (textPart?.body?.data) {
        bodyContent = Buffer.from(textPart.body.data, "base64").toString(
          "utf-8"
        );
      }
    }

    return {
      id: email.id,
      threadId: email.threadId,
      subject,
      from,
      to,
      date,
      body: bodyContent,
      snippet: email.snippet,
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
}
