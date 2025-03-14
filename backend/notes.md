# Notes

## Email Information

followupfollowup35@gmail.com

## Google API response

````bash
# Notes

## Email Information

followupfollowup35@gmail.com

## Google API response

```bash
edwin@computer:~/sandbox/hackaton/backend$ npm run dev

> backend@1.0.0 dev
> nodemon src/index.ts

[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node src/index.ts`
Starting FollowUpScheduler
Follow-up scheduler started successfully
Starting FollowUpScheduler
Follow-up scheduler started successfully
Server running on http://localhost:3000
Scheduled tasks:
 - Process new emails: Every 4 hours (00:00, 04:00, 08:00, 12:00, 16:00, 20:00)
 - Process due reminders: Twice daily (07:00, 19:00)
GET / 304 22.337 ms - -
GET /auth 302 6.995 ms - 468
GET /auth/callback?code=4/0AQSTgQHULx_cwyws4f4EAvenU3VNv2xjnzN9RUAn984PIHgmEoOTbuilXin79FXMPvM01Q&scope=https://www.googleapis.com/auth/gmail.readonly%20https://www.googleapis.com/auth/gmail.send%20https://www.googleapis.com/auth/gmail.compose 302 521.395 ms - 36
==== response ==== {
  config: {
    url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10',
    method: 'GET',
    apiVersion: '',
    userAgentDirectives: [ [Object] ],
    paramsSerializer: [Function (anonymous)],
    headers: {
      'x-goog-api-client': 'gdcl/7.2.0 gl-node/20.18.2',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'google-api-nodejs-client/7.2.0 (gzip)',
      Authorization: 'Bearer ya29.a0AeXRPp6RRY2Q9WOYnVm9gJq4i-WsQN9ent-g6Luuw-AulfDMXBeXxU3XbklyJIyi6sSU7QbdDMXapOKTFHySMMqgvoftB5xZ72oFSYh9Zrlx9mbBRgukg3mfiUxT09VdJTFNinQGERRNnG0N90Y4qN7P_rkJZZ0p_WWo5Mc5aCgYKAQ4SARASFQHGX2Midz5qbzj0aFPKeqgRxMOXIg0175'
    },
    params: { maxResults: 10 },
    validateStatus: [Function (anonymous)],
    retry: true,
    responseType: 'unknown',
    errorRedactor: [Function: defaultErrorRedactor]
  },
  data: {
    messages: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    nextPageToken: '02522151178503677861',
    resultSizeEstimate: 201
  },
  headers: {
    'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
    'content-encoding': 'gzip',
    'content-type': 'application/json; charset=UTF-8',
    date: 'Tue, 18 Mar 2025 17:14:27 GMT',
    server: 'ESF',
    'transfer-encoding': 'chunked',
    vary: 'Origin, X-Origin, Referer',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '0'
  },
  status: 200,
  statusText: 'OK',
  request: {
    responseURL: 'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10'
  }
}
GET /emails 200 3179.330 ms - 2832
GET /followup-dashboard 200 19.877 ms - 14364
GET /followup/reminders 200 2.635 ms - 26
Manually checking for new emails with max 20
==== response ==== {
  config: {
    url: 'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=20',
    method: 'GET',
    apiVersion: '',
    userAgentDirectives: [ [Object] ],
    paramsSerializer: [Function (anonymous)],
    headers: {
      'x-goog-api-client': 'gdcl/7.2.0 gl-node/20.18.2',
      'Accept-Encoding': 'gzip',
      'User-Agent': 'google-api-nodejs-client/7.2.0 (gzip)',
      Authorization: 'Bearer ya29.a0AeXRPp6RRY2Q9WOYnVm9gJq4i-WsQN9ent-g6Luuw-AulfDMXBeXxU3XbklyJIyi6sSU7QbdDMXapOKTFHySMMqgvoftB5xZ72oFSYh9Zrlx9mbBRgukg3mfiUxT09VdJTFNinQGERRNnG0N90Y4qN7P_rkJZZ0p_WWo5Mc5aCgYKAQ4SARASFQHGX2Midz5qbzj0aFPKeqgRxMOXIg0175'
    },
    params: { maxResults: 20 },
    validateStatus: [Function (anonymous)],
    retry: true,
    responseType: 'unknown',
    errorRedactor: [Function: defaultErrorRedactor]
  },
  data: {
    messages: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    resultSizeEstimate: 12
  },
  headers: {
    'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
    'content-encoding': 'gzip',
    'content-type': 'application/json; charset=UTF-8',
    date: 'Tue, 18 Mar 2025 17:15:02 GMT',
    server: 'ESF',
    'transfer-encoding': 'chunked',
    vary: 'Origin, X-Origin, Referer',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'x-xss-protection': '0'
  },
  status: 200,
  statusText: 'OK',
  request: {
    responseURL: 'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=20'
  }
}
==== parsedEmails ==== :  [
  {
    id: '195aa3abed865bb0',
    threadId: '195aa3abed865bb0',
    subject: 'Follow Up: Testing Upades Status[remind:1d]',
    from: 'followupfollowup35@gmail.com',
    to: 'edwin16x@gmail.com',
    date: 'Tue, 18 Mar 2025 13:08:51 -0400',
    reminderInstructions: { originalText: '1d', intervals: [Array] }
  },
  {
    id: '195aa3a2b95445bf',
    threadId: '195aa3a2b95445bf',
    subject: 'Testing Upades Status[remind:1d]',
    from: 'Fabian Silvestre <edwin16x@gmail.com>',
    to: 'a02305847@usu.edu',
    date: 'Tue, 18 Mar 2025 11:08:01 -0600',
    reminderInstructions: { originalText: '1d', intervals: [Array] }
  },
  {
    id: '195aa31490162aa1',
    threadId: '195aa31490162aa1',
    subject: 'Follow Up: Testing Reminding [remind:1d]',
    from: 'followupfollowup35@gmail.com',
    to: 'edwin16x@gmail.com',
    date: 'Tue, 18 Mar 2025 12:58:31 -0400',
    reminderInstructions: { originalText: '1d', intervals: [Array] }
  },
  {
    id: '195aa2bcc3f50d4f',
    threadId: '195aa2bcc3f50d4f',
    subject: 'Follow Up: Testing: Show Email To Slack[remind:1d]',
    from: 'followupfollowup35@gmail.com',
    to: 'edwin16x@gmail.com',
    date: 'Tue, 18 Mar 2025 12:52:32 -0400',
    reminderInstructions: { originalText: '1d', intervals: [Array] }
  },
  {
    id: '195a9f991a276add',
    threadId: '195a9f991a276add',
    subject: 'Testing: Show Email To Slack[remind:1d]',
    from: 'Fabian Silvestre <edwin16x@gmail.com>',
    to: 'a02305847@usu.edu',
    date: 'Tue, 18 Mar 2025 09:57:27 -0600',
    reminderInstructions: { originalText: '1d', intervals: [Array] }
  },
  {
    id: '195937242f4150e7',
    threadId: '195937242f4150e7',
    subject: 'Follow Up: Testing Reminding [remind:1d]',
    from: 'followupfollowup35@gmail.com',
    to: 'edwin16x@gmail.com',
    date: 'Thu, 13 Mar 2025 23:58:13 -0700',
    reminderInstructions: { originalText: '1d', intervals: [Array] }
  },
  {
    id: '195936247d1d42de',
    threadId: '195936247d1d42de',
    subject: 'Follow Up: Your account is live Ã¢Â€Â“ next, add your business info',
    from: 'followupfollowup35@gmail.com',
    to: 'googlecommunityteam-noreply@google.com',
    date: 'Thu, 13 Mar 2025 23:40:46 -0700',
    reminderInstructions: null
  },
  {
    id: '1959357ebee7f3cb',
    threadId: '1959357ebee7f3cb',
    subject: 'Follow Up: Your account is live Ã¢Â€Â“ next, add your business info',
    from: 'followupfollowup35@gmail.com',
    to: 'googlecommunityteam-noreply@google.com',
    date: 'Thu, 13 Mar 2025 23:29:27 -0700',
    reminderInstructions: null
  },
  {
    id: '195931f8cc65a719',
    threadId: '195931f8cc65a719',
    subject: 'Testing Reminding [remind:1d]',
    from: 'Fabian Silvestre <edwin16x@gmail.com>',
    to: 'a02305847@usu.edu',
    date: 'Thu, 13 Mar 2025 23:27:41 -0600',
    reminderInstructions: { originalText: '1d', intervals: [Array] }
  },
  {
    id: '1958e1d8203fa97f',
    threadId: '1958e1d8203fa97f',
    subject: 'Testing Send Email',
    from: 'followupfollowup35@gmail.com',
    to: 'edwin16x@gmail.com',
    date: 'Wed, 12 Mar 2025 23:07:33 -0700',
    reminderInstructions: null
  },
  {
    id: '1958dadf6ffed14c',
    threadId: '1958dadf6ffed14c',
    subject: 'Teset Follow Up',
    from: 'Fabian Silvestre <edwin16x@gmail.com>',
    to: 'a02305847@usu.edu',
    date: 'Wed, 12 Mar 2025 22:05:27 -0600',
    reminderInstructions: null
  },
  {
    id: '1958d8e18cd5926a',
    threadId: '1958d8e18cd5926a',
    subject: 'Your account is live – next, add your business info',
    from: 'Google Community Team <googlecommunityteam-noreply@google.com>',
    to: 'followupfollowup35@gmail.com',
    date: 'Wed, 12 Mar 2025 20:30:31 -0700',
    reminderInstructions: null
  }
]
Checking email for follow-up: 195aa3abed865bb0
- Subject: Follow Up: Testing Upades Status[remind:1d]
- Has [remind:] in subject: true
Checking email for follow-up: 195aa3a2b95445bf
- Subject: Testing Upades Status[remind:1d]
- Has [remind:] in subject: true
Checking email for follow-up: 195aa31490162aa1
- Subject: Follow Up: Testing Reminding [remind:1d]
- Has [remind:] in subject: true
Checking email for follow-up: 195aa2bcc3f50d4f
- Subject: Follow Up: Testing: Show Email To Slack[remind:1d]
- Has [remind:] in subject: true
Checking email for follow-up: 195a9f991a276add
- Subject: Testing: Show Email To Slack[remind:1d]
- Has [remind:] in subject: true
Checking email for follow-up: 195937242f4150e7
- Subject: Follow Up: Testing Reminding [remind:1d]
- Has [remind:] in subject: true
Checking email for follow-up: 195936247d1d42de
- Subject: Follow Up: Your account is live Ã¢Â€Â“ next, add your business info
- Has [remind:] in subject: false
Checking email for follow-up: 1959357ebee7f3cb
- Subject: Follow Up: Your account is live Ã¢Â€Â“ next, add your business info
- Has [remind:] in subject: false
Checking email for follow-up: 195931f8cc65a719
- Subject: Testing Reminding [remind:1d]
- Has [remind:] in subject: true
Checking email for follow-up: 1958e1d8203fa97f
- Subject: Testing Send Email
- Has [remind:] in subject: false
Checking email for follow-up: 1958dadf6ffed14c
- Subject: Teset Follow Up
- Has [remind:] in subject: false
Checking email for follow-up: 1958d8e18cd5926a
- Subject: Your account is live – next, add your business info
- Has [remind:] in subject: false
POST /followup/process 200 4256.521 ms - 90
GET /followup/reminders 200 1.969 ms - 3072
Reminder b0780305-f0ea-4984-80bc-7c53b813c256 sent successfully
Reminder b0780305-f0ea-4984-80bc-7c53b813c256 status updated to completed
POST /followup/reminders/b0780305-f0ea-4984-80bc-7c53b813c256/send 200 859.812 ms - 512

````

Did {email} follow up about {Subjet}

```

Did {email} follow up about {Subjet}
```
