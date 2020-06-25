import minimist from "minimist";
import { compare, help, merge, list, version, config } from "../commands";
const parseArgs = (rawArgs) => minimist(rawArgs.slice(2));
const Configstore = require("configstore");
const packageJson = require("../package.json");

// Create a Configstore instance
const configStore = new Configstore(packageJson.name);

export async function cli(rawArgs) {
  const args = parseArgs(rawArgs);

  console.log(args);
  console.log(args._[0]);

  let cmd = args._[0] || "help";

  switch (cmd) {
    case "compare":
      compare(args, configStore);
      break;
    case "version":
      version(args);
      break;
    case "merge":
      merge(args, configStore);
      break;
    case "list":
      await list(args, configStore);
      break;
    case "config":
      config(args, configStore);
      break;
    case "help":
      help(args);
      break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}
