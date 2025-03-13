# README

This is the backend of followUp project.

## Installation with Docker

```bash
docker-compose up
```

## Installation without Docker

```bash
npm install
npm run dev
```

## Endpoints

- GET /auth
  - Redirect to Google authentication page.
- GET /auth/callback
  - Callback from Google authentication.
- GET /emails
  - Get a list of emails
- GET /emails/:id
  - Get a specific email

## Notes

Go to [http://localhost:3000](http://localhost:3000) to see the app running.
