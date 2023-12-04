const { importFromTextFile } = require("../lib/index");

// const inputValues = importFromTextFile(`${__dirname}/test-input-1.txt`);
const inputValues = importFromTextFile(`${__dirname}/input-1.txt`);

const getAdiacentItems = (inputValues, lineIndex, rowIndex) => {
  let adiacentItems = [];

  // Check if there is a line above the current line
  if (lineIndex > 0) {
    // Check if there is a row to the left of the current row
    if (rowIndex > 0) {
      // Add the item to the top-left of the current position
      adiacentItems.push({
        line: lineIndex - 1,
        row: rowIndex - 1,
        value: inputValues[lineIndex - 1][rowIndex - 1],
      });
    }

    // Add the item above the current position
    adiacentItems.push({
      line: lineIndex - 1,
      row: rowIndex,
      value: inputValues[lineIndex - 1][rowIndex],
    });

    // Check if there is a row to the right of the current row
    if (rowIndex < inputValues[lineIndex].length - 1) {
      // Add the item to the top-right of the current position
      adiacentItems.push({
        line: lineIndex - 1,
        row: rowIndex + 1,
        value: inputValues[lineIndex - 1][rowIndex + 1],
      });
    }
  }

  // Check if there is a row to the left of the current row
  if (rowIndex > 0) {
    // Add the item to the left of the current position
    adiacentItems.push({
      line: lineIndex,
      row: rowIndex - 1,
      value: inputValues[lineIndex][rowIndex - 1],
    });
  }

  // Check if there is a row to the right of the current row
  if (rowIndex < inputValues[lineIndex].length - 1) {
    // Add the item to the right of the current position
    adiacentItems.push({
      line: lineIndex,
      row: rowIndex + 1,
      value: inputValues[lineIndex][rowIndex + 1],
    });
  }

  // Check if there is a line below the current line
  if (lineIndex < inputValues.length - 1) {
    // Check if there is a row to the left of the current row
    if (rowIndex > 0) {
      // Add the item to the bottom-left of the current position
      adiacentItems.push({
        line: lineIndex + 1,
        row: rowIndex - 1,
        value: inputValues[lineIndex + 1][rowIndex - 1],
      });
    }

    // Add the item below the current position
    adiacentItems.push({
      line: lineIndex + 1,
      row: rowIndex,
      value: inputValues[lineIndex + 1][rowIndex],
    });

    // Check if there is a row to the right of the current row
    if (rowIndex < inputValues[lineIndex].length - 1) {
      // Add the item to the bottom-right of the current position
      adiacentItems.push({
        line: lineIndex + 1,
        row: rowIndex + 1,
        value: inputValues[lineIndex + 1][rowIndex + 1],
      });
    }
  }

  return adiacentItems;
};

const isSymbol = (char) => {
  return char === "*";
};

const calculateSum = (values) => {
  if (!Array.isArray(values) && typeof values === "object") {
    values = Object.values(values);
  }

  return values.reduce(
    (a, b) => Object.values(b).reduce((c, d) => c * d) + a,
    0
  );
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

    const adiacentSymbols = adiacentItems.filter((item) =>
      isSymbol(item.value)
    );

    if (adiacentSymbols.length) {
      filteredInputValuesCoordinates.push([
        lineIndex,
        parseInt(rowIndex),
        adiacentSymbols,
      ]);
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
  filteredInputValuesCoordinates = filteredInputValuesCoordinates.filter(
    (lineIndex) => lineIndex.length
  );
  const doubleFilteredInputValuesCoordinates = {};
  filteredInputValuesCoordinates = filteredInputValuesCoordinates.forEach(
    (lineItems) => {
      return lineItems.map((inputWithAdiacentSymbol) => {
        // const symbolInfos =
        inputWithAdiacentSymbol[2].forEach((symbolInfo) => {
          if (
            !doubleFilteredInputValuesCoordinates.hasOwnProperty(
              `${symbolInfo.line}-${symbolInfo.row}-${symbolInfo.value}`
            )
          ) {
            doubleFilteredInputValuesCoordinates[
              `${symbolInfo.line}-${symbolInfo.row}-${symbolInfo.value}`
            ] = [];
          }
          if (
            !doubleFilteredInputValuesCoordinates[
              `${symbolInfo.line}-${symbolInfo.row}-${symbolInfo.value}`
            ].includes(
              `${inputWithAdiacentSymbol[0]}-${inputWithAdiacentSymbol[1]}`
            )
          ) {
            doubleFilteredInputValuesCoordinates[
              `${symbolInfo.line}-${symbolInfo.row}-${symbolInfo.value}`
            ].push(
              `${inputWithAdiacentSymbol[0]}-${inputWithAdiacentSymbol[1]}`
            );
          }
          // return [
          //   `${symbolInfo.line}-${symbolInfo.row}-${symbolInfo.value}`,
          //   `${inputWithAdiacentSymbol[0]}-${inputWithAdiacentSymbol[1]}`,
          // ];
        });
        // return symbolInfos;
      });
    }
  );
  for (const [symbolInfos, itemsInfos] of Object.entries(
    doubleFilteredInputValuesCoordinates
  )) {
    let parsedLinesIndexes = [];
    let tmpUniqueFilteredInputValues = {};
    itemsInfos.forEach((itemInfo) => {
      const splitItemInfo = itemInfo.split("-");

      // if (!parsedLinesIndexes.includes(splitItemInfo[0])) {
      // parsedLinesIndexes.push(splitItemInfo[0]);
      let wholeInputValueAndCoordinates = getInputValueAndCoordinates(
        inputValues,
        parseInt(splitItemInfo[0]),
        parseInt(splitItemInfo[1])
      );
      if (
        wholeInputValueAndCoordinates &&
        !tmpUniqueFilteredInputValues.hasOwnProperty(
          `${wholeInputValueAndCoordinates.line}-${wholeInputValueAndCoordinates.start}`
        )
      ) {
        tmpUniqueFilteredInputValues[
          `${wholeInputValueAndCoordinates.line}-${wholeInputValueAndCoordinates.start}`
          // splitItemInfo[0] + "--" + splitItemInfo[1]
        ] = parseInt(wholeInputValueAndCoordinates.value);
      }
      // }
    });
    console.log({ tmpUniqueFilteredInputValues });

    if (Object.keys(tmpUniqueFilteredInputValues).length >= 2) {
      uniqueFilteredInputValues = {
        ...uniqueFilteredInputValues,
        [`${symbolInfos}`]: { ...tmpUniqueFilteredInputValues },
      };
    }
  }

  return uniqueFilteredInputValues;
};

let filteredInputValues = filterInputValues(inputValues);
console.log(filteredInputValues);

console.log(calculateSum(filteredInputValues));
