// const express = require('express');
// const fs = require('fs');
// const { google } = require('googleapis');
// const mysql = require('mysql');
// const pool = require('./db');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // MySQL configuration


// // Google API configurations
// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// const TOKEN_PATH = 'token.json'; // Path to store the token

// // Global variable to keep track of the file counter
// let fileCounter = 1;

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   const credentials = JSON.parse(content);
//   authorizeWithToken(credentials, listMessages);
// });

// /**
//  * Set the provided access token to the OAuth2 client.
//  * @param {Object} credentials The authorization client credentials.
//  * @param {function} callback The callback to call with the authorized client.
//  */
// function authorizeWithToken(credentials, callback) {
//   const { client_id, client_secret, redirect_uris } = credentials.web;
//   const oAuth2Client = new google.auth.OAuth2(
//     client_id, client_secret, redirect_uris[0]);
//   const token = {
//     access_token: 'ya29.a0Ad52N38CEEj0wl14xypzN-m8zSDUZfk1jcjyznw_ox_0YDaJDgjYtU30svTn6zfRT9sm4otXPRAOyI0hw0hz7cCCUx8nqO2t5z4c7xLpUbBGPjuf4BrxDdcLgzo7fcWWo6rFygeze1Xx4-LevUY4TBHP0XTo8awHwuerVwaCgYKAcwSARESFQHGX2MiGeouH_wCOKX8w5MMZTddew0173',
//     token_type: 'Bearer',
//     scope: 'https://mail.google.com/',
//     expiry_date: new Date().getTime() + 3599 * 1000
//   };
//   oAuth2Client.setCredentials(token);
//   callback(oAuth2Client);
// }

// /**
//  * Lists the labels in the user's account.
//  *
//  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//  */
// function listMessages(auth) {
//   const gmail = google.gmail({ version: 'v1', auth });
//   gmail.users.messages.list({
//     userId: 'me',
//     q: 'in:inbox',
//   }, (err, res) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const messages = res.data.messages;
//     if (messages.length) {
//       console.log('Messages:');
//       messages.forEach((message) => {
//         gmail.users.messages.get({
//           userId: 'me',
//           id: message.id,
//           format: 'full'
//         }, (err, res) => {
//           if (err) return console.log('The API returned an error: ' + err);
//           const messageData = res.data;
//           console.log('Snippet:', messageData.snippet);

//           // Find the HTML body
//           let htmlBody = '';
//           if (messageData.payload.parts && messageData.payload.parts.length) {
//             const htmlPart = messageData.payload.parts.find(part => part.mimeType === 'text/html');
//             if (htmlPart) {
//               htmlBody = Buffer.from(htmlPart.body.data, 'base64').toString();
//             } else {
//               const alternativePart = messageData.payload.parts.find(part => part.mimeType === 'multipart/alternative');
//               if (alternativePart && alternativePart.parts && alternativePart.parts.length) {
//                 const htmlPartInAlternative = alternativePart.parts.find(part => part.mimeType === 'text/html');
//                 if (htmlPartInAlternative) {
//                   htmlBody = Buffer.from(htmlPartInAlternative.body.data, 'base64').toString();
//                 }
//               }
//             }
//           }

//           // Save HTML body path and request ID to the database
//           saveHtmlPathAndRequestIdToDatabase(htmlBody, message.id);
//         });
//       });
//     } else {
//       console.log('No messages found.');
//     }
//   });
// }

// /**
//  * Saves the HTML body path and request ID to the database.
//  *
//  * @param {string} htmlBody The HTML body to save.
//  * @param {string} requestId The request ID of the email.
//  */
// function saveHtmlPathAndRequestIdToDatabase(htmlBody, requestId) {
//     const filePath = `emails/email_${fileCounter}.html`;
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.error('Error getting database connection:', err);
//         return;
//       }
//       const sql = 'INSERT INTO emails (html_body, request_id) VALUES (?, ?)';
//       connection.query(sql, [filePath, requestId], (err, result) => {
//         connection.release();
//         if (err) {
//           console.error('Error saving HTML body path and request ID to database:', err);
//         } else {
//           console.log('HTML body path and request ID saved to database.');
//           fileCounter++;
//         }
//       });
//     });
//   }
  

// // Route to access email by its path
// app.get('/email/:id', (req, res) => {
//     const emailId = req.params.id;
//     pool.getConnection((err, connection) => {
//       if (err) {
//         console.error('Error getting database connection:', err);
//         res.status(500).send('Internal server error');
//         return;
//       }
//       const sql = 'SELECT html_body FROM emails WHERE request_id = ?';
//       connection.query(sql, [emailId], (err, result) => {
//         connection.release();
//         if (err || result.length === 0) {
//           console.error('Error fetching email path from database:', err);
//           res.status(404).send('Email not found');
//         } else {
//           const filePath = result[0].html_body;
//           fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//               console.error('Error reading email file:', err);
//               res.status(500).send('Internal server error');
//             } else {
//               res.send(data);
//             }
//           });
//         }
//       });
//     });
//   });
  
// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
