import {convertInputFileToString} from "../utils/utils.js";

const memoryData = convertInputFileToString("src/day3/input.txt");

const calculateCommandTotal = (commandString)=> {
  // Break out an array of just the command statements
  const validCommands = commandString.match(/mul\(\d{1,3},\d{1,3}\)/g);
  let total = 0;
  for(let command of validCommands){
    //for each one extract the two digits and multiply them then add to total
    const values = command.match(/\d{1,3}/g);
    total += parseInt(values[0]) * parseInt(values[1]);
  }
  return total;
}

export const task1 = () => {
  let total = calculateCommandTotal(memoryData);
  return `Total is: ${total}`;
}

// Inefficient but was quick and easy to write
export const task2 = () => {
  // Split out any commands starting don't()
  const splitMemoryStrings = memoryData.split(/(?=don\'t\(\))/g);
  let validCommands = []
  for(let subMemoryString of splitMemoryStrings) {
    // from the new sub strings further split the strings starting do()
    // then filter out any do() strings from the initial don't() string add to the list
    const doCommands = subMemoryString.split(/(?=do\(\))/g)
      .filter((commandPart) => commandPart.indexOf("don't()") !== 0);
    validCommands.push(...doCommands)
  }

  let total = 0;
  for(let command of validCommands) {
    //finally execute all the valid commands and keep a running total
    total += calculateCommandTotal(command);
  }
  return `Total is: ${total}`;
}