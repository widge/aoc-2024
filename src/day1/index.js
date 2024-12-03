import {convertInputFileToString} from "../utils/utils.js";

//read input file and convert to an array of each line
const listsData = convertInputFileToString("src/day1/input.txt")
  .split("\n");

const list1 = [];
const list2 = [];

// Q.A.D. - break each line out into two lists based on spacing between numbers.
// Haven't got time to make the whitespace split more elegant
listsData.forEach((listLine) => {
  if (listLine === "") {
    return;
  }
  list1.push(parseInt(listLine.split("   ")[0]));
  list2.push(parseInt(listLine.split("   ")[1]));
});

export const task1 = () => {

  list1.sort();
  list2.sort();
  let total = 0;

  for(let i = 0; i < list1.length; i++) {
    total += Math.abs(list1[i] - list2[i]);
  }

  return `Total is: ${total}`;
}

export const task2 = () => {

  let total = 0;

  for(let id of list1) {
    // Use reduce to efficiently count how many times the id appears in list2
    const appearances = list2.reduce((count, current) => count + (current === id), 0);
    total +=  (id * appearances);// Similarity Score
  }

  return `Combined Similarity Score is: ${total}`;
}