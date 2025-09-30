const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Check if build directory exists
const buildPath = path.join(__dirname, 'build');
const indexPath = path.join(buildPath, 'index.html');

console.log('Build directory path:', buildPath);
console.log('Build directory exists:', fs.existsSync(buildPath));
console.log('Index.html exists:', fs.existsSync(indexPath));

// Serve static files from the React app build directory
app.use(express.static(buildPath));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  console.log('Requested path:', req.path);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(500).send('React app build not found. Please check the build process.');
  }
});

app.listen(PORT, () => {
  console.log(`Frontend server is running on port ${PORT}`);
  console.log(`Serving files from: ${buildPath}`);
});
