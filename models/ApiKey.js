const mongoose = require('mongoose');
const { Schema } = mongoose;

const apiKeySchema = new Schema({
  ipAddress: { type: String, required: true, unique: true },
  apiKey: { type: String, required: true }
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);
module.exports = ApiKey;