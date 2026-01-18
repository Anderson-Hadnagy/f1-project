const fs = require("fs");
const path = require("path");

module.exports = function() {
  // This points to the sub-folder: src/_data/teams/
  const directoryPath = path.join(__dirname, "teams");
  
  // If the folder doesn't exist yet, return an empty array
  if (!fs.existsSync(directoryPath)) {
    console.log("Teams folder not found at: " + directoryPath);
    return [];
  }

  const files = fs.readdirSync(directoryPath);
  
  // Filter for JSON files and combine them
  return files
    .filter(file => file.endsWith(".json"))
    .map(file => {
      const filePath = path.join(directoryPath, file);
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    });
};