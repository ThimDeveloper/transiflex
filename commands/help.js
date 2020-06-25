const menus = {
  main: `
      transiflex [command] <options>
  
      compare, -c ................ compare difference in keys of two translation files
      merge, -m .............. merge missing keys from one file to another
      version, -v ............ show package version
      help, -h ............... show help menu for a command`,
  compare: `
      transiflex cmp <file1> <file2> <options>
  
      --option, ..... some option description`,
  merge: `
      transiflex merge <file1> <file2> <options>

      --override, -o, ..... override missing or not applicable keys
 `,
};

module.exports = (args) => {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];

  console.log(menus[subCmd] || menus.main);
};
