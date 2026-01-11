const fs = require("fs");
const path = require("path");

module.exports = function() {
  const directoryPath = path.join(__dirname, "teams");
  
  // If the folder doesn't exist yet (first run), return empty array
  if (!fs.existsSync(directoryPath)) return [];

  const files = fs.readdirSync(directoryPath);
  
  return files.map(file => {
    const filePath = path.join(directoryPath, file);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  });
};