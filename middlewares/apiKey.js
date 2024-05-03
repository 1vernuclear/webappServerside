const ApiKey = require('./models/ApiKey'); // Assume Mongoose model for MongoDB
const crypto = require('crypto');

const apiKeyMiddleware = async (req, res, next) => {
    const ipAddress = req.ip;
    const apiKey = req.headers['x-api-key'];
  
    try {
      let apiKeyRecord = await ApiKey.findOne({ ipAddress: ipAddress });
  
      if (apiKeyRecord) {
        // Check if the API key matches the one stored
        if (apiKeyRecord.apiKey === apiKey) {
          next();
        } else {
          res.status(401).json({ error: 'Unauthorized: API key is invalid' });
        }
      } else {
        // Generate a new API key for this IP address
        const newApiKey = crypto.randomBytes(16).toString('hex');
        apiKeyRecord = new ApiKey({
          ipAddress: ipAddress,
          apiKey: newApiKey
        });
        await apiKeyRecord.save();
  
        // Optionally send the API key back to the user
        res.status(200).json({ message: 'API key generated', apiKey: newApiKey });
      }
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports = apiKeyMiddleware;