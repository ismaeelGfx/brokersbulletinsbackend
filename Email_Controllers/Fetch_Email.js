 








// require('dotenv').config(); // Load environment variables from .env file
// const { google } = require('googleapis');
// const axios = require('axios');
// const puppeteer = require('puppeteer');
// const pool = require('../db'); // Import your database connection pool
// const { v2: cloudinary } = require('cloudinary');
// const fs = require('fs');

// /**
//  * Fetch emails from Gmail and save HTML bodies to the database.
//  * @returns {Promise<string>} A message indicating the result.
//  */
// async function fetchEmailsAndSave(req,res,next) {

//   const {accessToken1}= req.body


//   cloudinary.config({ 
//     cloud_name: 'degjqq6vo', 
//     api_key: '931586755159861', 
//     api_secret: 'srP60IfpOAFm-cDIlGz7pVRrYw8' 
//   });

//   // Directly use the provided access token
//   const accessToken = accessToken1;

//   if (accessToken) {
//     await listMessages(accessToken);
//     return 'Emails fetched and HTML bodies saved to database.';
//   } else {
//     return 'Failed to get access token.';
//   }
// }

// /**
//  * Lists the labels in the user's account.
//  *
//  * @param {string} accessToken The access token.
//  */
// async function listMessages(accessToken) {
//   const auth = new google.auth.OAuth2();
//   auth.setCredentials({ access_token: accessToken });
//   const gmail = google.gmail({ version: 'v1', auth });
//   const res = await gmail.users.messages.list({
//     userId: 'me',
//     q: 'in:inbox',
//   });
//   const messages = res.data.messages;
//   if (messages.length) {
//     console.log('Messages:');
//     for (const message of messages) {
//       const messageData = await gmail.users.messages.get({
//         userId: 'me',
//         id: message.id,
//         format: 'full'
//       });
//       const htmlBody = extractHtmlBody(messageData.data);
//       await saveHtmlToDatabase(htmlBody, message.id, messageData.data);
//     }
//   } else {
//     console.log('No messages found.');
//   }
// }

// /**
//  * Extracts HTML body from the message data.
//  *
//  * @param {Object} messageData The message data object.
//  * @returns {string} The HTML body.
//  */
// function extractHtmlBody(messageData) {
//   const parts = messageData.payload.parts;
//   let htmlBody = '';
//   if (parts && parts.length) {
//     const htmlPart = parts.find(part => part.mimeType === 'text/html');
//     if (htmlPart) {
//       htmlBody = Buffer.from(htmlPart.body.data, 'base64').toString();
//     } else {
//       const alternativePart = parts.find(part => part.mimeType === 'multipart/alternative');
//       if (alternativePart && alternativePart.parts && alternativePart.parts.length) {
//         const htmlPartInAlternative = alternativePart.parts.find(part => part.mimeType === 'text/html');
//         if (htmlPartInAlternative) {
//           htmlBody = Buffer.from(htmlPartInAlternative.body.data, 'base64').toString();
//         }
//       }
//     }
//   }
//   return htmlBody;
// }

// /**
//  * Extracts email details such as subject and time from the message data.
//  *
//  * @param {Object} messageData The message data object.
//  * @returns {Object} An object containing email details.
//  */
// function extractEmailDetails(messageData) {
//   const subject = messageData.payload.headers.find(header => header.name === 'Subject').value;
//   const time = new Date(parseInt(messageData.internalDate));
//   const fromEmail = messageData.payload.headers.find(header => header.name === 'From').value; // Get the email address from which the email was received
//   return { subject, time, fromEmail };
// }

// /**
//  * Saves the HTML body, subject, time, and screenshot to Cloudinary and updates the database with the Cloudinary URL.
//  *
//  * @param {string} htmlBody The HTML body to save.
//  * @param {string} requestId The request ID.
//  * @param {Object} messageData The message data object containing email details.
//  * @returns {Promise<void>}
//  */
// async function saveHtmlToDatabase(htmlBody, requestId, messageData) {
//   if (!htmlBody) {
//     console.log(`HTML body for request ID ${requestId} is empty. Skipping insertion into the database.`);
//     return;
//   }

//   try {
//     const emailDetails = extractEmailDetails(messageData);
//     const { subject, time, fromEmail } = emailDetails;

//     pool.getConnection(async (err, connection) => {
//       if (err) {
//         console.error('Error getting database connection:', err);
//         return;
//       }

//       // Check if the request ID already exists in the database
//       const checkQuery = 'SELECT COUNT(*) AS count FROM emails WHERE request_id = ?';
//       connection.query(checkQuery, [requestId], async (checkError, checkResults) => {
//         if (checkError) {
//           connection.release();
//           console.error('Error checking request ID in the database:', checkError);
//           return;
//         }

