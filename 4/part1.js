const { importFromTextFile } = require("../lib/index");

const inputValues = importFromTextFile(`${__dirname}/input-1.txt`);

let score = 0;

const getNumbersFromString = (string) =>
  string
    .trim()
    .split(" ")
    .map((string) => string.trim())
    .filter((string) => string != "");

const calculateScore = (times) => {
  if (times > 0) {
    return calculateScore(times - 1) * 2;
  } else if (times == 0) {
    return 1;
  }
  return 0;
};

let scratchCards = [];

for (lineNumbers of inputValues) {
  const splitNumbers = lineNumbers.split(":")[1].split("|");
  scratchCards.push([
    getNumbersFromString(splitNumbers[0]),
    getNumbersFromString(splitNumbers[1]),
  ]);
}

scratchCards.map((scratchCard) => {
  const winningNumbers = scratchCard[0].filter((number) =>
    scratchCard[1].includes(number)
  );
  score += calculateScore(winningNumbers.length - 1);
});

console.log(score);
