const { importFromTextFile } = require("../lib/index");

const inputValues = importFromTextFile(`${__dirname}/test-input-1.txt`);

let winningNumbers = [];
let ownNumbers = [];

for (lineNumbers of inputValues) {
  const splitNumbers = lineNumbers.split(":")[1].split("|");
  winningNumbers.push(
    splitNumbers[0]
      .trim()
      .split(" ")
      .map((string) => string.trim())
  );
  ownNumbers.push(
    splitNumbers[1]
      .trim()
      .split(" ")
      .map((string) => parseInt(string.trim()))
  );
}

console.log({
  winningNumbers,
  ownNumbers,
});
