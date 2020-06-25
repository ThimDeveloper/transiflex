const keys = require("all-object-keys");
const jessy = require("jessy");
const { readFile } = require("fs");
const { promisify } = require("util");
const path = require("path");
const readFileAsync = promisify(readFile);

const difference = (a, b) => {
  const setA = new Set(a);
  const setB = new Set(b);
  return new Set([...setA].filter((x) => !setB.has(x)));
};

const generateKeyList = (obj) => keys(obj);

const findEmptyStrings = (keys, obj) => {
  const emptyStrings = keys.filter((key) => {
    const value = jessy(key, obj);
    return typeof value === "string" && value == "";
  });
  return emptyStrings;
};

const read = async (path) => JSON.parse(await readFileAsync(path, "utf8"));
module.exports = async (args, configStore) => {
  if (!configStore.has("translationsPath")) {
    console.log(
      'No path to translations found in config.\nPlease run "transifex locate"'
    );
    return;
  }
  try {
    const [a, b] = args._.slice(1);
    const path1 = path.join(configStore.get("translationsPath"), `${a}.json`);
    const path2 = path.join(configStore.get("translationsPath"), `${b}.json`);
    const [f1, f2] = await Promise.all([read(path1), read(path2)]);
  } catch (error) {
    console.log(error);
  }
};
