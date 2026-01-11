const fs = require("fs");
const path = require("path");

module.exports = function() {
  const directoryPath = path.join(__dirname, "teams");
  
  // If the folder doesn't exist or is empty, return an empty array to prevent errors
  if (!fs.existsSync(directoryPath)) return [];

  const files = fs.readdirSync(directoryPath);
  
  // This maps every individual JSON file into one big array
  return files.map(file => {
    const filePath = path.join(directoryPath, file);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  });
};