import { Request, Response } from "express";
import { GmailService } from "../services/gmailService";
import { getAuthUrl, getTokens, setCredentials } from "../config/auth";

export class GmailController {
  private gmailService = new GmailService();

  /**
   * Redirect to Google authentication page
   */
  auth(req: Request, res: Response) {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);
  }

  /**
   * Handle OAuth callback and save tokens
   */
  async authCallback(req: Request, res: Response) {
    try {
      const { code } = req.query;

      if (!code || typeof code !== "string") {
        return res.status(400).send("Authorization code is missing");
      }

      const tokens = await getTokens(code);

      // Save tokens to the credentials file
      setCredentials(tokens);

      res.redirect("/emails");
    } catch (error) {
      console.error("Error in auth callback:", error);
      res.status(500).send("Authentication failed");
    }
  }

  /**
   * Get a list of emails
   */
  async getEmails(req: Request, res: Response) {
    try {
      const maxResults = req.query.maxResults
        ? parseInt(req.query.maxResults as string)
        : 10;
      const pageToken = req.query.pageToken as string | undefined;

      const emailListResponse = await this.gmailService.listEmails(
        maxResults,
        pageToken
      );

      // Parse each email to get a cleaner format
      const parsedEmails = emailListResponse.emails.map((email) =>
        this.gmailService.parseEmail(email)
      );

      res.json({
        emails: parsedEmails,
        nextPageToken: emailListResponse.nextPageToken,
        resultSizeEstimate: emailListResponse.resultSizeEstimate,
      });
    } catch (error) {
      console.error("Error getting emails:", error);
      res.status(500).send("Failed to retrieve emails");
    }
  }

  /**
   * Get a specific email by ID
   */
  async getEmailById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send("Email ID is required");
      }

      const email = await this.gmailService.getEmail(id);
      const parsedEmail = this.gmailService.parseEmail(email);

      res.json(parsedEmail);
    } catch (error) {
      console.error("Error getting email by ID:", error);
      res.status(500).send("Failed to retrieve email");
    }
  }
}
