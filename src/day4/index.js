import {convertInputFileToArray} from "../utils/utils.js";

const inputData = convertInputFileToArray("src/day4/input.txt");

const convertInputDataToNestedArrays = (listData) =>{
  const arrayifiedData = []; // its a word... for sure
  for(let row of listData){
    arrayifiedData.push(row.split(""));
  }

  return arrayifiedData;
}

const wordSearch = convertInputDataToNestedArrays(inputData);

const determinePossibleWords = (searchWord, wordSearch, x, y) => {
  const possibleWords = [];
  const searchWordLength = searchWord.length;
  const wordSearchYLength = wordSearch.length;
  const wordSearchXLength = wordSearch[0].length;

  // get horizontal potential word
  if(x + searchWordLength <= (wordSearchXLength)){
    let possibleWord = "";
    for(let i = 0; i < searchWordLength; i++){
      possibleWord += wordSearch[y][x + i];
    }
    possibleWords.push(possibleWord);
  }

  // get vertical potential word
  if(y + searchWordLength <= wordSearchYLength){
    let possibleWord = "";
    for(let i = 0; i < searchWordLength; i++){
      possibleWord += wordSearch[y + i][x];
    }
    possibleWords.push(possibleWord);
  }

  // get diagonal down right potential word
  if(x + searchWordLength <= wordSearchXLength && y + searchWordLength <= wordSearchYLength){
    let possibleWord = "";
    for(let i = 0; i < searchWordLength; i++){
      possibleWord += wordSearch[y + i][x + i];
    }
    possibleWords.push(possibleWord);
  }

  // get diagonal down left potential word
  if(x - searchWordLength >= -1 && y + searchWordLength <= wordSearchYLength){
    let possibleWord = "";
    for(let i = 0; i < searchWordLength; i++){
      possibleWord += wordSearch[y + i][x - i];
    }
    possibleWords.push(possibleWord);
  }

  return possibleWords;
}

const determinePossibleXWords = (searchWord, wordSearch, x, y) => {

  const possibleWords = [];
  const searchWordLength = searchWord.length;
  const wordSearchYLength = wordSearch.length;
  const wordSearchXLength = wordSearch[0].length;

  if (x > wordSearchXLength - searchWordLength ||  y > wordSearchYLength - searchWordLength) {
    return [];
  }

  // get \ part of X potential word
  let possibleWordRight = "";
  for(let i = 0; i < searchWordLength; i++){
    possibleWordRight += wordSearch[y + i][x + i];
  }
  possibleWords.push(possibleWordRight);

  // get / part of X potential word
  let possibleWordLeft = "";
  const x2 = x + (searchWordLength - 1);
  for(let i = 0; i < searchWordLength; i++){
    possibleWordLeft += wordSearch[y + i][x2 - i];
  }
  possibleWords.push(possibleWordLeft);
  // console.log(possibleWords)
  return possibleWords;
}

const lookForMatches = (searchWord, possibleWords) => {
  let matches = 0;
  for(let word of possibleWords){
    let reversedWord = word.split("").reverse().join("");
    if(word === searchWord){
      matches++;
    }
    if(reversedWord === searchWord){
      matches++;
    }
  }
  return matches;
}

export const task1 = () => {
  const searchWord = "XMAS";
  let totalMatches = 0;
  for(let y = 0; y < wordSearch.length; y++){
    for(let x = 0; x < wordSearch[y].length; x++){
      const possibleWords = determinePossibleWords(searchWord, wordSearch, x, y);
      const matches = lookForMatches(searchWord,possibleWords);
      totalMatches += matches;
    }
  }
  return `There were ${totalMatches} matches found`;
}

export const task2 = () => {

  const searchWord = "MAS";
  let totalMatches = 0;
  for(let y = 0; y < wordSearch.length; y++){
    for(let x = 0; x < wordSearch[y].length; x++){
      const possibleWords = determinePossibleXWords(searchWord, wordSearch, x, y);
      const matches = lookForMatches(searchWord, possibleWords);

      if(matches > 1){
        totalMatches ++;
      }
    }
  }
  return `There were ${totalMatches} matches found`;
}