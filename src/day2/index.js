import { convertInputFileToArray } from "../utils/utils.js";

const reportData = convertInputFileToArray("src/day2/input.txt")

const verifyIfSafe = (report) => {
  const levelDiffs = [];
  // Create an array of the differences between each level
  for (let i = 0; i < report.length - 1; i++) {
    levelDiffs.push(report[i] - report[i+1]);
  }

  // If diffs are negative the levels were increasing and if positive decreasing.
  // Check if they consistently increase or decrease and are always within the allowed range
  const increasingLevels = levelDiffs.every((levelDiff) => levelDiff >= -3 && levelDiff <= -1);
  const decreasingLevels = levelDiffs.every((levelDiff) => levelDiff >= 1 && levelDiff <= 3);

  return decreasingLevels || increasingLevels;
}

const verifyIfSafeWithinTolerance = (report) => {
  let isSafe = false;
  // When we include tolerance, loop through all levels removing the current one and try re-verifying
  for (let i = 0; i < report.length; i++) {
    const safeWithinTolerance = verifyIfSafe([...report.slice(0, i), ...report.slice(i + 1)]);
    if(safeWithinTolerance) {
      // If one of the new reports is safe within tolerance we can break and consider the report safe
      isSafe = true;
      break;
    }
  }

  return isSafe;
}

const countSafeReports = (includeTolerance = false) => {

  let safeReports = 0;
  for(let reportLine of reportData) {
    if(reportLine === "") {
      continue; //skip bad data
    }
    const report = reportLine.split(" ").map(item => parseInt(item));
    let isReportSafe = verifyIfSafe(report);

    if(!isReportSafe && includeTolerance) {
      isReportSafe = verifyIfSafeWithinTolerance(report)
    }

    safeReports += isReportSafe ? 1 : 0;
  }
  return `There are ${safeReports} Safe Reports`;
}

export const task1 = () => {

  return countSafeReports();
}

export const task2 = () => {

  return countSafeReports(true);
}