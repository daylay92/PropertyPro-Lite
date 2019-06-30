import { config } from 'dotenv';
import express from 'express';

// Initialize process.env variables for the .env file
config();

// Create Express app
const app = express();

// Set server port
const port = process.env.PORT || 3000;
app.set('port', port);

// Default Route
app.get('/api/v1', (req, res) =>
  res.status(200).json({
    status: 'Success',
    message: 'Welcome to the PropertyPro-Lite API'
  })
);

// Respond to Non-existent Route
app.all('*', (req, res) =>
  res
    .status(404)
    .json({ status: '404 Not Found', message: "This route doesn't exist" })
);

// Listen for Requests to Server
app.listen(port, () =>
  console.log(`Amazing stuff is happening on port: ${app.get('port')}`)
);

// Export app for use in test modules
export default app;
