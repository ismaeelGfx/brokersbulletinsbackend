require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs');
const { google } = require('googleapis');
const axios = require('axios');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_PATH = 'token.json'; // Path to store the token

// Global variable to keep track of the file counter
let fileCounter = 1;

// Load client secrets from environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

// Call the main function to start fetching emails
main();

async function main() {
  const accessToken = await getAccessToken(CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN);
  if (accessToken) {
    listMessages(accessToken);
  } else {
    console.log('Failed to get access token.');
  }
}

/**
 * Get access token using refresh token.
 * @param {string} clientId The client ID.
 * @param {string} clientSecret The client secret.
 * @param {string} refreshToken The refresh token.
 * @returns {Promise<string>} Access token.
 */
async function getAccessToken(clientId, clientSecret, refreshToken) {
  try {
    const response = await axios.post('https://accounts.google.com/o/oauth2/token', {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    return null;
  }
}

/**
 * Lists the labels in the user's account.
 *
 * @param {string} accessToken The access token.
 */
function listMessages(accessToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  const gmail = google.gmail({ version: 'v1', auth });
  gmail.users.messages.list({
    userId: 'me',
    q: 'in:inbox',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const messages = res.data.messages;
    if (messages.length) {
      console.log('Messages:');
      messages.forEach((message) => {
        gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const messageData = res.data;
          console.log('Snippet:', messageData.snippet);

          // Find the HTML body
          let htmlBody = '';
          if (messageData.payload.parts && messageData.payload.parts.length) {
            // Check if the HTML body is directly in the parts
            const htmlPart = messageData.payload.parts.find(part => part.mimeType === 'text/html');
            if (htmlPart) {
              htmlBody = Buffer.from(htmlPart.body.data, 'base64').toString();
            } else {
              // Check if the HTML body is in multipart/alternative parts
              const alternativePart = messageData.payload.parts.find(part => part.mimeType === 'multipart/alternative');
              if (alternativePart && alternativePart.parts && alternativePart.parts.length) {
                const htmlPartInAlternative = alternativePart.parts.find(part => part.mimeType === 'text/html');
                if (htmlPartInAlternative) {
                  htmlBody = Buffer.from(htmlPartInAlternative.body.data, 'base64').toString();
                }
              }
            }
          }

          // Save HTML body to a text file
          saveHtmlToFile(htmlBody);
        });
      });
    } else {
      console.log('No messages found.');
    }
  });
}

/**
 * Saves the HTML body to a text file.
 *
 * @param {string} htmlBody The HTML body to save.
 */
function saveHtmlToFile(htmlBody) {
  const fileName = `email_${fileCounter}.html`;
  fs.writeFile(fileName, htmlBody, (err) => {
    if (err) {
      console.error('Error saving HTML body to file:', err);
    } else {
      console.log(`HTML body saved to file: ${fileName}`);
      fileCounter++;
    }
  });
}
