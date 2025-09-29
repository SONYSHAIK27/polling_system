# Render Deployment Guide

## Prerequisites
- GitHub repository with your code
- MongoDB Atlas account (for database)
- Render account

## Deployment Steps

### 1. Backend Service (Node.js)

1. **Create New Web Service on Render**
   - Connect your GitHub repository
   - Choose "Web Service"
   - Configure:
     - **Name**: `poll-system-backend`
     - **Environment**: `Node`
     - **Build Command**: `cd server && npm install`
     - **Start Command**: `cd server && npm start`
     - **Plan**: Free (or paid for better performance)

2. **Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```

3. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note the service URL (e.g., `https://poll-system-backend.onrender.com`)

### 2. Frontend Service (Static Site)

1. **Create New Static Site on Render**
   - Connect your GitHub repository
   - Choose "Static Site"
   - Configure:
     - **Name**: `poll-system-frontend`
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `build`
     - **Plan**: Free

2. **Environment Variables**
   ```
   REACT_APP_SERVER_URL=https://your-backend-service.onrender.com
   ```

3. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete
   - Note the site URL (e.g., `https://poll-system-frontend.onrender.com`)

### 3. Update CORS Settings

After deployment, update the backend CORS settings to include your frontend URL:

```javascript
// In server/index.js
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://your-frontend-service.onrender.com", // Add your frontend URL
    /^https:\/\/.*\.onrender\.com$/,
    /^https:\/\/.*\.netlify\.app$/,
    /^https:\/\/.*\.vercel\.app$/
  ],
  // ... rest of config
};
```

## Important Notes

### Free Plan Limitations
- **WebSocket connections drop after 5 minutes** on free tier
- Services sleep after 15 minutes of inactivity
- Consider upgrading to paid plan for production use

### WebSocket Considerations
- Render supports WebSockets with `wss://` protocol
- No port specification needed in URLs
- SSL termination handled by Render

### Environment Variables
- Set `REACT_APP_SERVER_URL` to your backend service URL
- Ensure MongoDB Atlas allows connections from Render IPs
- Use environment variables for all sensitive data

## Testing Deployment

1. **Backend Health Check**
   - Visit: `https://your-backend-service.onrender.com`
   - Should return: "Polling System Backend is running."

2. **Frontend Access**
   - Visit: `https://your-frontend-service.onrender.com`
   - Should load the polling system interface

3. **WebSocket Connection**
   - Open browser dev tools
   - Check for successful Socket.IO connection
   - Test real-time polling functionality

## Troubleshooting

### Common Issues
1. **CORS Errors**: Update CORS settings with correct frontend URL
2. **WebSocket Connection Failed**: Ensure using `wss://` protocol
3. **MongoDB Connection**: Check connection string and network access
4. **Build Failures**: Verify all dependencies in package.json

### Support
- Render Documentation: https://render.com/docs
- Socket.IO Documentation: https://socket.io/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com
