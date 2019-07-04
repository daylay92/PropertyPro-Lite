import { config } from 'dotenv';
import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth';
import propertyRoutes from './routes/property';

// Initialize process.env variables for the .env file
config();

// Create Express app
const app = express();

// Set server port
const port = process.env.PORT || 3000;
app.set('port', port);

// Middlewares For All Requests

// Parse Response Header to include cross resource sharing
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }));

// parse application/json
app.use(json());

// Main Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/property', propertyRoutes);

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
/* eslint no-console : 0 */
// Listen for Requests to Server
app.listen(port, () =>
  console.log(`Amazing stuff is happening on port: ${app.get('port')}`)
);

// Export app for use in test modules
export default app;
