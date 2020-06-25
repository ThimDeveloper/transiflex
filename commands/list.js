const ora = require("ora");
const { dots2 } = require("cli-spinners");
const chalk = require("chalk");
const { promisify } = require("util");
const { readdir } = require("fs");
const readDirAsync = promisify(readdir);
const { createFinder, createFindScript } = require("../helpers");
const { klarnaFolder, translationLanguagesFolder } = require("../constants");

const finder = createFinder({ withLogs: false });
const createSpinnerText = (text) => ({
  load: `${chalk.bold(text)}...`,
  success: `${chalk.bold(text)}: ${chalk.green("done")}`,
  fail: `${chalk.bold(text)}:  ${chalk.green("failed")}`,
});
module.exports = async (args, configStore) => {
  let spinnerText = createSpinnerText("Locating Klarna-app project");
  const spinner = ora({
    text: spinnerText.load,
    spinner: dots2,
  });
  const findKlarnaApp = createFindScript({
    type: "d",
    identifier: klarnaFolder,
    maxDepth: 5,
  });

  spinner.start();
  const klarnaPath = await finder({ findScript: findKlarnaApp });
  if (!klarnaPath) {
    spinner.fail(spinnerText.fail);
    return null;
  }
  spinner.succeed(spinnerText.success);

  spinnerText = createSpinnerText("Locating translations files");
  const findTranslations = createFindScript({
    startDir: klarnaPath,
    type: "d",
    identifier: translationLanguagesFolder,
    maxDepth: 4,
  });

  spinner.start(spinnerText.load);
  const translationsPath = await finder({ findScript: findTranslations });
  if (!translationsPath) {
    spinner.fail(spinnerText.fail);
    return null;
  }

  spinner.succeed(spinnerText.success);

  configStore.set("translationsPath", translationsPath);

  const files = await readDirAsync(translationsPath, "utf8");
  files.forEach((lang) => console.log(lang));
};
