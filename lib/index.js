const { readFileSync } = require("fs");

const importFromTextFile = (filename) => {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  console.log(arr); // 👉️ ['One', 'Two', 'Three', 'Four']

  return arr;
};

module.exports = {
  importFromTextFile,
};
