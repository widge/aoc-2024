import fs from 'fs';
export const convertInputFileToString = (filepath) =>
  fs.readFileSync(filepath).toString();

export const convertInputFileToArray = (filepath) =>
  convertInputFileToString(filepath).split('\n');
