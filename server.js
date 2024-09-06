

const express = require('express');
const Routes = require('./routes');
const TrackPaxSchema = require('./Schema/Schema');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Use cors middleware to enable CORS
app.use(cors());

  // TrackPaxSchema();

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Link user routes
app.use('/', Routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
