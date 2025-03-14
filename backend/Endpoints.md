# Email Follow-up Service API Documentation

This document provides details for all API endpoints in the Email Follow-up Service application. The service consists of two main components:

1.  **Gmail Service** - Handles email retrieval and sending functionality
2.  **Follow-up Service** - Manages email follow-up reminders

## Base URL

All API endpoints are relative to your base URL: http://localhost:3000 (or your deployed domain)

## Authentication

### Gmail Authentication

#### GET /auth

Redirects the user to the Google OAuth2 authentication page to authorize access to their Gmail account.

**Response:**

- Redirects to Google's authentication page

#### GET /auth/callback

Callback endpoint for Google OAuth2 authentication flow.

**Query Parameters:**

- code - Authorization code from Google OAuth2

**Response:**

- On success: Redirects to the application home page
- On failure: Returns 500 status code with error message

## Email Management

### GET /emails

Retrieves a list of emails from the user's Gmail account.

**Query Parameters:**

- maxResults (optional) - Maximum number of emails to return (default: 10)
- pageToken (optional) - Token for pagination

**Response:**

```json
{
  "emails": [
    {
      "id": "string",
      "threadId": "string",
      "subject": "string",
      "from": "string",
      "to": "string",
      "date": "string",
      "snippet": "string"
    }
  ],
  "nextPageToken": "string",
  "resultSizeEstimate": 123
}
```

### GET /emails/:id

Retrieves a specific email by its ID.

**URL Parameters:**

- id - The ID of the email to retrieve

**Response:**

```json
{
  "id": "string",
  "threadId": "string",
  "subject": "string",
  "from": "string",
  "to": "string",
  "date": "string",
  "body": "string",
  "snippet": "string"
}
```

### POST /email/send

Sends a new email.

**Request Body:**

````json
{
  "to": "string (recipient email address)",
  "subject": "string",
  "body": "string",
  "isHtml": boolean (optional, default: false)
}```

**Response:**

```json
{
  "id": "string (email ID)",
  "message": "Email sent successfully"
}```

## Follow-up Management

### POST /followup/process

Processes new emails and creates follow-up reminders for emails with the \[remind:pattern\] syntax.

**Request Body:**

```json
{
  "maxEmails": number (optional, default: 20)
}```

**Response:**

```json
{
  "message": "Processed new emails and created X follow-up reminders",
  "newRemindersCount": number
}```

### POST /followup/send-reminders

Processes all pending reminders and sends follow-up emails for those that are due.

**Response:**

```json
{
  "message": "Processed and sent X follow-up reminders",
  "sentCount": number
}```

### GET /followup/reminders

Retrieves all follow-up reminders.

**Response:**

```json
{
  "count": number,
  "reminders": [
    {
      "id": "string (UUID)",
      "emailId": "string",
      "threadId": "string",
      "senderEmail": "string",
      "recipientEmail": "string",
      "subject": "string",
      "originalSubject": "string",
      "sendDate": "string (ISO date)",
      "reminderDates": ["string (ISO date)"],
      "status": "pending|sent|completed",
      "lastSentReminderIndex": number
    }
  ]
}
````

### GET /followup/reminders/:id

Retrieves a specific reminder by its ID.

**URL Parameters:**

- id - The UUID of the reminder to retrieve

**Response:**

```json
{
  "id": "string (UUID)",
  "emailId": "string",
  "threadId": "string",
  "senderEmail": "string",
  "recipientEmail": "string",
  "subject": "string",
  "originalSubject": "string",
  "sendDate": "string (ISO date)",
  "reminderDates": ["string (ISO date)"],
  "status": "pending|sent|completed",
  "lastSentReminderIndex": number
}
```

### PUT /followup/reminders/:id

Updates a specific reminder by its ID.

**URL Parameters:**

- id - The UUID of the reminder to update

**Request Body:**Any partial reminder object. The following fields cannot be updated:

- id
- emailId
- threadId

Example:

```json
{
  "status": "pending",
  "reminderDates": ["2025-03-15T12:00:00.000Z", "2025-03-20T12:00:00.000Z"]
}
```

**Response:**

```json
{
  "message": "Reminder with ID X updated successfully",
  "reminder": {
    "id": "string (UUID)",
    "emailId": "string",
    "threadId": "string",
    "senderEmail": "string",
    "recipientEmail": "string",
    "subject": "string",
    "originalSubject": "string",
    "sendDate": "string (ISO date)",
    "reminderDates": ["string (ISO date)"],
    "status": "pending|sent|completed",
    "lastSentReminderIndex": number
  }
}
```

### DELETE /followup/reminders/:id

Deletes a specific reminder by its ID.

**URL Parameters:**

- id - The UUID of the reminder to delete

**Response:**

```json
{ "message": "Reminder with ID X deleted successfully" }
```

## Error Responses

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

Common HTTP status codes:

- 400 Bad Request - Missing required parameters
- 404 Not Found - Resource not found
- 500 Internal Server Error - Server-side error

## Reminder Patterns

Reminder patterns are specified in the email subject using the format \[remind:pattern\].

The pattern consists of comma-separated values indicating when reminders should be sent:

- Nd - N days (e.g., 1d for 1 day)
- Nw - N weeks (e.g., 2w for 2 weeks)
- Nm - N months (approximately) (e.g., 1m for 1 month)

Examples:

- \[remind:1d,3d,7d\] - Send reminders after 1 day, 3 days, and 7 days
- \[remind:2d,1w,1m\] - Send reminders after 2 days, 1 week, and 1 month

If no unit is specified, days are assumed.

## Dashboard

The application also provides a web interface for managing follow-ups:

- GET /followup-dashboard - Web interface for managing follow-up reminders

## Examples

### Sending an Email with Follow-up Instructions

```bash
POST /email/send  Content-Type: application/json  {    "to": "recipient@example.com",    "subject": "Project Update [remind:1d,3d,1w]",    "body": "Hi,\n\nJust checking in about the project status. Let me know when you have an update.\n\nThanks,\nYour Name"  }
```

### Force Processing a Specific Reminder

```bash
PUT /followup/reminders/0cf30ed1-956c-4cc4-ae80-d3bf0b112218  Content-Type: application/json  {    "status": "pending",    "lastSentReminderIndex": -1,    "reminderDates": ["2025-03-14T06:46:53.710Z"]  }
```

Then trigger processing:

```bash
POST /followup/send-reminders
```
