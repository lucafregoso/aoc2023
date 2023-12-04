const { importFromTextFile } = require("../lib/index");

const inputValues = importFromTextFile(`${__dirname}/input-1.txt`);
// const inputValues = importFromTextFile(`${__dirname}/test-input-1.txt`);

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

let cardInstancesQty = Array(scratchCards.length).fill(1);

scratchCards.map((scratchCard, index) => {
  const winningNumbers = scratchCard[0].filter((number) =>
    scratchCard[1].includes(number)
  );
  // console.log(`Card ${index} has ${winningNumbers.length} winning numbers`);

  for (
    let cardIdIncrement = 0;
    cardIdIncrement < winningNumbers.length;
    cardIdIncrement++
  ) {
    cardInstancesQty[index + 1 + cardIdIncrement] += cardInstancesQty[index];
  }
});

console.log(cardInstancesQty.reduce((a, b) => a + b, 0));
