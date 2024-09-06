const mysql = require('mysql');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 1000, // Adjust as needed
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.db_port,
  acquireTimeout: 0
});

// Handle connection errors
pool.on('error', (err) => {
    console.error('Database connection error:', err);
    // Handle error appropriately, e.g., retry connection, exit application, etc.
});

module.exports = pool;
