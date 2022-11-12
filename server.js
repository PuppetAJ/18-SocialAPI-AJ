// Import express & mongoose
const express = require('express');
const mongoose = require('mongoose');

// Instantiate express
const app = express();
// Declare port to use
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes to use
app.use(require('./routes'));

// Connect to mongodb
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-api', 
  {
  useNewUrlParser: true,
  useUnifiedTopology: true
  }
);

// Set debug mode to true
mongoose.set('debug', true);

// Start server
app.listen(PORT, () => console.log(`Server live on http://localhost:${PORT}`));