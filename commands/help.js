const menus = {
  main: `
      transiflex [command] <options>
  
      cmp ................ compare difference in keys of two translation files
      merge .............. merge missing keys from one file to another
      version ............ show package version
      help ............... show help menu for a command`,

  cmp: `
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
