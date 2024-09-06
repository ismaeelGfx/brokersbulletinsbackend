// const mysql = require('mysql');
// require('dotenv').config();
// // Create MySQL connection
// const connection = mysql.createConnection({
//   host:process.env.host,
//   user:process.env.user,
//   password:process.env.password,
//   database:process.env.database
  

// });

// // Database connection configuration
// const dbConfig = {
//   host: process.env.host,
//   user: process.env.user,
//   password: process.env.password,
//   database: process.env.database
// };

// // Maximum number of connection attempts
// const MAX_CONNECTION_ATTEMPTS = 100000000;

// // Delay between retry attempts (in milliseconds)
// const RETRY_DELAY = 3000; // 3 seconds

// // Function to establish database connection with retry logic
// function establishConnectionWithRetry() {
//   let attempts = 0;

//   function tryConnect() {
//     attempts++;
//     console.log(`Attempting to connect to the database. Attempt ${attempts} of ${MAX_CONNECTION_ATTEMPTS}`);

//     const connection = mysql.createConnection(dbConfig);

//     connection.connect((err) => {
//       if (err) {
//         console.error(`Connection attempt failed: ${err.message}`);
//         if (attempts < MAX_CONNECTION_ATTEMPTS) {
//           // Retry after a delay
//           setTimeout(tryConnect, RETRY_DELAY);
//         } else {
//           console.error('Maximum connection attempts reached. Unable to establish connection.');
//         }
//       } else {
//         console.log('Connection established successfully.');
//         // Perform database operations with the established connection
//         // For example: executeQueries(connection);
//       }
//     });
//   }

//   tryConnect();
// }

// // Call the function to start the connection process
// establishConnectionWithRetry();




// function TrackPaxSchema() {
//     connection.connect(err => {
//       if (err) {
//         console.error('Error connecting to MySQL database: ', err);
//         return;
//       }
//       console.log('Connected to MySQL database');
      
//       // Execute SQL commands to create schema and tables
//       const SchemaQueries = [
//         'CREATE SCHEMA IF NOT EXISTS u976218528_Alex_Email;',
//         'USE u976218528_Alex_Email;',





// `CREATE TABLE emails (
    
//     subject VARCHAR(255),
//     time DATETIME,
//     html_body TEXT,
//     request_id VARCHAR(255),
//     screenshot_url VARCHAR(255),
//     from_email VARCHAR(255)
// );

// `,

// `
//     CREATE TABLE users (

//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(255),
//         password VARCHAR(255),
//         email VARCHAR(255)

//     );
// `
// ,
// `
//     CREATE TABLE brands (

//         id INT AUTO_INCREMENT PRIMARY KEY,
//         image_url VARCHAR(255),
//         title VARCHAR(255),
//         site_url VARCHAR(255)

//     );
// `

// ,

// `
//     CREATE TABLE residentialrealestatenewyorkcity (


//         id INT AUTO_INCREMENT PRIMARY KEY,
//         brandname VARCHAR(255),
//         brandemail VARCHAR(255),
//         subject VARCHAR(255),
//         time DATETIME,
//         html_body TEXT,
//         request_id VARCHAR(255),
//         screenshot_url VARCHAR(255),
//         count VARCHAR(255)

//     )


// `,

// `CREATE TABLE residentialrealestateflorida (


//     id INT AUTO_INCREMENT PRIMARY KEY,
//     brandname VARCHAR(255),
//     brandemail VARCHAR(255),
//     subject VARCHAR(255),
//     time DATETIME,
//     html_body TEXT,
//     request_id VARCHAR(255),
//     screenshot_url VARCHAR(255),
//     count VARCHAR(255)

// )
// `
// ,

// `CREATE TABLE commericialrealstatenewyork (


//     id INT AUTO_INCREMENT PRIMARY KEY,
//     brandname VARCHAR(255),
//     brandemail VARCHAR(255),
//     subject VARCHAR(255),
//     time DATETIME,
//     html_body TEXT,
//     request_id VARCHAR(255),
//     screenshot_url VARCHAR(255),
//     count VARCHAR(255)

// )
// `
// ,


// `CREATE TABLE commericialrealstateflorida (


//     id INT AUTO_INCREMENT PRIMARY KEY,
//     brandname VARCHAR(255),
//     brandemail VARCHAR(255),
//     subject VARCHAR(255),
//     time DATETIME,
//     html_body TEXT,
//     request_id VARCHAR(255),
//     screenshot_url VARCHAR(255),
//     count VARCHAR(255)

// )
// `

// ,

// `CREATE TABLE saved_emails (


//     id INT AUTO_INCREMENT PRIMARY KEY,
    
//     subject VARCHAR(255),
//     userid VARCHAR(255),
//     time DATETIME,
//     html_body TEXT,
//     request_id VARCHAR(255),
//     screenshot_url VARCHAR(255),

// )
// `
// ,
// `CREATE TABLE follow_brands (


//     id INT AUTO_INCREMENT PRIMARY KEY,
    
//     image_url VARCHAR(255),
//     userid VARCHAR(255),
//     title VARCHAR(255),
//     brand_email TEXT,
//     category VARCHAR(255),
//     site_url VARCHAR(255)

// )
// `,
//     `
//     CREATE TABLE admin_users (

//         id INT AUTO_INCREMENT PRIMARY KEY,
//         username VARCHAR(255),
//         password VARCHAR(255),
//         email VARCHAR(255)

//     );
    
//     `

//     ,


// `CREATE TABLE residentialrealestateother (


//     id INT AUTO_INCREMENT PRIMARY KEY,
//     brandname VARCHAR(255),
//     brandemail VARCHAR(255),
//     subject VARCHAR(255),
//     time DATETIME,
//     html_body TEXT,
//     request_id VARCHAR(255),
//     screenshot_url VARCHAR(255),
//     count VARCHAR(255)

// )
// `
// ,

// `CREATE TABLE commercialrealestateother (


//     id INT AUTO_INCREMENT PRIMARY KEY,
//     brandname VARCHAR(255),
//     brandemail VARCHAR(255),
//     subject VARCHAR(255),
//     time DATETIME,
//     html_body TEXT,
//     request_id VARCHAR(255),
//     screenshot_url VARCHAR(255),
//     count VARCHAR(255)

// )
// `

// ,


// `CREATE TABLE Liked_Post (


//     id INT AUTO_INCREMENT PRIMARY KEY,
     
//     request_id VARCHAR(255),
//      user_id VARCHAR(255)

// )`







  



//       ];
  
//       SchemaQueries.forEach(query => {
//         connection.query(query, (err, results) => {
//           if (err) {
//             console.error('Error executing query: ', err);
//             return;
//           }
//           console.log('Query executed successfully');
//         });
//       });
//     });
//   }
  

// module.exports = TrackPaxSchema;
