const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Add a distinctive test route
app.get('/test', (req, res) => {
  res.send('🎯 THIS IS THE FRONTEND SERVER - If you see this, the frontend is working!');
});

// Add a distinctive root route message
app.get('/', (req, res) => {
  console.log('Root route accessed on FRONTEND server');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('🚨 FRONTEND BUILD NOT FOUND - This is the FRONTEND server, not the backend!');
  }
});

// Check if build directory exists
const buildPath = path.join(__dirname, 'build');
const indexPath = path.join(buildPath, 'index.html');

console.log('Build directory path:', buildPath);
console.log('Build directory exists:', fs.existsSync(buildPath));
console.log('Index.html exists:', fs.existsSync(indexPath));

// Serve static files from the React app build directory
app.use(express.static(buildPath));

// Handle React routing for all other routes
app.get('*', (req, res) => {
  console.log('Requested path:', req.path);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('🚨 REACT FRONTEND BUILD NOT FOUND! This should be the React app, not the backend. Please check the build process. Visit /test to verify this is the frontend server.');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 FRONTEND server is running on port ${PORT}`);
  console.log(`📁 Serving files from: ${buildPath}`);
  console.log(`🌐 This is the REACT FRONTEND service`);
  console.log(`🔍 If you see "Polling System Backend is running" on this URL, there's a routing issue!`);
});
