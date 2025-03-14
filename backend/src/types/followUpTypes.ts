export interface FollowUpReminder {
  id: string;
  emailId: string;
  threadId: string;
  subject: string;
  sender: string;
  recipient: string;
  sentDate: string;
  reminderDate: Date;
  reminderCount: number;
  active: boolean;
}

export interface FollowUpStorage {
  reminders: FollowUpReminder[];
  lastChecked: Date | null;
}
