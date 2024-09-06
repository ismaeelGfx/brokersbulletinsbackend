// // const fs = require('fs');
// // const readline = require('readline');
// // const { google } = require('googleapis');

// // // If modifying these scopes, delete token.json.
// // const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// // const TOKEN_PATH = 'token.json'; // Path to store the token

// // // Load client secrets from a local file.
// // fs.readFile('credentials.json', (err, content) => {
// //   if (err) return console.log('Error loading client secret file:', err);
// //   // Authorize a client with credentials, then call the Gmail API.
// //   authorize(JSON.parse(content), listMessages);
// // });

// // /**
// //  * Create an OAuth2 client with the given credentials, and then execute the
// //  * given callback function.
// //  * @param {Object} credentials The authorization client credentials.
// //  * @param {function} callback The callback to call with the authorized client.
// //  */
// // function authorize(credentials, callback) {
// //   const { client_id, client_secret, redirect_uris } = credentials.web;

// //   const oAuth2Client = new google.auth.OAuth2(
// //     client_id, client_secret, redirect_uris[0]);

// //   // Check if we have previously stored a token.
// //   fs.readFile(TOKEN_PATH, (err, token) => {
// //     if (err) return getAccessToken(oAuth2Client, callback);
// //     oAuth2Client.setCredentials(JSON.parse(token));
// //     callback(oAuth2Client);
// //   });
// // }

// // /**
// //  * Get and store new token after prompting for user authorization, and then
// //  * execute the given callback with the authorized OAuth2 client.
// //  * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
// //  * @param {getEventsCallback} callback The callback for the authorized client.
// //  */
// // function getAccessToken(oAuth2Client, callback) {
// //   const authUrl = oAuth2Client.generateAuthUrl({
// //     access_type: 'offline',
// //     scope: SCOPES,
// //   });
// //   console.log('Authorize this app by visiting this url:', authUrl);
// //   const rl = readline.createInterface({
// //     input: process.stdin,
// //     output: process.stdout,
// //   });
// //   rl.question('Enter the code from that page here: ', (code) => {
// //     rl.close();
// //     oAuth2Client.getToken(code, (err, token) => {
// //       if (err) return console.error('Error retrieving access token', err);
// //       oAuth2Client.setCredentials(token);
// //       // Store the token to disk for later program executions
// //       fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
// //         if (err) return console.error(err);
// //         console.log('Token stored to', TOKEN_PATH);
// //       });
// //       callback(oAuth2Client);
// //     });
// //   });
// // }

// // /**
// //  * Lists the labels in the user's account.
// //  *
// //  * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
// //  */
// // function listMessages(auth) {
// //   const gmail = google.gmail({ version: 'v1', auth });
// //   gmail.users.messages.list({
// //     userId: 'me',
// //     q: 'in:inbox',
// //   }, (err, res) => {
// //     if (err) return console.log('The API returned an error: ' + err);
// //     const messages = res.data.messages;
// //     if (messages.length) {
// //       console.log('Messages:');
// //       messages.forEach((message) => {
// //         gmail.users.messages.get({
// //           userId: 'me',
// //           id: message.id,
// //           format: 'full'
// //         }, (err, res) => {
// //           if (err) return console.log('The API returned an error: ' + err);
// //           const messageData = res.data;
// //           console.log('Snippet:', messageData.snippet);
// //           // Print the HTML body of the message
// //           const htmlBody = Buffer.from(messageData.payload.parts[1].body.data, 'base64').toString();
// //           console.log('HTML Body:', htmlBody);
// //         });
// //       });
// //     } else {
// //       console.log('No messages found.');
// //     }
// //   });
// // }


// const fs = require('fs');
// const readline = require('readline');
// const { google } = require('googleapis');

// // If modifying these scopes, delete token.json.
// const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// const TOKEN_PATH = 'token.json'; // Path to store the token

// // Global variable to keep track of the file counter
// let fileCounter = 1;

// // Load client secrets from a local file.
// fs.readFile('credentials.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Gmail API.
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
//     access_token: 'ya29.a0Ad52N38HrloYEDbkI5E7zyxYcb8ydPE4YImjiOZ3gxs92Ivnhhqqv12eiw_udLbYr8-BnFOyqSOI1X8VmU5-uE2eRXU8IaTfMXhL17cN52gb1ZVx1FspOdr60HzL3Rs0gKqI_zAFx3K0zYqUkPhnG6NwjYI_ruWXStvYdQaCgYKAdsSARESFQHGX2Mi0PcXOsPUnMnGPOa8JLOwiQ0173', // Replace 'YOUR_ACCESS_TOKEN_HERE' with the access token from Postman
//     token_type: 'Bearer',
//     scope: 'https://mail.google.com/',
//     expiry_date: new Date().getTime() + 3599 * 1000 // Expiry date calculated based on 'expires_in' field from Postman
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
//             // Check if the HTML body is directly in the parts
//             const htmlPart = messageData.payload.parts.find(part => part.mimeType === 'text/html');
//             if (htmlPart) {
//               htmlBody = Buffer.from(htmlPart.body.data, 'base64').toString();
//             } else {
//               // Check if the HTML body is in multipart/alternative parts
//               const alternativePart = messageData.payload.parts.find(part => part.mimeType === 'multipart/alternative');
//               if (alternativePart && alternativePart.parts && alternativePart.parts.length) {
//                 const htmlPartInAlternative = alternativePart.parts.find(part => part.mimeType === 'text/html');
//                 if (htmlPartInAlternative) {
//                   htmlBody = Buffer.from(htmlPartInAlternative.body.data, 'base64').toString();
//                 }
//               }
//             }
//           }

//           // Save HTML body to a text file
//           saveHtmlToFile(htmlBody);
//         });
//       });
//     } else {
//       console.log('No messages found.');
//     }
//   });
// }

// /**
//  * Saves the HTML body to a text file.
//  *
//  * @param {string} htmlBody The HTML body to save.
//  */
// function saveHtmlToFile(htmlBody) {
//   const fileName = `email_${fileCounter}.html`;
//   fs.writeFile(fileName, htmlBody, (err) => {
//     if (err) {
//       console.error('Error saving HTML body to file:', err);
//     } else {
//       console.log(`HTML body saved to file: ${fileName}`);
//       fileCounter++;
//     }
//   });
// }
