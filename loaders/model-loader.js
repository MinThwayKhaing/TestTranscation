const fs = require("fs").promises; // Using fs.promises for asynchronous file operations
const path = require("path");

async function loadModelsFromDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);
    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.lstat(filePath);
      if (stats.isFile() && file.endsWith(".js")) {
        require(filePath);
      } else if (stats.isDirectory()) {
        await loadModelsFromDirectory(filePath);
      }
    }
  } catch (error) {
    console.error("Error loading models:", error);
    throw error; // Propagate the error to the caller
  }
}

async function loadModels() {
  const modelsDirectory = path.join(__dirname, "../models");
  await loadModelsFromDirectory(modelsDirectory);
}

module.exports = loadModels;
