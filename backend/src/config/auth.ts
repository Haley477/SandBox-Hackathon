import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
  throw new Error("Missing required environment variables for Google OAuth");
}

// Define Scopes for Gmail API
const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly", // Added read-only permission
  "https://www.googleapis.com/auth/gmail.send", // Added send permission
  "https://www.googleapis.com/auth/gmail.compose", // Added compose permission
];

// Create OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Generate authentication URL
const getAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline", // == refresh token
    scope: SCOPES,
    prompt: "consent",
  });
};

// Get tokens from code
const getTokens = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

// Set credentials to OAuth2 client
const setCredentials = (tokens: any) => {
  oauth2Client.setCredentials(tokens);
};

export { oauth2Client, getAuthUrl, getTokens, setCredentials };
