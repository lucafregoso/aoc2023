const { readFileSync } = require("fs");

const importFromTextFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  // console.log(arr);

  return arr;
};

module.exports = {
  importFromTextFile,
};
