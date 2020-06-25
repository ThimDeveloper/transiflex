const util = require("util");
const exec = util.promisify(require("child_process").exec);
const shell = require("shelljs");
const createFinder = ({ withLogs = false }) => async ({
  findScript = null,
}) => {
  try {
    if (!findScript) return null;

    const { stdout, stderr } = await exec(findScript);
    if (withLogs) {
      console.log("stdout:", stdout);
      console.log("stderr:", stderr);
    }
    return stdout.trim();
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { createFinder };
