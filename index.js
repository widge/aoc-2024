import { getDayDirectoryCount } from "./src/utils/utils.js";
const dirCount = await getDayDirectoryCount();

const day = process.argv[2] ?? dirCount; // Get the day from command-line or defauly to latest

if (day < 1 || day > dirCount) {
  console.error(`Invalid day. Please provide a day between 1 and ${dirCount}.`);
  process.exit(1);
}

const { task1, task2 } = await import(`./src/day${day}/index.js`);
console.log(task1());
console.log(task2());