//         const count = checkResults[0].count;
//         if (count > 0) {
//           console.log(`Email with request ID ${requestId} already exists in the database. Skipping.`);
//           connection.release();
//           return;
//         }

//         try {
//           // Take screenshot using Puppeteer
//           const screenshotPath = `screenshot_${requestId}.png`;
//           await takeScreenshot(htmlBody, screenshotPath);

//           // Upload screenshot to Cloudinary
//           const cloudinaryUrl = await uploadToCloudinary(screenshotPath);

//           // Insert email details into the database
//           const insertQuery = 'INSERT INTO emails (html_body, request_id, subject, time, screenshot_url, from_email) VALUES (?, ?, ?, ?, ?, ?)';
//           const values = [htmlBody, requestId, subject, time, cloudinaryUrl, fromEmail];
//           connection.query(insertQuery, values, (insertError, insertResults) => {
//             if (insertError) {
//               console.error('Error saving HTML body to database:', insertError);
//             } else {
//               console.log('HTML body and email details saved to database.');
//             }

//             // Delete local screenshot file
//             fs.unlink(screenshotPath, (unlinkError) => {
//               if (unlinkError) {
//                 console.error('Error deleting local screenshot file:', unlinkError);
//               } else {
//                 console.log('Local screenshot file deleted.');
//               }
//             });
//           });
//         } catch (error) {
//           console.error('Error:', error);
//         } finally {
//           connection.release(); // Release the connection back to the pool
//         }
//       });
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// /**
//  * Takes a screenshot of the HTML content and saves it to the specified path.
//  *
//  * @param {string} htmlContent The HTML content to take a screenshot of.
//  * @param {string} screenshotPath The path to save the screenshot.
//  * @returns {Promise<void>}
//  */
// async function takeScreenshot(htmlContent, screenshotPath) {
//   const browser = await puppeteer.launch({ 
//     args:
//      [
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       '--disable-dev-shm-usage',
//       '--disable-accelerated-2d-canvas',
//       '--disable-gpu',
//       '--no-zygote',
//       '--single-process', // Important to try and avoid forking issues
//       '--disable-software-rasterizer'

//   ],
//   timeout: 60000

//   });
//   const page = await browser.newPage();
//   await page.setContent(htmlContent);
//   await page.screenshot({ path: screenshotPath });
//   await browser.close();
// }

// /**
//  * Uploads the screenshot to Cloudinary.
//  *
//  * @param {string} screenshotPath The path to the screenshot file.
//  * @returns {Promise<string>} The Cloudinary URL of the uploaded screenshot.
//  */
// async function uploadToCloudinary(screenshotPath) {
//   try {
//     const cloudinaryResponse = await cloudinary.uploader.upload(screenshotPath);
//     return cloudinaryResponse.secure_url;
//   } catch (error) {
//     console.error('Error uploading screenshot to Cloudinary:', error);
//     return null;
//   }
// }



require('dotenv').config(); // Load environment variables from .env file
const { google } = require('googleapis');
const axios = require('axios');
const puppeteer = require('puppeteer');
const pool = require('../db'); // Import your database connection pool
const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

/**
 * Fetch emails from Gmail and save HTML bodies to the database.
 * @returns {Promise<string>} A message indicating the result.
 */
async function fetchEmailsAndSave(req, res, next) {
  const { accessToken1 } = req.body;

 

  // Directly use the provided access token
  const accessToken = accessToken1;

  if (accessToken) {
    await listMessages(accessToken);
    return 'Emails fetched and HTML bodies saved to database.';
  } else {
    return 'Failed to get access token.';
  }
}

/**
 * Lists the labels in the user's account.
 *
 * @param {string} accessToken The access token.
 */
async function listMessages(accessToken) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'in:inbox',
  });
  const messages = res.data.messages;
  if (messages.length) {
    console.log('Messages:');
    for (const message of messages) {
      const messageData = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
        format: 'full'
      });
      const htmlBody = extractHtmlBody(messageData.data);
      await saveHtmlToDatabase(htmlBody, message.id, messageData.data);
      // Wait for 4 seconds before processing the next message
      await delay(4000);
    }
  } else {
    console.log('No messages found.');
  }
}

/**
 * Delays execution for a given number of milliseconds.
 *
 * @param {number} ms The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Extracts HTML body from the message data.
 *
 * @param {Object} messageData The message data object.
 * @returns {string} The HTML body.
 */
