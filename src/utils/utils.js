import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const convertInputFileToString = (filepath) =>
  fs.readFileSync(filepath).toString();

export const convertInputFileToArray = (filepath) =>
  convertInputFileToString(filepath).split('\n');

export const getDayDirectoryCount = async() => {
  const srcDir = path.join(__dirname, "..");// assumes running app from root

  let directoryCount = 0;

  try {
    const files = await fs.promises.readdir(srcDir);

    for (const file of files) {
      const subDir = path.join(srcDir, file);

      if ((await fs.promises.stat(subDir)).isDirectory()) {
        directoryCount++;
      }
    }
  } catch (err) {
    console.error('Error reading src directory:', err);
  }

  return directoryCount - 2; // subtract 2 for template and utils directories
}