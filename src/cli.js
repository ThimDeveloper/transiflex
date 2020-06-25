import minimist from "minimist";
import { compare, help, merge, list, version } from "../commands";
const parseArgs = (rawArgs) => minimist(rawArgs.slice(2));

export async function cli(rawArgs) {
  const args = parseArgs(rawArgs);

  // console.log(args);
  // console.log(args._[0]);

  let cmd = args._[0] || "help";

  if (args.help || args.h) {
    cmd = "help";
  }
  if (args.version || args.v) {
    cmd = "version";
  }
  if (args.list || args.ls) {
    cmd = "list";
  }
  if (args.compare || args.cmp) {
    cmd = "compare";
  }
  if (args.merge || args.mg) {
    cmd = "merge";
  }

  switch (cmd) {
    case "compare":
      compare(args);
      break;
    case "version":
      version(args);
      break;
    case "merge":
      merge(args);
      break;
    case "list":
      await list(args);
      break;
    case "help":
      help(args);
      break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}
