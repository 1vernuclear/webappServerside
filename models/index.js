const fs = require('fs');
const path = require('path');

const models = {};

// Read all files in the current directory
fs.readdirSync(__dirname)
  .filter(file => {
    // Ignore the index.js file and only accept .js files
    return file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    // Assuming the model name is the same as the file name
    const modelName = file.split('.')[0];
    models[modelName] = model;
  });

module.exports = models;    