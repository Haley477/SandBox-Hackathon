export interface EmailData {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload?: {
    headers: Array<{
      name: string;
      value: string;
    }>;
    body?: {
      data?: string;
    };
    parts?: Array<{
      mimeType: string;
      body: {
        data?: string;
      };
    }>;
  };
  internalDate?: string;
}

export interface EmailListResponse {
  emails: EmailData[];
  nextPageToken?: string;
  resultSizeEstimate?: number;
}

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  scope: string;
  token_type: string;
  expiry_date: number;
}

export interface ReminderInstruction {
  originalText: string;
  intervals: number[];
}

export interface ParsedEmail {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  body?: string;
  snippet?: string;
  reminderInstructions?: ReminderInstruction | null;
}

export interface FollowUpReminder {
  id: string;
  emailId: string;
  threadId: string;
  senderEmail: string;
  recipientEmail: string;
  subject: string;
  originalSubject: string;
  sendDate: Date;
  reminderDates: Date[];
  status: "pending" | "sent" | "completed";
  lastSentReminderIndex: number;
}
