const { importFromTextFile } = require("../lib/index");

const inputValues = importFromTextFile(`${__dirname}/input-1.txt`);

const getAdiacentItems = (inputValues, lineIndex, rowIndex) => {
  let adiacentItems = [];
  if (lineIndex > 0) {
    if (rowIndex > 0) {
      adiacentItems.push(inputValues[lineIndex - 1][rowIndex - 1]);
    }
    adiacentItems.push(inputValues[lineIndex - 1][rowIndex]);
    if (rowIndex < inputValues[lineIndex].length - 1) {
      adiacentItems.push(inputValues[lineIndex - 1][rowIndex + 1]);
    }
  }
  if (rowIndex > 0) {
    adiacentItems.push(inputValues[lineIndex][rowIndex - 1]);
  }
  if (rowIndex < inputValues[lineIndex].length - 1) {
    adiacentItems.push(inputValues[lineIndex][rowIndex + 1]);
  }
  if (lineIndex < inputValues.length - 1) {
    if (rowIndex > 0) {
      adiacentItems.push(inputValues[lineIndex + 1][rowIndex - 1]);
    }
    adiacentItems.push(inputValues[lineIndex + 1][rowIndex]);
    if (rowIndex < inputValues[lineIndex].length - 1) {
      adiacentItems.push(inputValues[lineIndex + 1][rowIndex + 1]);
    }
  }
  return adiacentItems;
};

const isSymbol = (char) => {
  return ["*", "!", "@", "#", "$", "+", "=", "/", "%", "&", "-"].includes(char);
};

const calculateSum = (values) => {
  if (!Array.isArray(values) && typeof values === "object") {
    values = Object.values(values);
  }
  return values.reduce((a, b) => a + b, 0);
};

const filterInputValuesLine = (inputValues, lineIndex) => {
  let filteredInputValuesCoordinates = [];
  for (const rowIndex in inputValues[lineIndex]) {
    if (!isFinite(inputValues[lineIndex][rowIndex])) {
      continue;
    }

    const adiacentItems = getAdiacentItems(
      inputValues,
      lineIndex,
      parseInt(rowIndex)
    );

    const hasAdiacentSymbols = adiacentItems.some((item) => isSymbol(item));

    if (hasAdiacentSymbols) {
      filteredInputValuesCoordinates.push([lineIndex, parseInt(rowIndex)]);
    }
  }
  return filteredInputValuesCoordinates;
};
const getInputValueAndCoordinates = (inputValues, lineIndex, rowIndex) => {
  let wholeValue = inputValues[lineIndex][rowIndex];
  let tmpStartIndex = rowIndex - 1;
  while (
    tmpStartIndex >= 0 &&
    isFinite(inputValues[lineIndex][tmpStartIndex])
  ) {
    wholeValue = inputValues[lineIndex][tmpStartIndex] + wholeValue;
    tmpStartIndex--;
  }
  let tmpEndIndex = rowIndex + 1;
  while (
    tmpEndIndex < inputValues[lineIndex].length &&
    isFinite(inputValues[lineIndex][tmpEndIndex])
  ) {
    wholeValue = wholeValue + inputValues[lineIndex][tmpEndIndex];
    tmpEndIndex++;
  }
  return {
    line: lineIndex,
    start: tmpStartIndex + 1,
    end: tmpEndIndex - 1,
    value: wholeValue,
  };
};
const filterInputValues = (inputValues) => {
  let filteredInputValuesCoordinates = [];
  let uniqueFilteredInputValues = {};
  for (const inputLineIndex in inputValues) {
    filteredInputValuesCoordinates[inputLineIndex] = filterInputValuesLine(
      inputValues,
      parseInt(inputLineIndex)
    );
  }
  for (const lineIndex in filteredInputValuesCoordinates) {
    if (filteredInputValuesCoordinates[lineIndex].length) {
      for (const inputWithAdiacentSymbol of filteredInputValuesCoordinates[
        lineIndex
      ]) {
        let wholeInputValueAndCoordinates = getInputValueAndCoordinates(
          inputValues,
          ...inputWithAdiacentSymbol
        );
        if (wholeInputValueAndCoordinates) {
          uniqueFilteredInputValues[
            `${wholeInputValueAndCoordinates.line}-${wholeInputValueAndCoordinates.start}`
          ] = parseInt(wholeInputValueAndCoordinates.value);
        }
      }
    }
  }
  return uniqueFilteredInputValues;
};

let filteredInputValues = filterInputValues(inputValues);

console.log(calculateSum(filteredInputValues));