function extractHtmlBody(messageData) {
  const parts = messageData.payload.parts;
  let htmlBody = '';
  if (parts && parts.length) {
    const htmlPart = parts.find(part => part.mimeType === 'text/html');
    if (htmlPart) {
      htmlBody = Buffer.from(htmlPart.body.data, 'base64').toString();
    } else {
      const alternativePart = parts.find(part => part.mimeType === 'multipart/alternative');
      if (alternativePart && alternativePart.parts && alternativePart.parts.length) {
        const htmlPartInAlternative = alternativePart.parts.find(part => part.mimeType === 'text/html');
        if (htmlPartInAlternative) {
          htmlBody = Buffer.from(htmlPartInAlternative.body.data, 'base64').toString();
        }
      }
    }
  }
  return htmlBody;
}

/**
 * Extracts email details such as subject and time from the message data.
 *
 * @param {Object} messageData The message data object.
 * @returns {Object} An object containing email details.
 */
function extractEmailDetails(messageData) {
  const subject = messageData.payload.headers.find(header => header.name === 'Subject').value;
  const time = new Date(parseInt(messageData.internalDate));
  const fromEmail = messageData.payload.headers.find(header => header.name === 'From').value; // Get the email address from which the email was received
  return { subject, time, fromEmail };
}

/**
 * Saves the HTML body, subject, time, and screenshot to Cloudinary and updates the database with the Cloudinary URL.
 *
 * @param {string} htmlBody The HTML body to save.
 * @param {string} requestId The request ID.
 * @param {Object} messageData The message data object containing email details.
 * @returns {Promise<void>}
 */
async function saveHtmlToDatabase(htmlBody, requestId, messageData) {
  if (!htmlBody) {
    console.log(`HTML body for request ID ${requestId} is empty. Skipping insertion into the database.`);
    return;
  }

  try {
    const emailDetails = extractEmailDetails(messageData);
    const { subject, time, fromEmail } = emailDetails;

    pool.getConnection(async (err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        return;
      }

      // Check if the request ID already exists in the database
      const checkQuery = 'SELECT COUNT(*) AS count FROM emails WHERE request_id = ?';
      connection.query(checkQuery, [requestId], async (checkError, checkResults) => {
        if (checkError) {
          connection.release();
          console.error('Error checking request ID in the database:', checkError);
          return;
        }

        const count = checkResults[0].count;
        if (count > 0) {
          console.log(`Email with request ID ${requestId} already exists in the database. Skipping.`);
          connection.release();
          return;
        }

        try {
          // Take screenshot using Puppeteer
          const screenshotPath = `screenshot_${requestId}.png`;
          await takeScreenshot(htmlBody, screenshotPath);

          // Upload screenshot to Cloudinary
          const cloudinaryUrl = await uploadToCloudinary(screenshotPath);

          // Insert email details into the database
          const insertQuery = 'INSERT INTO emails (html_body, request_id, subject, time, screenshot_url, from_email) VALUES (?, ?, ?, ?, ?, ?)';
          const values = [htmlBody, requestId, subject, time, cloudinaryUrl, fromEmail];
          connection.query(insertQuery, values, (insertError, insertResults) => {
            if (insertError) {
              console.error('Error saving HTML body to database:', insertError);
            } else {
              console.log('HTML body and email details saved to database.');
            }

            // Delete local screenshot file
            fs.unlink(screenshotPath, (unlinkError) => {
              if (unlinkError) {
                console.error('Error deleting local screenshot file:', unlinkError);
              } else {
                console.log('Local screenshot file deleted.');
              }
            });
          });
        } catch (error) {
          console.error('Error:', error);
        } finally {
          connection.release(); // Release the connection back to the pool
        }
      });
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Takes a screenshot of the HTML content and saves it to the specified path.
 *
 * @param {string} htmlContent The HTML content to take a screenshot of.
 * @param {string} screenshotPath The path to save the screenshot.
 * @returns {Promise<void>}
 */
async function takeScreenshot(htmlContent, screenshotPath) {
  const browser = await puppeteer.launch({ 
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--no-zygote',
      '--single-process', // Important to try and avoid forking issues
      '--disable-software-rasterizer'
    ],
    timeout: 60000
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  await page.screenshot({ path: screenshotPath });
  await browser.close();
}

/**
 * Uploads the screenshot to Cloudinary.
 *
 * @param {string} screenshotPath The path to the screenshot file.
 * @returns {Promise<string>} The Cloudinary URL of the uploaded screenshot.
 */
async function uploadToCloudinary(screenshotPath) {
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(screenshotPath);
    return cloudinaryResponse.secure_url;
  } catch (error) {
    console.error('Error uploading screenshot to Cloudinary:', error);
    return null;
  }
}

module.exports = { fetchEmailsAndSave };



module.exports = {
  fetchEmailsAndSave
};


